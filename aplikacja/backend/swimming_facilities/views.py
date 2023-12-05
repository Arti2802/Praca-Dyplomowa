from django.shortcuts import render
from .models import SwimmingFacility
from .serializers import SwimmingFacilitySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics


class SwimmingFacilitiesList(generics.ListCreateAPIView):
    name = "swimming_facilities"
    ordering_fields = ["length", "style"]

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return SwimmingFacilitySerializer

    def get_queryset(self):
        return SwimmingFacility.objects.all()


class SwimmingFacilityDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "swimming_facility-detail"

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return SwimmingFacilitySerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return SwimmingFacility.objects.all()


@api_view(['GET', 'POST'])
def swimming_facilities_list(request):
    if request.method == 'GET':
        competitions = SwimmingFacility.objects.all()
        serializer = SwimmingFacilitySerializer(competitions, many=True)
        return Response(serializer.data)
