from .models import CompetitionType
from .serializers import CompetitionTypeSerializer, CompetitionTypePostSerializer
from rest_framework import generics


class CompetitionTypesList(generics.ListCreateAPIView):
    name = "competition_types"
    filterset_fields = ["length", "style", "gender"]
    ordering_fields = ["length", "style"]
    ordering = ["length", "style", "gender"]

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return CompetitionTypePostSerializer

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


class CompetitionTypeInCompetition(generics.ListAPIView):
    name = "competition-types"
    serializer_class = CompetitionTypeSerializer
    filterset_fields = ["length", "style", "gender"]
    ordering_fields = ["length", "style"]
    ordering = ["length", "style", "gender"]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return CompetitionType.objects.filter(competition_id=pk)
