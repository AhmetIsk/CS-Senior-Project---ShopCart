from django.db import models
from django.contrib.auth.models import User
from static.currencies import CURRENCIES


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    body = models.TextField()


class Community(models.Model):
    name = models.CharField(max_length=100)
    community_code = models.CharField(max_length=100, blank=True, null=True)
    community_owner = models.OneToOneField(User, on_delete=models.RESTRICT, related_name='owner')
    users = models.ManyToManyField(User)


class ProductBase(models.Model):
    barcode = models.CharField(max_length=200, unique=True)
    name = models.TextField(max_length=100, blank=True, null=True)
    photo = models.ImageField(upload_to='products', blank=True, null=True)
    external_photo_url = models.URLField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=200, blank=True, null=True)


class Store(models.Model):
    name = models.TextField(max_length=50, blank=True, null=True, unique=True)
    available_products = models.ManyToManyField(ProductBase)


class PriceInStore(models.Model):
    product = models.ForeignKey(ProductBase, on_delete=models.RESTRICT)
    store = models.ForeignKey(Store, on_delete=models.RESTRICT)
    price = models.FloatField()
    currency = models.CharField(choices=CURRENCIES, max_length=8, blank=False, default='TRY')


class ProductInCart(models.Model):
    product = models.ForeignKey(ProductBase, on_delete=models.RESTRICT)
    quantity = models.PositiveIntegerField(default=1)
    adding_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(null=True, blank=True)


class ShoppingCart(models.Model):
    CHOICES = (
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low')
    )

    name = models.CharField(max_length=100, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(ProductInCart)
    priority = models.CharField(choices=CHOICES, max_length=300)
    communities = models.ManyToManyField(Community)


class UserMeta(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    communities = models.ManyToManyField(Community)
    shopping_carts = models.ManyToManyField(ShoppingCart)
