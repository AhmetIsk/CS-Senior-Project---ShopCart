from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    body = models.TextField()


class Home(models.Model):
    home_owner = models.OneToOneField(User, on_delete=models.RESTRICT, related_name='owner')
    users = models.ManyToManyField(User)


class ProductBase(models.Model):
    barcode = models.CharField(max_length=200, unique=True)
    name = models.TextField(max_length=100, blank=True, null=True)
    photo = models.ImageField(upload_to='products', blank=True, null=True)
    category = models.CharField(max_length=200, blank=True, null=True)


class Store(models.Model):
    name = models.TextField(max_length=50, blank=True, null=True)
    available_products = models.ManyToManyField(ProductBase)


class PriceInStore(models.Model):
    product = models.ForeignKey(ProductBase, on_delete=models.RESTRICT)
    store = models.ForeignKey(Store, on_delete=models.RESTRICT)
    price = models.FloatField()


class ProductInCart(models.Model):
    product = models.OneToOneField(ProductBase, on_delete=models.RESTRICT)
    quantity = models.PositiveIntegerField(default=1)
    adding_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(null=True, blank=True)


class ShoppingCart(models.Model):
    products = models.ManyToManyField(ProductInCart)


class UserMeta(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    home = models.OneToOneField(Home, on_delete=models.RESTRICT, blank=True, null=True)
    shopping_cart = models.OneToOneField(ShoppingCart, on_delete=models.CASCADE)
