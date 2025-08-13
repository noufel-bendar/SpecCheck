#!/usr/bin/env python3
"""
Script to load product data without images.
This ensures products are created but images must be uploaded through Django admin.
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.core.management import call_command
from store.models import Product

def main():
    print("Loading product data without images...")
    
    # Check if products already exist
    if Product.objects.exists():
        print("Products already exist. Skipping data load.")
        print("To reset and reload, delete all products first in Django admin.")
        return
    
    try:
        # Load the data.json file
        call_command('loaddata', 'data.json')
        print("✅ Product data loaded successfully!")
        print("📝 Note: No images were loaded. Upload images through Django admin.")
        
        # Show product count
        product_count = Product.objects.count()
        print(f"📊 Total products created: {product_count}")
        
    except Exception as e:
        print(f"❌ Error loading data: {e}")
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
