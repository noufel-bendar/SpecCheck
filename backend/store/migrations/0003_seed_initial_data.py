from django.db import migrations
import os
from django.contrib.auth.hashers import make_password


def seed_products_and_admin(apps, schema_editor):
    Product = apps.get_model('store', 'Product')
    User = apps.get_model('auth', 'User')

    # Seed example products only if there are no products yet
    if not Product.objects.exists():
        products = [
            {
                'title': 'SpecCheck Pro 14',
                'model': 'SC-P14-2025',
                'processor': 'Intel Core i7-1360P',
                'cpu_cores': 12,
                'cpu_clock_speed': 4.8,
                'battery_life': '10',
                'ram': 16,
                'storage': '512GB SSD',
                'gpu': 'Intel Iris Xe',
                'gpu_score': 3200,
                'screen_resolution': '2560x1600',
                'refresh_rate': 120,
                'display': '14" IPS',
                'keyboard': 'Backlit',
                'os': 'Windows 11',
                'price': 1399,
                'description': 'Portable powerhouse with great battery and bright high-res display.',
                'weight': 1.3,
            },
            {
                'title': 'SpecCheck Gamer 15',
                'model': 'SC-G15-RTX',
                'processor': 'AMD Ryzen 7 7840HS',
                'cpu_cores': 8,
                'cpu_clock_speed': 5.1,
                'battery_life': '6',
                'ram': 32,
                'storage': '1TB SSD',
                'gpu': 'NVIDIA RTX 4060',
                'gpu_score': 13500,
                'screen_resolution': '1920x1080',
                'refresh_rate': 165,
                'display': '15.6" IPS',
                'keyboard': 'RGB',
                'os': 'Windows 11',
                'price': 1699,
                'description': 'High refresh gaming laptop with strong GPU performance.',
                'weight': 2.2,
            },
            {
                'title': 'SpecCheck Creator 16',
                'model': 'SC-C16-OLED',
                'processor': 'Intel Core i9-13900H',
                'cpu_cores': 14,
                'cpu_clock_speed': 5.4,
                'battery_life': '8',
                'ram': 32,
                'storage': '2TB SSD',
                'gpu': 'NVIDIA RTX 4070',
                'gpu_score': 16000,
                'screen_resolution': '3840x2400',
                'refresh_rate': 120,
                'display': '16" OLED',
                'keyboard': 'Backlit',
                'os': 'Windows 11',
                'price': 2499,
                'description': 'OLED display and powerful GPU ideal for content creation.',
                'weight': 1.9,
            },
            {
                'title': 'SpecCheck Student 13',
                'model': 'SC-S13',
                'processor': 'Intel Core i5-1235U',
                'cpu_cores': 10,
                'cpu_clock_speed': 4.4,
                'battery_life': '12',
                'ram': 8,
                'storage': '256GB SSD',
                'gpu': 'Intel Iris Xe',
                'gpu_score': 2800,
                'screen_resolution': '1920x1200',
                'refresh_rate': 60,
                'display': '13.3" IPS',
                'keyboard': 'Standard',
                'os': 'Windows 11',
                'price': 699,
                'description': 'Light and affordable choice for students and everyday use.',
                'weight': 1.2,
            },
            {
                'title': 'SpecCheck Dev 15',
                'model': 'SC-D15-LNX',
                'processor': 'AMD Ryzen 9 7940HS',
                'cpu_cores': 8,
                'cpu_clock_speed': 5.2,
                'battery_life': '9',
                'ram': 64,
                'storage': '2TB SSD',
                'gpu': 'NVIDIA RTX 4060',
                'gpu_score': 14000,
                'screen_resolution': '2560x1440',
                'refresh_rate': 165,
                'display': '15.6" IPS',
                'keyboard': 'Backlit',
                'os': 'Ubuntu 24.04',
                'price': 2199,
                'description': 'Developer-focused laptop with high RAM and Linux out of the box.',
                'weight': 2.0,
            },
            {
                'title': 'SpecCheck Air 13',
                'model': 'SC-A13',
                'processor': 'Intel Core Ultra 7',
                'cpu_cores': 12,
                'cpu_clock_speed': 4.7,
                'battery_life': '15',
                'ram': 16,
                'storage': '512GB SSD',
                'gpu': 'Intel Arc iGPU',
                'gpu_score': 5000,
                'screen_resolution': '2560x1600',
                'refresh_rate': 120,
                'display': '13.6" IPS',
                'keyboard': 'Backlit',
                'os': 'Windows 11',
                'price': 1299,
                'description': 'Ultralight machine with excellent battery life and strong iGPU.',
                'weight': 1.1,
            },
        ]

        Product.objects.bulk_create([Product(**p) for p in products])

    # Optionally seed an admin/superuser if none exists
    if not User.objects.filter(is_superuser=True).exists():
        username = os.environ.get('ADMIN_USERNAME', 'admin')
        email = os.environ.get('ADMIN_EMAIL', 'admin@example.com')
        password = os.environ.get('ADMIN_PASSWORD', 'admin123')

        admin = User(
            username=username,
            email=email,
            is_staff=True,
            is_superuser=True,
            password=make_password(password)  # encrypt password
        )
        admin.save()


def unseed_products_and_admin(apps, schema_editor):
    """Reverse function: remove only the seeded products by title; keep admin user intact."""
    Product = apps.get_model('store', 'Product')
    seeded_titles = {
        'SpecCheck Pro 14',
        'SpecCheck Gamer 15',
        'SpecCheck Creator 16',
        'SpecCheck Student 13',
        'SpecCheck Dev 15',
        'SpecCheck Air 13',
    }
    Product.objects.filter(title__in=seeded_titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_product_image'),
    ]

    operations = [
        migrations.RunPython(seed_products_and_admin, unseed_products_and_admin),
    ]
