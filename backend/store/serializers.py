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

        # Always return an absolute URL when a request is available
        request = self.context.get('request')
        media_path = f"{settings.MEDIA_URL}{obj.image.name}"

        if request is not None:
            return request.build_absolute_uri(media_path)

        # Fallback to a configured public base URL or relative media path
        public_base = getattr(settings, 'PUBLIC_BASE_URL', None)
        if public_base:
            return urljoin(public_base.rstrip('/') + '/', media_path.lstrip('/'))

        return media_path
