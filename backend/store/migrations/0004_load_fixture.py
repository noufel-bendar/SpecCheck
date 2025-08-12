from django.db import migrations
from django.core import serializers
from django.core.management.color import no_style
import json
import os


def load_fixture_if_empty(apps, schema_editor):
    # Models via historical apps registry
    Product = apps.get_model('store', 'Product')
    User = apps.get_model('auth', 'User')

    # Only load if there are no products yet (idempotent)
    if Product.objects.exists():
        return

    # Resolve fixture path (../fixtures/prod_dump.json relative to this migration file)
    migrations_dir = os.path.dirname(__file__)
    fixture_path = os.path.abspath(os.path.join(migrations_dir, '..', 'fixtures', 'prod_dump.json'))

    if not os.path.exists(fixture_path):
        # Nothing to load
        return

    # Read JSON as UTF-8 to avoid encoding issues
    with open(fixture_path, 'r', encoding='utf-8') as fh:
        raw = fh.read()

    # Deserialize and insert, preserving PKs; skip if PK already exists
    # ignorenonexistent helps if some models in fixture don't exist in this app/version
    for obj in serializers.deserialize('json', raw, ignorenonexistent=True):
        model = obj.object.__class__
        pk = obj.object.pk
        # Use historical model for the PK existence check
        app_label = model._meta.app_label
        model_name = model._meta.model_name
        HistModel = apps.get_model(app_label, model_name)
        if not HistModel.objects.filter(pk=pk).exists():
            # preserve given PK
            obj.object.save(force_insert=True)

    # Reset sequences so future inserts don't collide (PostgreSQL)
    connection = schema_editor.connection
    sequence_sql = connection.ops.sequence_reset_sql(no_style(), [
        apps.get_model('store', 'Product'),
        apps.get_model('auth', 'User'),
    ])
    with connection.cursor() as cursor:
        for sql in sequence_sql:
            cursor.execute(sql)


def unload_fixture(apps, schema_editor):
    # Non-destructive reverse: do nothing
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_seed_initial_data'),
    ]

    operations = [
        migrations.RunPython(load_fixture_if_empty, unload_fixture),
    ]