from django.db import migrations


def sanitize_product_images(apps, schema_editor):
    import re
    from urllib.parse import urlparse

    Product = apps.get_model('store', 'Product')

    # Only run if there are products to sanitize
    if not Product.objects.exists():
        return

    for product in Product.objects.all():
        raw = getattr(product, 'image', None)
        image_name = ''
        if raw:
            try:
                image_name = raw.name
            except Exception:
                image_name = str(raw)

        if not image_name:
            continue

        original = image_name

        s = image_name.strip()

        # Fix missing colon in protocol (https// -> https://)
        s = re.sub(r'^(https?)(//)', r'\1://', s, flags=re.IGNORECASE)

        # If the string contains an absolute URL (even if prefixed by junk), extract it
        http_idx = s.lower().rfind('http://')
        https_idx = s.lower().rfind('https://')
        idx = max(http_idx, https_idx)
        if idx >= 0:
            s = s[idx:]
            parsed = urlparse(s)
            path = parsed.path or ''
        else:
            path = s

        # Normalize path: drop any leading /media/ and leading slashes
        if path.lower().startswith('/media/'):
            path = path[7:]
        if path.lower().startswith('media/'):
            path = path[6:]
        path = path.lstrip('/')

        # Ensure we store under products/<filename>
        filename = path.split('/')[-1] if path else ''
        if not filename:
            continue
        clean = f"products/{filename}"

        # Only update if changed
        if clean != original:
            try:
                product.image.name = clean
                product.save(update_fields=['image'])
            except Exception:
                # If assignment fails for any reason, skip this record
                continue


def reverse_noop(apps, schema_editor):
    # Non-destructive reverse
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_load_fixture'),
    ]

    operations = [
        migrations.RunPython(sanitize_product_images, reverse_noop),
    ]


