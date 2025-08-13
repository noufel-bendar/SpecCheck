#!/usr/bin/env python
"""
Simple script to load initial data manually.
Run this only when you want to reset the database to initial state.
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.core.management import call_command

def load_initial_data():
    print("Loading initial product data...")
    try:
        call_command('loaddata', 'data.json')
        print("✅ Successfully loaded initial data")
    except Exception as e:
        print(f"❌ Failed to load initial data: {e}")

if __name__ == '__main__':
    load_initial_data()
