import json

from drf_extra_fields.fields import Base64ImageField
from rest_framework.serializers import ModelSerializer
from .models import Note, ProductBase, Store, PriceInStore, ProductInCart, ShoppingCart, UserMeta, Community, \
    PurchaseHistory
from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'groups', 'last_login', 'date_joined']


class PurchaseHistorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PurchaseHistory
        fields = '__all__'


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
        read_only_fields = ['name']
        fields = ['id', 'name']


class StoreSerializer(serializers.HyperlinkedModelSerializer):
    # available_products = ProductBaseSerializer(many=True)
    class Meta:
        model = Store
        fields = ['url', 'id', 'name']  # 'available_products'


class ProductBaseSerializer(serializers.HyperlinkedModelSerializer):
    store_set = StoreSerializer(read_only=True, many=True)

    class Meta:
        model = ProductBase
        fields = ['id', 'barcode', 'name', 'photo', 'external_photo_url', 'category', 'min_price', 'store_set',
                  'product_url']


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


class SimpleShoppingCartSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ShoppingCart
        fields = ['id', 'priority', 'name']


class ShoppingCartSerializer(serializers.HyperlinkedModelSerializer):
    # user = UserSerializer()
    communities = ShortCommunitySerializer(many=True, required=True, read_only=False)  # , read_only=True
    products = ProductInCartSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = ShoppingCart
        fields = ['id', 'products', 'priority', 'communities', 'name']  # 'user'
        # read_only_fields = ['communities', ]

    def create(self, validated_data):
        sc = ShoppingCart(priority=validated_data['priority'], name=validated_data['name'],
                          user=self.context['request'].user)
        sc.save()
        print("valdata: ", validated_data)
        if self.context['request'].data['communities']:
            for cid in self.context['request'].data['communities']:
                # TODO: Check user is inside this community
                # umeta = UserMeta.objects.get(user=self.context['request'].user)
                if Community.objects.filter(id=cid['id']).exists():
                    sc.communities.add(Community.objects.get(id=cid['id']))
                sc.save()

        # Add to UserMeta too
        um = UserMeta.objects.get(user=self.context['request'].user)
        um.shopping_carts.add(sc)
        um.save()

        return sc

class SimpleUserMetaSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    avatar = Base64ImageField(required=False)

    class Meta:
        model = UserMeta
        fields = ['id', 'avatar', 'user', 'latitude', 'longitude']

class UserMetaSerializer(serializers.HyperlinkedModelSerializer):
    communities = CommunitySerializer(many=True)
    shopping_carts = ShoppingCartSerializer(many=True)
    user = UserSerializer()
    avatar = Base64ImageField(required=False)

    class Meta:
        model = UserMeta
        fields = ['id', 'avatar', 'user', 'communities', 'shopping_carts', 'latitude', 'longitude']


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
