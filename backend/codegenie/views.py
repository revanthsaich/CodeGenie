import requests
from django.http import JsonResponse
from rest_framework.views import APIView

OLLAMA_API_URL = "http://localhost:11434/api/generate"

class GenerateCodeView(APIView):
    def post(self, request, *args, **kwargs):
        description = request.data.get('description', '')

        if not description:
            return JsonResponse({'error': 'Description is required'}, status=400)

        payload = {
            "model": "codellama:7b",
            "prompt": description,
            "stream": False  # Disable streaming for simplicity
        }

        try:
            response = requests.post(OLLAMA_API_URL, json=payload)
            response.raise_for_status()
            generated_response = response.json()

            # Extract the generated code from the response
            generated_code = generated_response.get("response", "")
            return JsonResponse({'code': generated_code})

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)