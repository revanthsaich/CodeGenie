from django.urls import path
from .views import GenerateCodeView, ChatHistoryView

urlpatterns = [
    path('generate-code', GenerateCodeView.as_view(), name='generate_code'),
    path('chat-history', ChatHistoryView.as_view(), name='chat_history'),
]