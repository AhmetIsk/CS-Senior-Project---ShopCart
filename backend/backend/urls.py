from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authorization/', include('authorization.urls')),
    path('base/', include('base.urls'))
]
