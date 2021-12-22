from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from base.serializers import ProductBaseSerializer

from base.models import ProductBase

import os


@api_view(['GET'])
def get_product_base(request, barcode):
    """
    Retrieve a product base.
    """
    try:
        product = ProductBase.objects.get(barcode=barcode)
    except ProductBase.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductBaseSerializer(product)
    return JsonResponse(serializer.data)
