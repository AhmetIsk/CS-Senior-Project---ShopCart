from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import get_product_base

urlpatterns = [
    path('get_product_base/<str:barcode>', get_product_base),
]

urlpatterns = format_suffix_patterns(urlpatterns)