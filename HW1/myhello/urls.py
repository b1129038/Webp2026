from django.urls import path
from . import views

urlpatterns = [
    path('courselist/', views.courselist, name='courselist'),
    path('addcourse/', views.addcourse, name='addcourse'),
]