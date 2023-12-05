from django.shortcuts import render
from .models import CompetitionType
from .serializers import CompetitionTypeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics


class CompetitionTypesList(generics.ListCreateAPIView):
    name = "competition_types"
    filterset_fields = ["length", "style"]
    ordering_fields = ["length", "style"]
    #search_fields = ["name"]

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return CompetitionTypeSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if not pk:
            return CompetitionType.objects.all()
        return CompetitionType.objects.filter(competition_id=pk)


class CompetitionTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "competition_type-detail"

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return CompetitionTypeSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return CompetitionType.objects.all()


@api_view(['GET', 'POST'])
def competition_types_list(request):
    if request.method == 'GET':
        competitions = CompetitionType.objects.all()
        serializer = CompetitionTypeSerializer(competitions, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def competition_type_detail(request, pk):
    if request.method == 'GET':
        competitions = CompetitionType.objects.get(id=pk)
        serializer = CompetitionTypeSerializer(competitions, many=False)
        return Response(serializer.data)


# @api_view(['GET', 'POST'])
# def participations_list(request, pk):
#     if request.method == 'GET':
#         participations = Participation.objects.filter(competition_type_id=pk).order_by('series_nr', 'track_nr')
#         serializer = ParticipationSerializer(participations, many=True)
#         return Response(serializer.data)
