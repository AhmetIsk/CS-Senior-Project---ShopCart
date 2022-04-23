import json

from django.http import JsonResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User

from base.serializers import ProductBaseSerializer, ShoppingCartSerializer

from base.models import Note, ProductBase, Store, PriceInStore, ProductInCart, ShoppingCart, UserMeta, Community
from .exceptions import DoesNotExistException
from productManager.services.scrape import amazon_scrape, scrape_barcode


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_product_base(request):
    """
    Retrieve a product base.
    """
    try:
        product = ProductBase.objects.get(barcode=request.data.get('barcode'))
    except ProductBase.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductBaseSerializer(product, context={'request': request})
    return JsonResponse(serializer.data)


id = openapi.Parameter('id', openapi.IN_QUERY, type=openapi.TYPE_STRING,
                       description="ID of shopping cart ")


@swagger_auto_schema(methods=['get'], manual_parameters=[id])
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_shopping_cart(request):
    user = request.user
    cart_id = request.query_params.get('id')
    print("Cart id", cart_id)
    if not UserMeta.objects.filter(user=user.id).exists():
        raise DoesNotExistException("Metadata of this user does not exist. Register a new user or create metadata"
                                    " for the current one!")

    if not ShoppingCart.objects.filter(id=cart_id).exists():
        raise DoesNotExistException("This shopping cart DNE")

    cart = ShoppingCart.objects.get(id=cart_id)

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


id = openapi.Parameter('id', openapi.IN_QUERY, type=openapi.TYPE_STRING,
                       description="ID of shopping cart ")


@swagger_auto_schema(methods=['post'], manual_parameters=[id])
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_product_to_cart(request):
    user = request.user
    cart_id = request.data.get('id')
    barcode = request.data.get('barcode')
    quantity = request.data.get('quantity')

    if not ProductBase.objects.filter(barcode=barcode).exists():
        # Look for the barcode online!
        product_data = scrape_barcode(barcode)
        if product_data is None or product_data['msg'] != 'Successful.':
            raise DoesNotExistException(
                "A base product with this barcode does not exist AND could not find the product online. Try to add this product manually")
        else:
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

    product_base = ProductBase.objects.get(barcode=barcode)

    if not ShoppingCart.objects.filter(id=cart_id).exists():
        raise DoesNotExistException("This shopping cart DNE")

    # If this product is already in the cart, increase its quantity. Else, create new pic instance
    cart = ShoppingCart.objects.get(id=cart_id)
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
        cart = ShoppingCart.objects.get(id=cart_id)
        cart.products.add(product_to_add)
        cart.save()

    return Response({"Success": "Product added to shopping cart"}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def remove_from_cart(request):
    user = request.user  # User.objects.get(username='testqwerty')
    barcode = request.data.get('barcode')
    cart_id = request.data.get('id')
    quantity = int(request.data.get('quantity'))

    if not ProductBase.objects.filter(barcode=barcode).exists():
        raise DoesNotExistException("A base product with this barcode does not exist.")

    product_base = ProductBase.objects.get(barcode=barcode)
    print("Product Base: ", product_base)

    if not UserMeta.objects.filter(user=user.id).exists():
        raise DoesNotExistException("Metadata of this user does not exist. Register a new user or create metadata"
                                    " for the current one!")

    # If this product is already in the cart, increase its quantity. Else, create new pic instance
    cart = ShoppingCart.objects.get(id=cart_id)
    if cart.products.filter(product=product_base).exists():
        pic = cart.products.get(product=product_base)
    else:
        raise DoesNotExistException("No product with this barcode inside shopping cart")

    if pic.quantity > quantity:
        pic.quantity -= quantity
        pic.save()
    elif pic.quantity == quantity:
        # no object satisfying query exists
        cart = ShoppingCart.objects.get(id=cart_id)
        cart.products.remove(pic)
        pic.delete()
        cart.save()
    else:
        raise DoesNotExistException("Quantity cannot be bigger than current qty in the cart")

    return Response({"Success": "Removed from cart, shopping cart updated."}, status=status.HTTP_200_OK)
