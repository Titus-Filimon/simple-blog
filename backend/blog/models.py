from django.db import models
import bleach

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()  # Use TextField to store HTML content
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Use bleach to sanitize and clean the content before saving
        allowed_tags = bleach.ALLOWED_TAGS + [
            'span', 'div', 'p', 'h1', 'h2', 'h3', 'ol', 'ul', 'li', 'br', 'b', 'i', 'u', 'strong', 'em'
        ]
        allowed_attributes = {
            '*': ['style', 'align', 'class'],
        }

        self.content = bleach.clean(self.content, tags=allowed_tags, attributes=allowed_attributes)
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
