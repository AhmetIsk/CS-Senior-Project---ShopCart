from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('getNotes/', views.getNotes),
    path('addNote/', views.addNote),
]
