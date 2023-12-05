from django.urls import path
# from . import views
# from django.conf.urls.static import static
# from django.conf import settings
from .views import CompetitionsList, CompetitionDetail

urlpatterns = [
    path('competitions/', CompetitionsList.as_view(), name=CompetitionsList.name),
    path('competitions/<int:pk>/', CompetitionDetail.as_view(), name=CompetitionDetail.name),
    path('organisers/<int:organiser>/competitions', CompetitionsList.as_view(), name=CompetitionsList.name),
    path('swimming_facilities/<int:sf>/competitions', CompetitionsList.as_view(), name=CompetitionsList.name),
]
