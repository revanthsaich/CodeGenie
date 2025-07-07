from django.contrib import admin
from .models import ChatHistory

@admin.register(ChatHistory)
class ChatHistoryAdmin(admin.ModelAdmin):
    # Display the user, prompt, response, and timestamp in the admin list view
    list_display = ('id', 'user', 'prompt', 'response', 'created_at')
    
    # Add search functionality for the user's username, prompt, and response
    search_fields = ('user__username', 'prompt', 'response')
    
    # Add filters to easily filter chat history by user or creation date
    list_filter = ('user', 'created_at')
    
    # Optionally, order the entries by creation date (newest first)
    ordering = ('-created_at',)