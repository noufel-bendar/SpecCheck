# store/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

class ProductListAPIView(APIView):
    def get(self, request):
        try:
            products = Product.objects.all().prefetch_related('images')
            serializer = ProductSerializer(products, many=True, context={'request': request})
            return Response(serializer.data)
        except Exception as exc:
            return Response({"error": str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
from rest_framework.generics import RetrieveAPIView

class ProductDetailAPIView(RetrieveAPIView):
    queryset = Product.objects.all().prefetch_related('images')
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context