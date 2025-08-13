from django.core.management.base import BaseCommand
from django.core.management import call_command
from store.models import Product


class Command(BaseCommand):
    help = 'Load initial data only if the database is empty'

    def handle(self, *args, **options):
        # Check if products already exist
        if Product.objects.exists():
            self.stdout.write(
                self.style.WARNING(
                    'Products already exist in database. Skipping initial data load to preserve admin changes.'
                )
            )
            return

        self.stdout.write('Loading initial product data...')
        try:
            call_command('loaddata', 'data.json')
            self.stdout.write(
                self.style.SUCCESS('Successfully loaded initial data')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Failed to load initial data: {e}')
            )
