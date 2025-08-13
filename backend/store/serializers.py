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
        image_name = getattr(getattr(obj, 'image', None), 'name', '')
        if not image_name:
            return ''
        relative_path = image_name.lstrip('/')
        media_path = f"{settings.MEDIA_URL}{relative_path}"
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(media_path)
        public_base = getattr(settings, 'PUBLIC_BASE_URL', None)
        if public_base:
            return urljoin(public_base.rstrip('/') + '/', media_path.lstrip('/'))
        return media_path
