#!/usr/bin/env python
"""
Debug script to check Django admin issues
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
from store.admin import ProductAdmin
from django.contrib.admin.sites import site

def check_environment():
    """Check environment variables"""
    print("🔧 Environment Check")
    print("=" * 40)
    
    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME')
    api_key = os.environ.get('CLOUDINARY_API_KEY')
    api_secret = os.environ.get('CLOUDINARY_API_SECRET')
    
    print(f"CLOUDINARY_CLOUD_NAME: {'✅ Set' if cloud_name else '❌ Not set'}")
    print(f"CLOUDINARY_API_KEY: {'✅ Set' if api_key else '❌ Not set'}")
    print(f"CLOUDINARY_API_SECRET: {'✅ Set' if api_secret else '❌ Not set'}")
    
    if not all([cloud_name, api_key, api_secret]):
        print("\n❌ Cloudinary credentials not set! This will cause admin issues.")
        return False
    return True

def check_model_fields():
    """Check model field configuration"""
    print("\n📋 Model Field Check")
    print("=" * 40)
    
    try:
        field = Product._meta.get_field('image')
        print(f"Field type: {type(field).__name__}")
        print(f"Field class: {field.__class__}")
        print(f"Is editable: {field.editable}")
        print(f"Blank allowed: {field.blank}")
        print(f"Null allowed: {field.null}")
        
        # Check if it's properly configured
        if 'CloudinaryField' in str(type(field)):
            print("✅ CloudinaryField properly configured")
        else:
            print("❌ Not a CloudinaryField")
            
    except Exception as e:
        print(f"❌ Error checking field: {str(e)}")

def check_product_data():
    """Check existing product data"""
    print("\n🗄️ Product Data Check")
    print("=" * 40)
    
    try:
        products = Product.objects.all()
        print(f"Total products: {products.count()}")
        
        for i, product in enumerate(products[:3]):  # Check first 3
            print(f"\nProduct {i+1}: {product.title}")
            print(f"  Image type: {type(product.image)}")
            print(f"  Image value: {product.image}")
            
            if hasattr(product.image, 'url'):
                print(f"  Image URL: {product.image.url}")
            else:
                print(f"  No URL attribute")
                
    except Exception as e:
        print(f"❌ Error checking products: {str(e)}")

def check_admin_configuration():
    """Check admin configuration"""
    print("\n⚙️ Admin Configuration Check")
    print("=" * 40)
    
    try:
        # Check if Product is registered
        if Product in site._registry:
            print("✅ Product model is registered in admin")
        else:
            print("❌ Product model not registered in admin")
        
        # Check admin class
        admin_class = site._registry.get(Product)
        if admin_class:
            print(f"Admin class: {type(admin_class).__name__}")
            print(f"List display: {admin_class.list_display}")
            print(f"Readonly fields: {admin_class.readonly_fields}")
            print(f"Fieldsets: {len(admin_class.fieldsets)} sections")
        else:
            print("❌ No admin class found")
            
    except Exception as e:
        print(f"❌ Error checking admin: {str(e)}")

def test_admin_form():
    """Test admin form creation"""
    print("\n📝 Admin Form Test")
    print("=" * 40)
    
    try:
        from django.contrib.admin.sites import site
        from django.test import RequestFactory
        
        # Create a mock request
        factory = RequestFactory()
        request = factory.get('/admin/store/product/')
        
        # Get admin class
        admin_class = site._registry.get(Product)
        if admin_class:
            # Try to create a form
            form = admin_class.get_form(request)()
            print("✅ Admin form created successfully")
            print(f"Form fields: {list(form.fields.keys())}")
            
            # Check image field specifically
            if 'image' in form.fields:
                image_field = form.fields['image']
                print(f"Image field type: {type(image_field).__name__}")
                print(f"Image field widget: {type(image_field.widget).__name__}")
            else:
                print("❌ Image field not in form")
        else:
            print("❌ No admin class found")
            
    except Exception as e:
        print(f"❌ Error testing admin form: {str(e)}")

def main():
    """Run all diagnostic checks"""
    print("🔍 Django Admin Diagnostic")
    print("=" * 50)
    
    checks = [
        ("Environment Variables", check_environment),
        ("Model Fields", check_model_fields),
        ("Product Data", check_product_data),
        ("Admin Configuration", check_admin_configuration),
        ("Admin Form", test_admin_form),
    ]
    
    results = []
    for check_name, check_func in checks:
        try:
            result = check_func()
            results.append(result if result is not None else True)
        except Exception as e:
            print(f"❌ {check_name} failed: {str(e)}")
            results.append(False)
    
    print("\n" + "=" * 50)
    print("📋 DIAGNOSTIC SUMMARY")
    print("=" * 50)
    
    passed = sum(results)
    total = len(results)
    
    print(f"Checks passed: {passed}/{total}")
    
    if passed < total:
        print("\n🔧 Likely Issues:")
        if not check_environment():
            print("1. Cloudinary credentials not set - this will prevent image uploads")
        print("2. Check Django logs for specific error messages")
        print("3. Try accessing admin with a superuser account")
        print("4. Check if the server is running properly")

if __name__ == '__main__':
    main()
