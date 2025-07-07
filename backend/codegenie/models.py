from django.conf import settings
from django.db import models

class ChatHistory(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Link to the custom User model
        on_delete=models.SET_NULL,  # Set to NULL if the user is deleted
        null=True,
        blank=True,
        related_name="chat_histories"  # Unique related_name to avoid clashes
    )
    prompt = models.TextField()  # Stores the user's input (description)
    response = models.TextField()  # Stores the AI's response
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the entry was created

    def __str__(self):
        return f"Prompt: {self.prompt[:50]}..."