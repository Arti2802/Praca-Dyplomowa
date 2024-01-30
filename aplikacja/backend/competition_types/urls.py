from django.urls import path
from .views import CompetitionTypesList, CompetitionTypeDetail, CompetitionTypeInCompetition

urlpatterns = [
    path('competition_types/', CompetitionTypesList.as_view(), name=CompetitionTypesList.name),
    path('competition_types/<int:pk>/', CompetitionTypeDetail.as_view(), name=CompetitionTypeDetail.name),
    path('competitions/<int:pk>/competition_types/', CompetitionTypeInCompetition.as_view(),
         name=CompetitionTypeInCompetition.name),
]
