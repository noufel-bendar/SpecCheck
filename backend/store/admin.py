from django.contrib import admin
from django.utils.html import format_html
from django.conf import settings
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'model', 'price', 'created_at', 'image_preview')
    list_filter = ('created_at', 'price', 'os')
    search_fields = ('title', 'model', 'description')
    readonly_fields = ('image_preview', 'created_at')
    
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
            try:
                # Handle CloudinaryField
                if hasattr(obj.image, 'url'):
                    image_url = obj.image.url
                # Handle string URLs
                elif isinstance(obj.image, str):
                    image_url = obj.image
                # Handle FileField objects
                elif hasattr(obj.image, 'name'):
                    image_url = obj.image.name
                else:
                    image_url = str(obj.image)
                
                return format_html(
                    '<img src="{}" style="max-height: 50px; max-width: 50px; object-fit: contain;" alt="Product Image" />',
                    image_url
                )
            except Exception as e:
                return f"Error loading image: {str(e)}"
        return "No image"
    
    image_preview.short_description = 'Image Preview'
    image_preview.allow_tags = True
    
    def get_form(self, request, obj=None, **kwargs):
        """Customize the form to handle CloudinaryField properly"""
        form = super().get_form(request, obj, **kwargs)
        return form
    
    def save_model(self, request, obj, form, change):
        """Custom save method to handle Cloudinary uploads"""
        try:
            # Check if Cloudinary is properly configured
            cloudinary_configured = all([
                getattr(settings, 'CLOUDINARY_STORAGE', {}).get('CLOUD_NAME'),
                getattr(settings, 'CLOUDINARY_STORAGE', {}).get('API_KEY'),
                getattr(settings, 'CLOUDINARY_STORAGE', {}).get('API_SECRET')
            ])
            
            if not cloudinary_configured:
                # If Cloudinary not configured, show a warning but allow save
                print("⚠️ Warning: Cloudinary credentials not set. Images may not upload properly.")
            
            super().save_model(request, obj, form, change)
            
        except Exception as e:
            # Log the error for debugging
            print(f"Error saving product: {str(e)}")
            # Still try to save without the image if there's an issue
            try:
                if hasattr(obj, 'image') and obj.image:
                    obj.image = None  # Clear problematic image
                super().save_model(request, obj, form, change)
                print("✅ Product saved without image due to Cloudinary configuration issue")
            except Exception as e2:
                print(f"❌ Failed to save product: {str(e2)}")
                raise
