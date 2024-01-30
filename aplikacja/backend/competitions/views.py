# from django.shortcuts import render
from .models import Competition
from .serializers import CompetitionSerializer, CompetitionPostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny


class CompetitionsList(generics.ListCreateAPIView):
    name = "competitions"
    filterset_fields = ["status"]
    ordering_fields = ["name", "date_start"]
    ordering = ["-date_start"]
    search_fields = ["name"]
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        return CompetitionSerializer

    def get_queryset(self):
        organiser = self.kwargs.get('organiser')
        sf = self.kwargs.get('sf')
        if organiser:
            return Competition.objects.filter(organiser_id=organiser)
        elif sf:
            return Competition.objects.filter(swimming_facility_id=sf)
        else:
            return Competition.objects.all()


class AddCompetition(generics.ListCreateAPIView):
    name = 'Add Competition'
    serializer_class = CompetitionPostSerializer
    queryset = Competition.objects.all()


class CompetitionDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "competition-detail"
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        return CompetitionSerializer

    def get_queryset(self):
        return Competition.objects.all()

