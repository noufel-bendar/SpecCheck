from django.db import migrations, models
import django.db.models.deletion


def backfill_primary_images(apps, schema_editor):
    Product = apps.get_model('store', 'Product')
    ProductImage = apps.get_model('store', 'ProductImage')
    for product in Product.objects.all():
        image_field = getattr(product, 'image', None)
        image_name = getattr(image_field, 'name', '') if image_field else ''
        if image_name:
            # Create primary ProductImage if not exists
            if not ProductImage.objects.filter(product_id=product.id, is_primary=True).exists():
                pi = ProductImage(product_id=product.id, is_primary=True)
                try:
                    pi.image.name = image_name
                except Exception:
                    pass
                pi.save()


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_sanitize_product_image_urls'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='products/')),
                ('alt_text', models.CharField(blank=True, default='', max_length=255)),
                ('is_primary', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='store.product')),
            ],
            options={
                'ordering': ['-is_primary', 'id'],
            },
        ),
        migrations.RunPython(backfill_primary_images, noop_reverse),
    ]