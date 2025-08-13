from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'model', 'price', 'created_at', 'image_preview')
    list_filter = ('created_at', 'price', 'os')
    search_fields = ('title', 'model', 'description')
    readonly_fields = ('image_preview',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'model', 'description', 'price')
        }),
        ('Image', {
            'fields': ('image', 'image_preview'),
            'classes': ('collapse',)
        }),
        ('Hardware Specifications', {
            'fields': ('processor', 'cpu_cores', 'cpu_clock_speed', 'ram', 'storage', 'gpu', 'gpu_score'),
            'classes': ('collapse',)
        }),
        ('Display & Features', {
            'fields': ('screen_resolution', 'refresh_rate', 'display', 'keyboard', 'battery_life'),
            'classes': ('collapse',)
        }),
        ('System', {
            'fields': ('os', 'weight', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        """Display image preview in admin list"""
        if obj.image:
            if hasattr(obj.image, 'url'):
                return f'<img src="{obj.image.url}" style="max-height: 50px; max-width: 50px;" />'
            else:
                return f'<img src="{obj.image}" style="max-height: 50px; max-width: 50px;" />'
        return "No image"
    image_preview.short_description = 'Image Preview'
    image_preview.allow_tags = True
