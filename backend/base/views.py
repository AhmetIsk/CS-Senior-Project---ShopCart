from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import NoteSerializer, UserSerializer, GroupSerializer, ProductBaseSerializer, StoreSerializer, \
    PriceInStoreSerializer, ProductInCartSerializer, ShoppingCartSerializer, UserMetaSerializer
from .models import Note, ProductBase, Store, PriceInStore, ProductInCart, ShoppingCart, UserMeta, Home
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


class HomeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Home.objects.all()
    serializer_class = UserSerializer
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
