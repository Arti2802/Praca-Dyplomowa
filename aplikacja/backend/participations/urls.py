from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import ParticipationsList, ParticipationDetail, PutPlaces

urlpatterns = [
    path('participations/', ParticipationsList.as_view(), name=ParticipationsList.name),
    path('participations/<int:pk>/', ParticipationDetail.as_view(), name=ParticipationDetail.name),
    path('competition_types/<int:pk>/participations/', ParticipationsList.as_view(), name=ParticipationsList.name),
    path('competitors/<int:comp>/participations/', ParticipationsList.as_view(), name=ParticipationsList.name),
    path('participations_list/<int:pk>/', views.generate_participations_list, name='participations_list'),
    path('results_list/<int:pk>/', views.generate_results_list, name='results_list'),
    path('put_places/<int:pk>/', PutPlaces.as_view(), name=PutPlaces.name)
]
