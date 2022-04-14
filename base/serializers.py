import json

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from .models import Note, ProductBase, Store, PriceInStore, ProductInCart, ShoppingCart, UserMeta, Community
from django.contrib.auth.models import User, Group
from rest_framework import serializers, exceptions


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'groups', 'last_login', 'date_joined']


class UserSerializerIDOnly(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class CommunitySerializer(serializers.HyperlinkedModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    community_owner = UserSerializer(read_only=True)

    class Meta:
        model = Community
        fields = ['id', 'name', 'community_owner', 'users']


class ShortCommunitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Community
        fields = ['id']


class StoreSerializer(serializers.HyperlinkedModelSerializer):
    # available_products = ProductBaseSerializer(many=True)
    class Meta:
        model = Store
        fields = ['url', 'id', 'name']  # 'available_products'


class ProductBaseSerializer(serializers.HyperlinkedModelSerializer):
    store_set = StoreSerializer(read_only=True, many=True)

    class Meta:
        model = ProductBase
        fields = ['id', 'barcode', 'name', 'photo', 'external_photo_url', 'category', 'min_price', 'store_set']


class PriceInStoreSerializer(serializers.HyperlinkedModelSerializer):
    product = ProductBaseSerializer()
    store = StoreSerializer()

    class Meta:
        model = PriceInStore
        fields = '__all__'


class ProductInCartSerializer(serializers.HyperlinkedModelSerializer):
    product = ProductBaseSerializer()

    class Meta:
        model = ProductInCart
        fields = ['id', 'product', 'quantity', 'adding_date']


class ShoppingCartSerializer(serializers.HyperlinkedModelSerializer):
    # user = UserSerializer()
    communities = ShortCommunitySerializer(many=True, required=False, read_only=True)  # , read_only=True
    products = ProductInCartSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = ShoppingCart
        fields = ['id', 'products', 'priority', 'communities', 'name']  # 'user'
        # read_only_fields = ['communities', ]

    def create(self, validated_data):
        sc = ShoppingCart(priority=validated_data['priority'], name=validated_data['name'], user=validated_data['user'])
        sc.save()
        if validated_data['communities']:
            for cid in validated_data['communities']:
                if Community.objects.filter(id=cid['id']).exists():
                    sc.communities.add(Community.objects.get(id=cid['id']))
                sc.save()

        # Add to UserMeta too
        um = UserMeta.objects.get(user=validated_data['user'])
        um.shopping_carts.add(sc)
        um.save()

        return sc


class UserMetaSerializer(serializers.HyperlinkedModelSerializer):
    communities = CommunitySerializer(many=True)
    shopping_carts = ShoppingCartSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = UserMeta
        fields = ['id', 'user', 'communities', 'shopping_carts']


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
