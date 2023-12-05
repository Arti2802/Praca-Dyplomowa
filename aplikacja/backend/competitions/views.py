# from django.shortcuts import render
from .models import Competition
from .serializers import CompetitionSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics


class CompetitionsList(generics.ListCreateAPIView):
    name = "competitions"
    filterset_fields = ["status"]
    ordering_fields = ["name", "date_start"]
    search_fields = ["name"]

    def get_serializer_class(self):
        return CompetitionSerializer

    def get_queryset(self):
        organiser = self.kwargs.get('organiser')
        sf = self.kwargs.get('sf')
        # if self.request.user.is_staff:
        #     return Competition.objects.all()
        if organiser:
            return Competition.objects.filter(organiser_id=organiser)
        elif sf:
            return Competition.objects.filter(swimming_facility_id=sf)
        else:
            return Competition.objects.all()


class CompetitionDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "competition-detail"

    def get_serializer_class(self):
        return CompetitionSerializer

    def get_queryset(self):
        return Competition.objects.all()


@api_view(['GET', 'POST'])
def competitions_list(request):
    if request.method == 'GET':
        competitions = Competition.objects.all()
        serializer = CompetitionSerializer(competitions, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def competitions_detail(request, pk):
    if request.method == 'GET':
        competition = Competition.objects.get(id=pk)
        serializer = CompetitionSerializer(competition, many=False)
        return Response(serializer.data)


# @api_view(['GET', 'POST'])
# def competition_types(request, pk):
#     if request.method == 'GET':
#         competition_types = CompetitionType.objects.filter(competition_id=pk)
#         serializer = CompetitionTypeSerializer(competition_types, many=True)
#         return Response(serializer.data)
