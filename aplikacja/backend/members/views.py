from django.shortcuts import render
from .models import Member, Competitor, Club, Organiser
from .serializers import MemberSerializer, CompetitorSerializer, ClubSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView


class MembersList(generics.ListCreateAPIView):
    name = "members"
    ordering_fields = ["username"]
    filterset_fields = ["username", "password"]

    def get_serializer_class(self):
        #if self.request.user.is_staff:
            return MemberSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return Member.objects.all()
        #return Member.objects.filter(user=self.request.user)


class MemberDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "member-detail"

    def get_serializer_class(self):
        # if self.request.user.is_staff:
        return MemberSerializer

    def get_queryset(self):
        # if self.request.user.is_staff:
        return Member.objects.all()


class CompetitiorsList(generics.ListCreateAPIView):
    name = "competitors"
    ordering_fields = ["name", "date_start"]
    search_fields = ["name"]

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return CompetitorSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if not pk:
            return Competitor.objects.all()
        return Competitor.objects.filter(club_id=pk)


class CompetitorDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "competitor-detail"

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return CompetitorSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return Competitor.objects.all()


class ClubsList(generics.ListCreateAPIView):
    name = "clubs"
    ordering_fields = ["name"]
    search_fields = ["name"]

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return ClubSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return Club.objects.all()
        #return Club.objects.filter(user=self.request.user)


class ClubDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "club-detail"

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return ClubSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return Club.objects.all()


class MemberType(APIView):
    name = 'Member type'

    def get(self, request, username, password):
        member = Member.objects.filter(username=username, password=password)
        type = 1
        if len(Club.objects.filter(username=username, password=password)) > 0:
            type = 2
        elif len(Organiser.objects.filter(username=username, password=password)) > 0:
            type = 3
        elif len(Competitor.objects.filter(username=username, password=password)) > 0:
            type = 4
        return Response({'type': type}, 200)


@api_view(['GET', 'POST'])
def members_list(request):
    if request.method == 'GET':
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def competitors_list(request):
    if request.method == 'GET':
        competitors = Competitor.objects.all()
        serializer = CompetitorSerializer(competitors, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def competitor_detail(request, pk):
    if request.method == 'GET':
        competitor = Competitor.objects.get(id=pk)
        serializer = CompetitorSerializer(competitor, many=False)
        return Response(serializer.data)


# @api_view(['GET', 'POST'])
# def participations_list(request, pk):
#     if request.method == 'GET':
#         participations = Participation.objects.filter(competitor_id=pk)
#         serializer = ParticipationSerializer(participations, many=True)
#         return Response(serializer.data)


@api_view(['GET', 'POST'])
def clubs_list(request):
    if request.method == 'GET':
        competitors = Club.objects.all()
        serializer = ClubSerializer(competitors, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def club_detail(request, pk):
    if request.method == 'GET':
        competitor = Club.objects.get(id=pk)
        serializer = ClubSerializer(competitor, many=False)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def club_competitors_list(request, pk):
    if request.method == 'GET':
        competitors = Competitor.objects.filter(club_id=pk)
        serializer = CompetitorSerializer(competitors, many=True)
        return Response(serializer.data)
