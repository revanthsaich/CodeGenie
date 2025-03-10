from django.http import StreamingHttpResponse, JsonResponse
from rest_framework.views import APIView
import requests
import json
from .models import ChatHistory
from rest_framework.response import Response
from .models import ChatHistory
from .serializers import ChatHistorySerializer  # Serializer for ChatHistory

OLLAMA_API_URL = "http://localhost:11434/api/generate"




class ChatHistoryView(APIView):
    def get(self, request, *args, **kwargs):
        # Fetch all chat history entries
        chats = ChatHistory.objects.all().order_by('-created_at')  # Order by latest first
        serializer = ChatHistorySerializer(chats, many=True)  # Serialize the data
        return Response(serializer.data)
    



class GenerateCodeView(APIView):
    def post(self, request, *args, **kwargs):
        description = request.data.get('description', '') + (
            " If the prompt is theoretical or a definition, limit the response to 100 words. "
            "For user greetings, simply greet back without any explanations. "
            "If the prompt is about code, there is no word limit."
        )

        if not description:
            return JsonResponse({'error': 'Description is required'}, status=400)

        payload = {
            "model": "codellama:7b",
            "prompt": description,
            "stream": True,
            "options": {
                "temperature": 0.2,
                "top_p": 0.5,
            }
        }

        try:
            response = requests.post(OLLAMA_API_URL, json=payload, stream=True)
            response.raise_for_status()

            accumulated_response = ""  # To accumulate the full response

            def generate():
                nonlocal accumulated_response  # Use nonlocal to modify the variable
                for line in response.iter_lines(decode_unicode=True):
                    if line:
                        try:
                            chunk = json.loads(line)
                            if "response" in chunk:
                                accumulated_response += chunk["response"]
                                yield f"data: {json.dumps({'code': chunk['response']})}\n\n"
                            if chunk.get("done", False):
                                break
                        except json.JSONDecodeError:
                            continue  # Ignore malformed JSON chunks

            # Save the prompt and response to the database after streaming is complete
            def save_to_db():
                ChatHistory.objects.create(prompt=description, response=accumulated_response)

            # Return the streaming response and save data after completion
            streaming_response = StreamingHttpResponse(generate(), content_type="text/event-stream")
            streaming_response.on_close = save_to_db  # Save data when streaming ends
            return streaming_response

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)