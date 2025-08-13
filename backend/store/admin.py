from django.contrib import admin
from .models import Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "model", "price", "created_at")
    search_fields = ("title", "model")
    inlines = [ProductImageInline]


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "is_primary", "alt_text", "created_at")
    list_filter = ("is_primary",)
    search_fields = ("product__title", "product__model", "alt_text")
