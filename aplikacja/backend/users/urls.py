from django.urls import include, path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('authtoken/', include('djoser.urls.authtoken')),
]
