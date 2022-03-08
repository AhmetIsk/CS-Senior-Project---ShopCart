from rest_framework.serializers import ModelSerializer
from .models import Note, ProductBase, Store, PriceInStore, ProductInCart, ShoppingCart, UserMeta, Home
from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'first_name', 'last_name', 'username', 'email', 'groups', 'last_login', 'date_joined']


class HomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Home
        fields = ['id', 'home_owner']


class ProductBaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductBase
        fields = ['id', 'barcode', 'name', 'photo', 'category']


class StoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'available_products']


class PriceInStoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PriceInStore
        fields = ['id', 'product', 'quantity', 'adding_date']


class ProductInCartSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductInCart
        fields = ['id', 'product', 'quantity', 'adding_date']


class ShoppingCartSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ShoppingCart
        fields = ['id', 'products']


class UserMetaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserMeta
        fields = ['id', 'user', 'home', 'shopping_cart']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'url', 'name']


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        owner = serializers.Field(
            source='user.id')
        fields = ['body', 'user']

        def pre_save(self, obj):
            obj.user = self.request.user