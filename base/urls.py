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

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('current_user/', views.current_user),
    path('add_base_products/', views.add_base_products),
]

# for images
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
