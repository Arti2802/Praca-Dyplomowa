from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('swimming_facilities/', views.swimming_facilities_list, name='swimming_facility'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)