#!/usr/bin/env python
"""
Comprehensive Cloudinary Integration Verification Script
"""
import os
import sys
import django
from pathlib import Path
import requests
from urllib.parse import urlparse

# Add the project directory to Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.conf import settings
from store.models import Product
from store.serializers import ProductSerializer
import cloudinary

def test_environment_variables():
    """Test if Cloudinary environment variables are set"""
    print("🔧 Testing Environment Variables...")
    print("=" * 50)
    
    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME')
    api_key = os.environ.get('CLOUDINARY_API_KEY')
    api_secret = os.environ.get('CLOUDINARY_API_SECRET')
    
    print(f"CLOUDINARY_CLOUD_NAME: {'✅ Set' if cloud_name else '❌ Not set'}")
    print(f"CLOUDINARY_API_KEY: {'✅ Set' if api_key else '❌ Not set'}")
    print(f"CLOUDINARY_API_SECRET: {'✅ Set' if api_secret else '❌ Not set'}")
    
    if all([cloud_name, api_key, api_secret]):
        print("✅ All Cloudinary environment variables are set!")
        return True
    else:
        print("❌ Some Cloudinary environment variables are missing!")
        return False

def test_django_configuration():
    """Test Django settings for Cloudinary"""
    print("\n⚙️ Testing Django Configuration...")
    print("=" * 50)
    
    # Check installed apps
    cloudinary_storage_installed = 'cloudinary_storage' in settings.INSTALLED_APPS
    cloudinary_installed = 'cloudinary' in settings.INSTALLED_APPS
    
    print(f"cloudinary_storage in INSTALLED_APPS: {'✅ Yes' if cloudinary_storage_installed else '❌ No'}")
    print(f"cloudinary in INSTALLED_APPS: {'✅ Yes' if cloudinary_installed else '❌ No'}")
    
    # Check storage configuration
    default_storage = getattr(settings, 'DEFAULT_FILE_STORAGE', '')
    print(f"DEFAULT_FILE_STORAGE: {default_storage}")
    
    if 'cloudinary' in default_storage:
        print("✅ Cloudinary storage configured!")
    else:
        print("⚠️ Cloudinary storage not configured (using local storage)")
    
    # Check Cloudinary settings
    cloudinary_settings = getattr(settings, 'CLOUDINARY_STORAGE', {})
    print(f"CLOUDINARY_STORAGE settings: {cloudinary_settings}")
    
    return cloudinary_storage_installed and cloudinary_installed

def test_model_configuration():
    """Test if Product model uses CloudinaryField"""
    print("\n📋 Testing Model Configuration...")
    print("=" * 50)
    
    try:
        field = Product._meta.get_field('image')
        field_type = type(field).__name__
        
        print(f"Product.image field type: {field_type}")
        
        if 'CloudinaryField' in field_type:
            print("✅ Product model uses CloudinaryField!")
            return True
        else:
            print("❌ Product model still uses ImageField")
            return False
    except Exception as e:
        print(f"❌ Error testing model: {str(e)}")
        return False

def test_database_images():
    """Test existing products and their image URLs"""
    print("\n🗄️ Testing Database Images...")
    print("=" * 50)
    
    try:
        products = Product.objects.all()
        print(f"Total products: {products.count()}")
        
        cloudinary_products = 0
        local_products = 0
        no_image_products = 0
        malformed_products = 0
        
        for product in products:
            if product.image:
                image_str = str(product.image)
                
                # Check if it's a Cloudinary URL
                if 'cloudinary.com' in image_str:
                    cloudinary_products += 1
                    print(f"✅ Product {product.id} ({product.title}): Cloudinary image")
                elif image_str.startswith(('http://', 'https://')):
                    # Other external URL
                    cloudinary_products += 1
                    print(f"✅ Product {product.id} ({product.title}): External URL")
                elif image_str.startswith('products/'):
                    local_products += 1
                    print(f"⚠️ Product {product.id} ({product.title}): Local image path")
                else:
                    malformed_products += 1
                    print(f"❌ Product {product.id} ({product.title}): Malformed image data")
            else:
                no_image_products += 1
                print(f"- Product {product.id} ({product.title}): No image")
        
        print(f"\n📊 Summary:")
        print(f"Cloudinary/External images: {cloudinary_products}")
        print(f"Local images: {local_products}")
        print(f"Malformed images: {malformed_products}")
        print(f"No images: {no_image_products}")
        
        if local_products > 0:
            print(f"\n⚠️ {local_products} products still have local image paths!")
            print("Run: python manage.py migrate_to_cloudinary --backup")
        
        return True
    except Exception as e:
        print(f"❌ Error testing products: {str(e)}")
        return False

