from django.urls import path
from .views import MembersList, MemberDetail, CompetitiorsList, CompetitorDetail, ClubsList, ClubDetail, MemberType
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('members/', MembersList.as_view(), name=MembersList.name),
    path('members/<int:pk>/', MemberDetail.as_view(), name=MemberDetail.name),
    path('competitors/', CompetitiorsList.as_view(), name=CompetitiorsList.name),
    path('competitors/<int:pk>/', CompetitorDetail.as_view(), name=CompetitorDetail.name),
    path('clubs/<int:pk>/competitors/', CompetitiorsList.as_view(), name=CompetitiorsList.name),
    path('clubs/', ClubsList.as_view(), name=ClubsList.name),
    path('clubs/<int:pk>/', ClubDetail.as_view(), name=ClubDetail.name),
    path('member_type/<str:username>/<str:password>/', MemberType.as_view(), name=MemberType.name)
]