from django.http import StreamingHttpResponse, JsonResponse
from rest_framework.views import APIView
import requests
import json

OLLAMA_API_URL = "http://localhost:11434/api/generate"

class GenerateCodeView(APIView):
    def post(self, request, *args, **kwargs):
        description = request.data.get('description', '')

        if not description:
            return JsonResponse({'error': 'Description is required'}, status=400)

        payload = {
            "model": "codellama:7b",
            "prompt": description,
            "stream": True
        }

        try:
            response = requests.post(OLLAMA_API_URL, json=payload, stream=True)
            response.raise_for_status()

            def generate():
                for line in response.iter_lines(decode_unicode=True):
                    if line:
                        try:
                            chunk = json.loads(line)
                            if "response" in chunk:
                                yield f"data: {json.dumps({'code': chunk['response']})}\n\n"
                            if chunk.get("done", False):
                                break
                        except json.JSONDecodeError:
                            continue  # Ignore malformed JSON chunks

            return StreamingHttpResponse(generate(), content_type="text/event-stream")

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
