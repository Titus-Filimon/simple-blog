from django.contrib import admin
from .models import Post

@admin.register(Post)  # Register the Post model with the admin site
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')  # Fields to display in the list view
    search_fields = ('title',)  # Add a search box for the title field