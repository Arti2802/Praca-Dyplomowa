from rest_framework import serializers
from .models import Competition
from swimming_facilities.serializers import SwimmingFacilitySerializer
from django.db.models import Q


class CompetitionSerializer(serializers.ModelSerializer):
    swimming_facility_id = SwimmingFacilitySerializer(read_only=True)

    class Meta:
        model = Competition
        fields = '__all__'


class CompetitionPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Competition
        fields = '__all__'

    def validate(self, data):
        date_start = data['date_start']
        date_stop = data['date_stop']
        swimming_facility = data['swimming_facility_id'].id
        if date_start > date_stop:
            raise serializers.ValidationError({'msg': 'Data rozpoczęcia musi być wcześniejsza niż data zakończenia!'})
        if Competition.objects.filter(date_start__lte=date_start, date_stop__gte=date_start, swimming_facility_id=swimming_facility).exists() or Competition.objects.filter(date_start__gte=date_stop, date_stop__lte=date_stop, swimming_facility_id=swimming_facility).exists():
            raise serializers.ValidationError({'msg': 'W tym czasie odbywają się inne zawody na tym obiekcie!'})
        return data
