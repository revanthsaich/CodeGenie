from rest_framework import serializers
from .models import ChatHistory

class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ['id', 'user', 'prompt', 'response', 'created_at']  # Include the user field
        read_only_fields = ['user']  # Ensure the user field is read-only