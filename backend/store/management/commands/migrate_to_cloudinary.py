from django.core.management.base import BaseCommand
from store.models import Product
import cloudinary
import cloudinary.uploader
from django.conf import settings
import os

class Command(BaseCommand):
    help = 'Migrate existing local images to Cloudinary'

    def add_arguments(self, parser):
        parser.add_argument(
            '--backup',
            action='store_true',
            help='Create backup of local images before migration',
        )
        parser.add_argument(
            '--delete-local',
            action='store_true',
            help='Delete local images after successful upload to Cloudinary',
        )

    def handle(self, *args, **options):
        self.stdout.write("Starting migration to Cloudinary...")
        
        # Check if Cloudinary is configured
        if not all([
            settings.CLOUDINARY_STORAGE.get('CLOUD_NAME'),
            settings.CLOUDINARY_STORAGE.get('API_KEY'),
            settings.CLOUDINARY_STORAGE.get('API_SECRET')
        ]):
            self.stdout.write(
                self.style.ERROR(
                    "Error: Cloudinary credentials not configured!\n"
                    "Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables."
                )
            )
            return
        
        # Configure Cloudinary
        cloudinary.config(
            cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
            api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
            api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
        )
        
        # Create backup if requested
        if options['backup']:
            self.create_backup()
        
        products = Product.objects.all()
        migrated_count = 0
        error_count = 0
        
        for product in products:
            if product.image:
                try:
                    # Check if image is already a Cloudinary URL
                    if hasattr(product.image, 'url') and 'cloudinary.com' in product.image.url:
                        self.stdout.write(
                            f"Product {product.id} already has Cloudinary image: {product.image.url}"
                        )
                        continue
                    
                    # Get the local file path
                    local_path = product.image.path
                    
                    if os.path.exists(local_path):
                        self.stdout.write(
                            f"Uploading image for product {product.id}: {product.title}"
                        )
                        
                        # Upload to Cloudinary
                        with open(local_path, 'rb') as image_file:
                            result = cloudinary.uploader.upload(
                                image_file,
                                folder='products',
                                public_id=f"product_{product.id}_{product.title.replace(' ', '_')}",
                                overwrite=True
                            )
                        
                        # Update the product with the new Cloudinary URL
                        product.image = result['secure_url']
                        product.save()
                        
                        self.stdout.write(
                            self.style.SUCCESS(
                                f"Successfully migrated product {product.id} to Cloudinary: {result['secure_url']}"
                            )
                        )
                        migrated_count += 1
                        
                        # Delete local file if requested
                        if options['delete_local']:
                            os.remove(local_path)
                            self.stdout.write(f"Deleted local file: {local_path}")
                        
                    else:
                        self.stdout.write(
                            self.style.WARNING(
                                f"Local image file not found for product {product.id}: {local_path}"
                            )
                        )
                        error_count += 1
                        
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f"Error migrating product {product.id}: {str(e)}")
                    )
                    error_count += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f"\nMigration completed!\n"
                f"Successfully migrated: {migrated_count} products\n"
                f"Errors: {error_count} products"
            )
        )

    def create_backup(self):
        """Create a backup of local images"""
        import shutil
        from datetime import datetime
        from pathlib import Path
        
        backup_dir = Path(settings.BASE_DIR) / f"media_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        if os.path.exists(Path(settings.BASE_DIR) / 'media'):
            self.stdout.write(f"Creating backup of local images to: {backup_dir}")
            shutil.copytree(Path(settings.BASE_DIR) / 'media', backup_dir)
            self.stdout.write(self.style.SUCCESS("Backup completed!"))
        else:
            self.stdout.write("No local media directory found.")
