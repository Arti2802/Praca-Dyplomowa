from django.urls import path
from .views import SwimmingFacilitiesList, SwimmingFacilityDetail

urlpatterns = [
    path('swimming_facilities/', SwimmingFacilitiesList.as_view(), name=SwimmingFacilitiesList.name),
    path('swimming_facilities/<int:pk>/', SwimmingFacilityDetail.as_view(), name=SwimmingFacilityDetail.name),
]