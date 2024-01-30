from django.urls import path
from . import views
from .views import ParticipationsList, ResultsList, AddParticipation, ParticipationDetail, PutPlaces

urlpatterns = [
    path('participations/', AddParticipation.as_view(), name=AddParticipation.name),
    path('participations/<int:pk>/', ParticipationDetail.as_view(), name=ParticipationDetail.name),
    path('competition_types/<int:pk>/participations/', ParticipationsList.as_view(), name=ParticipationsList.name),
    path('competition_types/<int:pk>/results/', ResultsList.as_view(), name=ResultsList.name),
    path('competitors/<int:comp>/participations/', ParticipationsList.as_view(), name=ParticipationsList.name),
    path('participations_list/<int:pk>/', views.generate_participations_list, name='participations_list'),
    path('results_list/<int:pk>/', views.generate_results_list, name='results_list'),
    path('put_places/<int:pk>/', PutPlaces.as_view(), name=PutPlaces.name)
]
