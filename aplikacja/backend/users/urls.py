from django.urls import include, path
from . import views
from .views import CustomAuthToken, CompetitiorsList, CompetitorsClub, CompetitorDetail, ClubsList, ClubDetail, OrganisersList, OrganiserDetail, UserType
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('authtoken/', include('djoser.urls.authtoken')),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('competitors/', CompetitiorsList.as_view(), name=CompetitiorsList.name),
    path('competitors/<int:pk>/', CompetitorDetail.as_view(), name=CompetitorDetail.name),
    path('clubs/<int:pk>/competitors/', CompetitorsClub.as_view(), name=CompetitorsClub.name),
    path('clubs/', ClubsList.as_view(), name=ClubsList.name),
    path('clubs/<int:pk>/', ClubDetail.as_view(), name=ClubDetail.name),
    path('organisers/', OrganisersList.as_view(), name=OrganisersList.name),
    path('organisers/<int:pk>/', OrganiserDetail.as_view(), name=OrganiserDetail.name),
    path('user_type/<int:pk>/', UserType.as_view(), name=UserType.name)
]
