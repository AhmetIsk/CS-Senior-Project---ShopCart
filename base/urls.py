from django.urls import path, include
from . import views
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'communities', views.CommunityViewSet)
router.register(r'productBases', views.ProductBaseViewSet)
router.register(r'stores', views.StoreViewSet)
router.register(r'priceInStore', views.PriceInStoreViewSet)
router.register(r'productInCart', views.ProductInCartViewSet)
router.register(r'shoppingCart', views.ShoppingCartViewSet)
router.register(r'currentUsersShoppingCart', views.UsersShoppingCartViewSet)
router.register(r'userMeta', views.UserMetaViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'notes', views.NoteViewSet)
router.register(r'purchaseHistory', views.PurchaseHistoryViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('current_user/', views.current_user),
    #path('add_base_products/', views.add_base_products),
    path('get_statistics/', views.get_statistics),
    path('update_base_products/', views.update_base_products),
    path('search_by_barcode/', views.search_by_barcode)
]

# for images
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
