import json

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.serializers import ProductBaseSerializer, ShoppingCartSerializer

from base.models import Note, ProductBase, Store, PriceInStore, ProductInCart, ShoppingCart, UserMeta, Home
from .exceptions import DoesNotExistException


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_product_base(request, barcode):
    """
    Retrieve a product base.
    """
    try:
        product = ProductBase.objects.get(barcode=barcode)
    except ProductBase.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductBaseSerializer(product, context={'request': request})
    return JsonResponse(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_shopping_cart(request):
    user = request.user

    if not UserMeta.objects.filter(user=user.id).exists():
        raise DoesNotExistException("Metadata of this user does not exist. Register a new user or create metadata"
                                    " for the current one!")

    user_meta = UserMeta.objects.get(user=user.id)
    cart = user_meta.shopping_cart

    products = []
    for item in cart.products.all():
        photo_url = item.product.photo.url if item.product.photo else None
        products.append({'id': item.id,
                         'product': {'id': item.product.id, 'barcode': item.product.barcode, 'name': item.product.name,
                                     'photo': photo_url}, 'quantity': item.quantity,
                         'adding_date': str(item.adding_date)})

    #print(products)
    #serializer = ShoppingCartSerializer(cart, context={'request': request})

    return JsonResponse(json.dumps(products), safe=False)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_product_to_cart(request):
    user = request.user
    barcode = request.data['barcode']
    quantity = request.data['quantity']
    if not ProductBase.objects.filter(barcode=barcode).exists():
        raise DoesNotExistException("A base product with this ID does not exist.")

    product_base = ProductBase.objects.get(id=barcode)
    print("Product Base: ", product_base)

    product_to_add = ProductInCart.objects.create(product=product_base, quantity=quantity)

    if not UserMeta.objects.filter(user=user.id).exists():
        raise DoesNotExistException("Metadata of this user does not exist. Register a new user or create metadata"
                                    " for the current one!")

    # no object satisfying query exists
    user_meta = UserMeta.objects.get(user=user.id)
    cart = user_meta.shopping_cart
    cart.products.add(product_to_add)

    return Response({"Success": "Product added to shopping cart"}, status=status.HTTP_200_OK)
