from rest_framework import serializers
from .models import Competition


class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = ['id', 'name', 'date_start', 'date_stop']
