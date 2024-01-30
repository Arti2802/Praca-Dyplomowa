from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import User, Competitor, Club, Organiser
from .serializers import CompetitorSerializer, CompetitorPostSerializer, ClubSerializer, OrganiserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.pk,
        })


class CompetitiorsList(generics.ListCreateAPIView):
    name = "competitors"
    # ordering_fields = ["name", "date_start"]
    # search_fields = ["name"]
    serializer_class = CompetitorSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if not pk:
            return Competitor.objects.all()
        return Competitor.objects.filter(club_id=pk)


class CompetitorsClub(generics.ListCreateAPIView):
    name = "competitors"
    # ordering_fields = ["name", "date_start"]
    # search_fields = ["name"]
    serializer_class = CompetitorPostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Competitor.objects.filter(club_id=pk)

    def perform_create(self, serializer):
        data = serializer.validated_data
        raw_password = data['first_name'][:3] + data['last_name'][:3] + data['username'][:4]
        competitor = Competitor.objects.create(
            username=data['username'],
            password=make_password(raw_password),
            first_name=data['first_name'],
            last_name=data['last_name'],
            date_of_birth=data['date_of_birth'],
            gender=data['gender'],
            club_id=data['club_id']
        )
        competitor.save()


class CompetitorDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "competitor-detail"
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        return CompetitorSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return Competitor.objects.all()


class ClubsList(generics.ListCreateAPIView):
    name = "clubs"
    ordering_fields = ["name"]
    search_fields = ["name"]
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        data = serializer.validated_data
        raw_password = data.get('password')
        club = Club.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(raw_password),
        )
        club.save()

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return ClubSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return Club.objects.all()
        #return Club.objects.filter(user=self.request.user)


class ClubDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "club-detail"
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return ClubSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return Club.objects.all()


class OrganisersList(generics.ListCreateAPIView):
    name = 'organisers'
    serializer_class = OrganiserSerializer
    queryset = Organiser.objects.all()

    def perform_create(self, serializer):
        data = serializer.validated_data
        raw_password = data.get('password')
        organiser = Organiser.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(raw_password),
        )
        organiser.save()


class OrganiserDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'organiser-detail'
    serializer_class = OrganiserSerializer
    queryset = Organiser.objects.all()


class UserType(APIView):
    name = 'User-type'

    def get(self, request, pk):
        member = User.objects.filter(id=pk)
        type = 1
        if len(Club.objects.filter(id=pk)) > 0:
            type = 2
        elif len(Organiser.objects.filter(id=pk)) > 0:
            type = 3
        elif len(Competitor.objects.filter(id=pk)) > 0:
            type = 4
        if not len(member):
            return Response({'message': 'Nie ma takiego użytkownika!'}, 404)
        return Response({'type': type}, 200)
