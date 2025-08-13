# store/serializers.py
from rest_framework import serializers
from django.conf import settings
from urllib.parse import urljoin
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'url', 'alt_text', 'is_primary']

    def get_url(self, obj):
        image_field = getattr(obj, 'image', None)
        image_name = getattr(image_field, 'name', '') if image_field else ''
        return build_media_url(self.context.get('request'), image_name)


def build_media_url(request, image_name: str) -> str:
    if not image_name:
        return ''
    relative_path = image_name.lstrip('/')
    media_path = f"{settings.MEDIA_URL}{relative_path}"
    if request is not None:
        return request.build_absolute_uri(media_path)
    public_base = getattr(settings, 'PUBLIC_BASE_URL', None)
    if public_base:
        return urljoin(public_base.rstrip('/') + '/', media_path.lstrip('/'))
    return media_path


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        image_name = getattr(getattr(obj, 'image', None), 'name', '')
        return build_media_url(self.context.get('request'), image_name)

    def get_images(self, obj):
        qs = getattr(obj, 'images', None)
        if qs is None:
            return []
        serializer = ProductImageSerializer(qs.all(), many=True, context=self.context)
        return serializer.data