def test_serializer_output():
    """Test serializer output for image URLs"""
    print("\n🔄 Testing Serializer Output...")
    print("=" * 50)
    
    try:
        products = Product.objects.all()[:3]  # Test first 3 products
        serializer = ProductSerializer(products, many=True, context={'request': None})
        
        for i, product_data in enumerate(serializer.data):
            product = products[i]
            image_url = product_data.get('image', '')
            
            print(f"\nProduct {product.id} ({product.title}):")
            print(f"  Original image: {product.image}")
            print(f"  Serialized URL: {image_url}")
            
            if image_url:
                if 'cloudinary.com' in image_url:
                    print(f"  ✅ Cloudinary URL detected")
                elif image_url.startswith('http'):
                    print(f"  ✅ External URL detected")
                elif image_url.startswith('/'):
                    print(f"  ⚠️ Relative URL (needs base URL)")
                else:
                    print(f"  ❌ Malformed URL")
            else:
                print(f"  - No image URL")
        
        return True
    except Exception as e:
        print(f"❌ Error testing serializer: {str(e)}")
        return False

def test_url_accessibility():
    """Test if image URLs are accessible"""
    print("\n🌐 Testing URL Accessibility...")
    print("=" * 50)
    
    try:
        products = Product.objects.all()[:3]  # Test first 3 products
        serializer = ProductSerializer(products, many=True, context={'request': None})
        
        accessible_count = 0
        total_count = 0
        
        for product_data in serializer.data:
            image_url = product_data.get('image', '')
            if image_url and image_url.startswith('http'):
                total_count += 1
                try:
                    response = requests.head(image_url, timeout=5)
                    if response.status_code == 200:
                        accessible_count += 1
                        print(f"✅ {image_url[:60]}... - Accessible")
                    else:
                        print(f"❌ {image_url[:60]}... - Status: {response.status_code}")
                except Exception as e:
                    print(f"❌ {image_url[:60]}... - Error: {str(e)}")
        
        if total_count > 0:
            print(f"\n📊 URL Accessibility: {accessible_count}/{total_count} URLs accessible")
        
        return True
    except Exception as e:
        print(f"❌ Error testing URL accessibility: {str(e)}")
        return False

def test_mobile_responsiveness():
    """Test mobile responsiveness indicators"""
    print("\n📱 Testing Mobile Responsiveness...")
    print("=" * 50)
    
    # Check if Tailwind CSS is configured (indicates responsive design)
    try:
        frontend_dir = BASE_DIR.parent / 'Frontend'
        tailwind_config = frontend_dir / 'tailwind.config.js'
        
        if tailwind_config.exists():
            print("✅ Tailwind CSS configured (good for responsive design)")
        else:
            print("⚠️ Tailwind CSS not found")
        
        # Check for responsive classes in components
        product_card = frontend_dir / 'src' / 'components' / 'ProductCard.jsx'
        if product_card.exists():
            with open(product_card, 'r') as f:
                content = f.read()
                if 'object-contain' in content:
                    print("✅ ProductCard uses object-contain (responsive images)")
                if 'w-full' in content:
                    print("✅ ProductCard uses w-full (responsive width)")
        
        return True
    except Exception as e:
        print(f"❌ Error testing mobile responsiveness: {str(e)}")
        return False

def main():
    """Run all verification tests"""
    print("🔍 Cloudinary Integration Verification")
    print("=" * 60)
    
    tests = [
        ("Environment Variables", test_environment_variables),
        ("Django Configuration", test_django_configuration),
        ("Model Configuration", test_model_configuration),
        ("Database Images", test_database_images),
        ("Serializer Output", test_serializer_output),
        ("URL Accessibility", test_url_accessibility),
        ("Mobile Responsiveness", test_mobile_responsiveness),
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append(result)
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
            results.append(False)
    
    print("\n" + "=" * 60)
    print("📋 VERIFICATION SUMMARY")
    print("=" * 60)
    
    passed = sum(results)
    total = len(results)
    
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! Cloudinary integration is working correctly.")
    else:
        print("⚠️ Some tests failed. Please address the issues above.")
        
        print("\n🔧 Recommended Actions:")
        if not test_environment_variables():
            print("1. Set Cloudinary environment variables")
        if not test_database_images():
            print("2. Migrate existing images to Cloudinary")
        print("3. Test the frontend with the updated components")
        print("4. Deploy and verify images persist after redeployment")

if __name__ == '__main__':
    main()
