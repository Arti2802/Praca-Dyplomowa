from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import CompetitionTypesList, CompetitionTypeDetail

urlpatterns = [
    path('competition_types/', CompetitionTypesList.as_view(), name=CompetitionTypesList.name),
    path('competition_types/<int:pk>/', CompetitionTypeDetail.as_view(), name=CompetitionTypeDetail.name),
    path('competitions/<int:pk>/competition_types/', CompetitionTypesList.as_view(), name=CompetitionTypesList.name),
]
