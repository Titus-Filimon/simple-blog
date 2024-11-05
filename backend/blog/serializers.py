from rest_framework import serializers
from .models import Post
import bleach

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'  # Serialize all fields of the Post model
        
    def validate_content(self, value):
        allowed_tags = bleach.ALLOWED_TAGS + ['span', 'div', 'p', 'h1', 'h2', 'h3', 'ol', 'ul', 'li', 'br']
        allowed_attributes = {
            **bleach.ALLOWED_ATTRIBUTES,
            '*': ['style', 'align', 'class'],  # Allowing inline styles, alignment, and classes
        }

        return bleach.clean(value, tags=allowed_tags, attributes=allowed_attributes)
