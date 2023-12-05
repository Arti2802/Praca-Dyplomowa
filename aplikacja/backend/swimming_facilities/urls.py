from django.urls import path
from .views import SwimmingFacilitiesList, SwimmingFacilityDetail
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('swimming_facilities/', SwimmingFacilitiesList.as_view(), name=SwimmingFacilitiesList.name),
    path('swimming_facilities/<int:pk>/', SwimmingFacilityDetail.as_view(), name=SwimmingFacilityDetail.name),
]