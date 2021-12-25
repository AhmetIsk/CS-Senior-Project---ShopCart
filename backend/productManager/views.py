import json

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User

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
    barcode = request.data.get('barcode')

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

    # print(products)
    # serializer = ShoppingCartSerializer(cart, context={'request': request})

    return JsonResponse(products, safe=False)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_product_to_cart(request):
    user = request.user  # User.objects.get(username='testqwerty')
    barcode = request.data.get('barcode')
    quantity = request.data.get('quantity')

    if not ProductBase.objects.filter(barcode=barcode).exists():
        raise DoesNotExistException("A base product with this barcode does not exist.")

    product_base = ProductBase.objects.get(barcode=barcode)

    # If this product is already in the cart, increase its quantity. Else, create new pic instance
    user_meta = UserMeta.objects.get(user=user)
    cart = user_meta.shopping_cart
    product_in_cart = None
    if cart.products.filter(product=product_base).exists():
        product_in_cart = cart.products.get(product=product_base)

    if product_in_cart:
        product_in_cart.quantity += int(quantity)
        product_in_cart.save()
    else:
        product_to_add = ProductInCart.objects.create(product=product_base, quantity=quantity)

        if not UserMeta.objects.filter(user=user).exists():
            raise DoesNotExistException("Metadata of this user does not exist. Register a new user or create metadata"
                                        " for the current one!")

        # no object satisfying query exists
        user_meta = UserMeta.objects.get(user=user)
        cart = user_meta.shopping_cart
        cart.products.add(product_to_add)

    return Response({"Success": "Product added to shopping cart"}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def remove_from_cart(request):
    user = request.user  # User.objects.get(username='testqwerty')
    barcode = request.data.get('barcode')
    quantity = int(request.data.get('quantity'))

    if not ProductBase.objects.filter(barcode=barcode).exists():
        raise DoesNotExistException("A base product with this barcode does not exist.")

    product_base = ProductBase.objects.get(barcode=barcode)
    print("Product Base: ", product_base)

    if not UserMeta.objects.filter(user=user.id).exists():
        raise DoesNotExistException("Metadata of this user does not exist. Register a new user or create metadata"
                                    " for the current one!")

    # If this product is already in the cart, increase its quantity. Else, create new pic instance
    user_meta = UserMeta.objects.get(user=user)
    cart = user_meta.shopping_cart
    if cart.products.filter(product=product_base).exists():
        pic = cart.products.get(product=product_base)
    else:
        raise DoesNotExistException("No product with this barcode inside shopping cart")

    if pic.quantity > quantity:
        pic.quantity -= quantity
        pic.save()
    elif pic.quantity == quantity:
        # no object satisfying query exists
        user_meta = UserMeta.objects.get(user=user.id)
        cart = user_meta.shopping_cart
        cart.products.remove(pic)
        pic.delete()
        cart.save()
    else:
        raise DoesNotExistException("Quantity cannot be bigger than current qty in the cart")

    return Response({"Success": "Removed from cart, shopping cart updated."}, status=status.HTTP_200_OK)
