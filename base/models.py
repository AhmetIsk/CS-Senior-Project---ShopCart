from django.db import models
from django.contrib.auth.models import User
from static.currencies import CURRENCIES
from drf_extra_fields.fields import Base64ImageField


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    body = models.TextField()


class Community(models.Model):
    name = models.CharField(max_length=100)
    community_owner = models.ForeignKey(User, on_delete=models.RESTRICT, related_name='owner')
    users = models.ManyToManyField(User, blank=True)
    create_time = models.DateTimeField(auto_now_add=True)


class ProductBase(models.Model):
    barcode = models.CharField(max_length=200, unique=True, blank=True, null=True)
    name = models.TextField(max_length=100, unique=True, blank=True, null=True)
    photo = models.ImageField(upload_to='products', blank=True, null=True)
    external_photo_url = models.URLField(max_length=200, blank=True, null=True)
    product_url = models.URLField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=200, blank=True, null=True)
    min_price = models.FloatField(blank=True, null=True)


class Store(models.Model):
    name = models.TextField(max_length=50, blank=True, null=True, unique=True)
    available_products = models.ManyToManyField(ProductBase, blank=True)


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
    products = models.ManyToManyField(ProductInCart, blank=True)
    priority = models.CharField(choices=CHOICES, max_length=300)
    communities = models.ManyToManyField(Community, blank=True)


class UserMeta(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    communities = models.ManyToManyField(Community, blank=True)
    shopping_carts = models.ManyToManyField(ShoppingCart, blank=True)
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)


class PurchaseHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shopping_cart = models.ForeignKey(ShoppingCart, on_delete=models.PROTECT)
    product_base = models.ForeignKey(ProductBase, on_delete=models.PROTECT)
    price_bought = models.FloatField()
    quantity = models.PositiveIntegerField()
    purchase_date = models.DateTimeField(auto_now_add=True)
