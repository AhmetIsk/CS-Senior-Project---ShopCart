from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import get_product_base, add_product_to_cart, get_shopping_cart

urlpatterns = [
    path('get_product_base/<str:barcode>', get_product_base),
    path('add_product_to_cart/', add_product_to_cart),
    path('get_shopping_cart/', get_shopping_cart)
]

urlpatterns = format_suffix_patterns(urlpatterns)