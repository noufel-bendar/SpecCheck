from django.db import models

# Create your models here.
from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    image = models.ImageField(upload_to='products/',blank=True, null=True)
    processor = models.CharField(max_length=100)
    cpu_cores = models.IntegerField()
    cpu_clock_speed = models.FloatField()
    battery_life = models.CharField(max_length=10)
    ram = models.IntegerField()
    storage = models.CharField(max_length=50)
    gpu = models.CharField(max_length=100)
    gpu_score = models.IntegerField()
    screen_resolution = models.CharField(max_length=50)
    refresh_rate = models.IntegerField()
    display = models.CharField(max_length=100)
    keyboard = models.CharField(max_length=100)
    os = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField()
    weight = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.model}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    alt_text = models.CharField(max_length=255, blank=True, default='')
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_primary', 'id']

    def __str__(self):
        product_part = f"{self.product.title} - {self.product.model}" if self.product_id else 'Orphaned ProductImage'
        return f"Image for {product_part} ({'primary' if self.is_primary else 'secondary'})"
