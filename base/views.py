from time import sleep

from django.http import JsonResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from .serializers import NoteSerializer, UserSerializer, GroupSerializer, ProductBaseSerializer, StoreSerializer, \
    CommunitySerializer, \
    PriceInStoreSerializer, ProductInCartSerializer, ShoppingCartSerializer, UserMetaSerializer, \
    SimpleShoppingCartSerializer, PurchaseHistorySerializer
from .models import Note, ProductBase, Store, PriceInStore, ProductInCart, ShoppingCart, UserMeta, Community, \
    PurchaseHistory
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
import csv
from productManager.services.scrape import scrape_barcode
from authorization.serializers import get_stats

community_param = openapi.Parameter('community_id', openapi.IN_QUERY, type=openapi.TYPE_STRING,
                                    description="Id of community")


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


from rest_framework import serializers


class NameSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)


class CommunityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = NameSerializer(data=request.data)
        if serializer.is_valid():
            c = Community.objects.create(name=serializer.validated_data['name'],
                                         community_owner=request.user)
            return Response({'status': 'Community successfully created with id {}'.format(c.id)})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    #  Returns the service areas that intercept with the given Point
    @swagger_auto_schema(methods=['post'], manual_parameters=[community_param])
    @action(detail=False, methods=['post'], name='Add community user')
    def add_user(self, request):
        user_id = request.data.get('user_id')
        community_id = request.data.get('community_id')

        if user_id and community_id:
            try:
                c = Community.objects.get(id=community_id)
                c.users.add(User.objects.get(id=user_id))
                c.save()
            except Exception as e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)

            return Response({'status': 'User successfully added'})
        else:
            return Response('Incorrect or empty "user_id" or "community_id"',
                            status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(methods=['post'], manual_parameters=[community_param])
    @action(detail=False, methods=['post'], name='Remove community user')
    def remove_user(self, request):
        user_id = request.data.get('user_id')
        community_id = request.data.get('community_id')

        if user_id and community_id:
            try:
                c = Community.objects.get(id=community_id)
                c.users.remove(User.objects.get(id=user_id))
                c.save()
            except Exception as e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)

            return Response({'status': 'User successfully removed'})
        else:
            return Response('Incorrect or empty "user_id" or "community_id"',
                            status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(methods=['get'], manual_parameters=[community_param])
    @action(detail=False, methods=['get'], name='Get communities that the current user is a member of')
    def get_memberships(self, request):
        user = request.user

        if user:
            try:
                communities = user.community_set.all()  # All communities of current user
                serializer = CommunitySerializer(communities, many=True)
                return Response(serializer.data)
            except Exception as e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response('User does not exist',
                            status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(methods=['get'], manual_parameters=[community_param])
    @action(detail=False, methods=['get'], name='Get communities of the current user')
    def get_owned(self, request):
        user = request.user

        if user:
            try:
                communities = Community.objects.filter(community_owner=user)  # All communities of current user
                serializer = CommunitySerializer(communities, many=True)
                return Response(serializer.data)
            except Exception as e:
                print(e)
                return Response('Something is wrong. Contact Kaan', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response('User does not exist',
                            status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(methods=['post'], manual_parameters=[community_param])
    @action(detail=False, methods=['post'], name='Add shopping cart to a community')
    def add_cart_to_community(self, request):
        user = request.user
        cart_id = request.data.get('cart_id')
        community_id = request.data.get('community_id')

        if cart_id and community_id:
            try:
                c = Community.objects.get(id=community_id)
                if c.community_owner != user and not c.users.filter(id=user.id).exists():
                    return Response('You do not have access to this community.',
                                    status=status.HTTP_400_BAD_REQUEST)

                sc = ShoppingCart.objects.get(id=cart_id)
                sc.communities.add(c)
                sc.save()
            except Exception as e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)

            return Response({'status': 'Cart successfully added'})
        else:
            return Response('Incorrect or empty "user_id" or "cart_id"',
                            status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(methods=['post'], manual_parameters=[community_param])
    @action(detail=False, methods=['post'], name='Remove shopping cart to from community')
    def remove_cart_from_community(self, request):
        user = request.user
        cart_id = request.data.get('cart_id')
        community_id = request.data.get('community_id')

        if cart_id and community_id:
            try:
                c = Community.objects.get(id=community_id)
                if c.community_owner != user and not c.users.filter(id=user.id).exists():
                    return Response('You do not have access to this community.',
                                    status=status.HTTP_400_BAD_REQUEST)

                sc = ShoppingCart.objects.get(id=cart_id)
                sc.communities.remove(c)
                sc.save()
            except Exception as e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)

            return Response({'status': 'Cart successfully removed'})
        else:
            return Response('Incorrect or empty "user_id" or "cart_id"',
                            status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(methods=['get'], manual_parameters=[community_param])
    @action(detail=False, methods=['get'], name='Get shopping carts inside community')
    def get_community_carts(self, request):
        user = request.user
        community_id = request.GET.get('community_id')

        if user:
            try:
                community = Community.objects.get(id=community_id)
                carts = ShoppingCart.objects.filter(communities__id__exact=community.id)
                serializer = SimpleShoppingCartSerializer(carts, many=True)
                return Response(serializer.data)
            except Exception as e:
                print(e)
                return Response('Community does not exist.', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response('User does not exist',
                            status=status.HTTP_400_BAD_REQUEST)


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


class PurchaseHistoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = PurchaseHistory.objects.all()
    serializer_class = PurchaseHistorySerializer
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

    # def perform_create(self, serializer):
    #    print(self.request.data)
    #    serializer.save(user=self.request.user, communities=self.request.data.get('communities'))


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


@api_view(['GET'])
def get_statistics(request):
    if not request.user:
        return Response({"Error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)

    stats = get_stats(request.user)
    return JsonResponse(stats, safe=False)


@api_view(['GET'])
def add_base_products(request):
    with open('base/market-barkod-listesi.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=';', quotechar='|')

        for row in csvreader:
            barcode = row[0]
            print("Adding: ", barcode)
            sleep(30)
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
