from django.urls import path
from .views import CompetitionsList, CompetitionDetail, AddCompetition

urlpatterns = [
    path('competitions/', CompetitionsList.as_view(), name=CompetitionsList.name),
    path('competitions/add/', AddCompetition.as_view(), name=AddCompetition.name),
    path('competitions/<int:pk>/', CompetitionDetail.as_view(), name=CompetitionDetail.name),
    path('organisers/<int:organiser>/competitions/', CompetitionsList.as_view(), name=CompetitionsList.name),
    path('swimming_facilities/<int:sf>/competitions/', CompetitionsList.as_view(), name=CompetitionsList.name),
]
