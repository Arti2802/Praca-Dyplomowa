from rest_framework import serializers
from .models import Participation
from members.serializers import CompetitorSerializer


class ParticipationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participation
        fields = '__all__'
