from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import NoteSerializer, UserSerializer, GroupSerializer, ProductBaseSerializer, StoreSerializer, \
    CommunitySerializer, \
    PriceInStoreSerializer, ProductInCartSerializer, ShoppingCartSerializer, UserMetaSerializer
from .models import Note, ProductBase, Store, PriceInStore, ProductInCart, ShoppingCart, UserMeta, Community
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/base/getNotes',
        '/base/addNote'
    ]

    return Response(routes)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class CommunityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductBaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = ProductBase.objects.all()
    serializer_class = ProductBaseSerializer
    permission_classes = [permissions.IsAuthenticated]


class StoreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [permissions.IsAuthenticated]


class PriceInStoreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = PriceInStore.objects.all()
    serializer_class = PriceInStoreSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductInCartViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = ProductInCart.objects.all()
    serializer_class = ProductInCartSerializer
    permission_classes = [permissions.IsAuthenticated]


class ShoppingCartViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer
    permission_classes = [permissions.IsAuthenticated]


class UsersShoppingCartViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        print(self.request.data)
        serializer.save(user=self.request.user, communities=self.request.data.get('communities'))


class UserMetaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = UserMeta.objects.all()
    serializer_class = UserMetaSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class NoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows notes to be viewed or edited.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user, context={'request': request})
    return Response(serializer.data)


import csv
from productManager.services.scrape import scrape_barcode


@api_view(['GET'])
def add_base_products(request):
    with open('base/market-barkod-listesi.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=';', quotechar='|')

        for row in csvreader:
            barcode = row[0]
            product_data = scrape_barcode(barcode)
            if product_data is not None and product_data['msg'] == 'Successful.':
                # Insert the store
                if Store.objects.filter(name=product_data['store']['store_name']).exists():
                    s = Store.objects.get(name=product_data['store']['store_name'])
                else:
                    s = Store.objects.create(name=product_data['store']['store_name'])

                # Add product base
                if ProductBase.objects.filter(barcode=barcode).exists():
                    pb = ProductBase.objects.get(barcode=barcode)
                else:
                    pb = ProductBase.objects.create(barcode=barcode, name=product_data['name'],
                                                    external_photo_url=product_data['photo_url'],
                                                    category=product_data['category'],
                                                    min_price=float(product_data['store']['price']))

                # Add product to Store (Best Price)
                if not s.available_products.filter(store__available_products__exact=pb).exists():
                    s.available_products.add(pb)
                    s.save()

                # Create PriceInStore
                if PriceInStore.objects.filter(product=pb, store=s).exists():
                    pis = PriceInStore.objects.get(product=pb, store=s)
                else:
                    pis = PriceInStore.objects.create(product=pb, store=s, price=float(product_data['store']['price']))

    serializer = UserSerializer(request.user, context={'request': request})
    return Response(serializer.data)
