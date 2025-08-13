# store/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, allow_null=True, required=False)

    class Meta:
        model = Product
        fields = '__all__'
