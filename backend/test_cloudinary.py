#!/usr/bin/env python
"""
Test script to verify Cloudinary integration
"""
import os
import sys
import django
from pathlib import Path

# Add the project directory to Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.conf import settings
from store.models import Product
import cloudinary

def test_cloudinary_configuration():
    """Test if Cloudinary is properly configured"""
    print("Testing Cloudinary Configuration...")
    print("=" * 40)
    
    # Check environment variables
    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME')
    api_key = os.environ.get('CLOUDINARY_API_KEY')
    api_secret = os.environ.get('CLOUDINARY_API_SECRET')
    
    print(f"CLOUDINARY_CLOUD_NAME: {'✓ Set' if cloud_name else '✗ Not set'}")
    print(f"CLOUDINARY_API_KEY: {'✓ Set' if api_key else '✗ Not set'}")
    print(f"CLOUDINARY_API_SECRET: {'✓ Set' if api_secret else '✗ Not set'}")
    
    if not all([cloud_name, api_key, api_secret]):
        print("\n❌ Cloudinary credentials not properly configured!")
        print("Please set the required environment variables.")
        return False
    
    # Test Cloudinary connection
    try:
        cloudinary.config(
            cloud_name=cloud_name,
            api_key=api_key,
            api_secret=api_secret
        )
        print("\n✓ Cloudinary configuration successful!")
        return True
    except Exception as e:
        print(f"\n❌ Cloudinary configuration failed: {str(e)}")
        return False

def test_django_settings():
    """Test Django settings for Cloudinary"""
    print("\nTesting Django Settings...")
    print("=" * 40)
    
    # Check if Cloudinary apps are installed
    cloudinary_storage_installed = 'cloudinary_storage' in settings.INSTALLED_APPS
    cloudinary_installed = 'cloudinary' in settings.INSTALLED_APPS
    
    print(f"cloudinary_storage in INSTALLED_APPS: {'✓ Yes' if cloudinary_storage_installed else '✗ No'}")
    print(f"cloudinary in INSTALLED_APPS: {'✓ Yes' if cloudinary_installed else '✗ No'}")
    
    # Check storage configuration
    default_storage = getattr(settings, 'DEFAULT_FILE_STORAGE', '')
    print(f"DEFAULT_FILE_STORAGE: {default_storage}")
    
    if 'cloudinary' in default_storage:
        print("✓ Cloudinary storage configured!")
    else:
        print("⚠ Cloudinary storage not configured (using local storage)")
    
    # Check Cloudinary settings
    cloudinary_settings = getattr(settings, 'CLOUDINARY_STORAGE', {})
    print(f"CLOUDINARY_STORAGE settings: {cloudinary_settings}")
    
    return cloudinary_storage_installed and cloudinary_installed

def test_model_field():
    """Test if the Product model has CloudinaryField"""
    print("\nTesting Model Configuration...")
    print("=" * 40)
    
    try:
        from store.models import Product
        field = Product._meta.get_field('image')
        field_type = type(field).__name__
        
        print(f"Product.image field type: {field_type}")
        
        if 'CloudinaryField' in field_type:
            print("✓ Product model uses CloudinaryField!")
            return True
        else:
            print("⚠ Product model still uses ImageField")
            return False
    except Exception as e:
        print(f"❌ Error testing model: {str(e)}")
        return False

def test_existing_products():
    """Test existing products and their image URLs"""
    print("\nTesting Existing Products...")
    print("=" * 40)
    
    try:
        products = Product.objects.all()
        print(f"Total products: {products.count()}")
        
        cloudinary_products = 0
        local_products = 0
        no_image_products = 0
        
        for product in products:
            if product.image:
                if hasattr(product.image, 'url') and 'cloudinary.com' in product.image.url:
                    cloudinary_products += 1
                    print(f"✓ Product {product.id}: Cloudinary image")
                elif hasattr(product.image, 'path'):
                    local_products += 1
                    print(f"⚠ Product {product.id}: Local image")
                else:
                    local_products += 1
                    print(f"⚠ Product {product.id}: Unknown image type")
            else:
                no_image_products += 1
                print(f"- Product {product.id}: No image")
        
        print(f"\nSummary:")
        print(f"Cloudinary images: {cloudinary_products}")
        print(f"Local images: {local_products}")
        print(f"No images: {no_image_products}")
        
        return True
    except Exception as e:
        print(f"❌ Error testing products: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("Cloudinary Integration Test")
    print("=" * 50)
    
    tests = [
        test_cloudinary_configuration,
        test_django_settings,
        test_model_field,
        test_existing_products
    ]
    
    results = []
    for test in tests:
        try:
            result = test()
            results.append(result)
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            results.append(False)
    
    print("\n" + "=" * 50)
    print("TEST SUMMARY")
    print("=" * 50)
    
    passed = sum(results)
    total = len(results)
    
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! Cloudinary is properly configured.")
    else:
        print("⚠ Some tests failed. Please check the configuration.")
        print("\nNext steps:")
        print("1. Set up Cloudinary credentials")
        print("2. Run migrations: python manage.py migrate")
        print("3. Migrate existing images: python manage.py migrate_to_cloudinary --backup")

if __name__ == '__main__':
    main()
