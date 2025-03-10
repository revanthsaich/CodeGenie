from django.contrib import admin
from .models import ChatHistory

class ChatHistoryAdmin(admin.ModelAdmin):
    # Remove 'user' from list_display since it no longer exists in the model
    list_display = ('id', 'prompt', 'response', 'created_at')  # Include only valid fields
    search_fields = ('prompt', 'response')  # Enable search by prompt and response
    list_filter = ('created_at',)  # Add filters for the created_at field
    ordering = ('-created_at',)  # Order by most recent first

# Register the model with the admin site
admin.site.register(ChatHistory, ChatHistoryAdmin)