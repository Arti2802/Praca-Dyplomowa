from django.shortcuts import render
from .models import Participation
from .serializers import ParticipationSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
import io
from django.http import FileResponse, HttpResponse
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from competition_types.views import CompetitionType
from rest_framework.views import APIView


class ParticipationsList(generics.ListCreateAPIView):
    name = "participations"
    filterset_fields = ["series_nr"]
    ordering_fields = ["series_nr", "result", "disqualification"]
    #search_fields = ["name"]

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return ParticipationSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        comp = self.kwargs.get('comp')
        if pk:
            return Participation.objects.filter(competition_type_id=pk)
        elif comp:
            return Participation.objects.filter(competitor_id=comp)
        return Participation.objects.all()


class ParticipationDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "competition-detail"

    def get_serializer_class(self):
        #if self.request.user.is_staff:
        return ParticipationSerializer

    def get_queryset(self):
        #if self.request.user.is_staff:
        return Participation.objects.all()


@api_view(['GET', 'POST'])
def participations_list(request):
    if request.method == 'GET':
        participations = Participation.objects.all()
        serializer = ParticipationSerializer(participations, many=True)
        return Response(serializer.data)


def best_result(comp_id, length, style):
    competition_types = CompetitionType.objects.filter(length=length, style=style)
    participations = Participation.objects.filter(competition_type_id__in=competition_types, competitor_id=comp_id)\
        .order_by('result')
    return participations.first().result if participations.first() else None


def generate_participations_list(request, pk):
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer)
    pdfmetrics.registerFont(TTFont('Verdana', 'Verdana.ttf'))
    p.setFont("Verdana", 8)

    competition_type_info = CompetitionType.objects.get(id=pk)
    p.drawString(100, 760, f'{str(competition_type_info)}')

    participations = Participation.objects.filter(competition_type_id=pk)
    p.drawString(100, 730, 'Imię i nazwisko')
    p.drawString(200, 730, 'Seria')
    p.drawString(250, 730, 'Tor')
    p.drawString(300, 730, 'Najlepszy czas')
    y = 700
    number = 1
    for participation in participations:
        best = best_result(participation.competitor_id, competition_type_info.length, competition_type_info.style)
        best = best if best else 'NT'
        p.drawString(75, y, f'{number}.')
        p.drawString(100, y, f' {participation.competitor_id.first_name} {participation.competitor_id.last_name}')
        p.drawString(200, y, f' {participation.series_nr}')
        p.drawString(250, y, f' {participation.track_nr}')
        p.drawString(300, y, f' {best}')
        y -= 40
        number += 1
    filename = 'lista zawodników ' + str(competition_type_info) + '.pdf'

    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=filename, charset='utf8')


def generate_results_list(request, pk):
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer)
    pdfmetrics.registerFont(TTFont('Verdana', 'Verdana.ttf'))
    p.setFont("Verdana", 8)

    competition_type_info = CompetitionType.objects.get(id=pk)
    p.drawString(100, 750, f'{str(competition_type_info)}')

    participations = Participation.objects.filter(competition_type_id=pk).order_by('result')
    y = 700
    for participation in participations:
        p.drawString(50, y, f'{participation.place}.')
        p.drawString(100, y, f' {participation.competitor_id.first_name} {participation.competitor_id.last_name}')
        p.drawString(200, y, f'{participation.result}')
        y -= 40

    filename = 'wyniki ' + str(competition_type_info) + '.pdf'

    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=filename, charset='utf8')


class PutPlaces(APIView):
    name = 'places'

    def put(self, request, pk):
        participations = Participation.objects.filter(competition_type_id=pk).order_by('result')
        number = 1
        for participation in participations:
            participation.place = number
            participation.save()
            number += 1
        return Response({'Udało się przydzielić miejsca'}, 200)
