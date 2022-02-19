from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Note)
admin.site.register(Home)
admin.site.register(ProductBase)
admin.site.register(Store)
admin.site.register(PriceInStore)
admin.site.register(ProductInCart)
admin.site.register(ShoppingCart)
admin.site.register(UserMeta)
