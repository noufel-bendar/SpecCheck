# store/serializers.py
from rest_framework import serializers
from django.conf import settings
from urllib.parse import urljoin
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        if not getattr(obj, 'image', None):
            return ''
        
        # Handle CloudinaryField with .url attribute
        if hasattr(obj.image, 'url'):
            return obj.image.url
        
        # Handle string values (legacy data or direct URLs)
        if isinstance(obj.image, str):
            image_str = obj.image.strip()
            if not image_str:
                return ''
            
            # Fix common URL issues
            image_str = self._normalize_url(image_str)
            
            # If it's already a full URL (Cloudinary or other), return as-is
            if image_str.startswith(('http://', 'https://')):
                return image_str
            
            # If it's a relative path, construct the appropriate URL
            return self._build_image_url(image_str)
        
        # Handle FileField objects (legacy)
        if hasattr(obj.image, 'name'):
            image_name = obj.image.name
            if not image_name:
                return ''
            
            # Normalize the path
            image_name = self._normalize_url(image_name)
            
            # Check if we're using Cloudinary storage
            if hasattr(settings, 'DEFAULT_FILE_STORAGE') and 'cloudinary' in settings.DEFAULT_FILE_STORAGE:
                cloud_name = settings.CLOUDINARY_STORAGE.get('CLOUD_NAME', '')
                if cloud_name:
                    return f"https://res.cloudinary.com/{cloud_name}/image/upload/v1/{image_name}"
            
            # Fallback to local media URL
            return self._build_image_url(image_name)
        
        return ''

    def _normalize_url(self, url_str):
        """Normalize URLs by fixing common issues"""
        if not url_str:
            return ''
        
        # Fix missing colon in protocol (https// -> https://)
        import re
        url_str = re.sub(r'^(https?)(//)', r'\1:\2', url_str)
        
        # Remove leading/trailing whitespace
        url_str = url_str.strip()
        
        # Ensure proper path format
        if not url_str.startswith(('http://', 'https://', '/')):
            url_str = f"/{url_str}"
        
        return url_str

    def _build_image_url(self, image_path):
        """Build absolute URL for image path"""
        # Remove leading slash for consistency
        relative_path = image_path.lstrip('/')
        
        # Build media URL
        media_path = f"{settings.MEDIA_URL}{relative_path}"
        
        # Try to get absolute URL from request context
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(media_path)
        
        # Fallback to PUBLIC_BASE_URL
        public_base = getattr(settings, 'PUBLIC_BASE_URL', None)
        if public_base:
            return urljoin(public_base.rstrip('/') + '/', media_path.lstrip('/'))
        
        return media_path
