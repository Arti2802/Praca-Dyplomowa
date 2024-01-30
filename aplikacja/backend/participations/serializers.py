from rest_framework import serializers
from .models import Participation
from users.serializers import CompetitorSerializer
from competition_types.serializers import CompetitionTypeSerializer
from rest_framework.validators import UniqueTogetherValidator


class ParticipationSerializer(serializers.ModelSerializer):
    competitor_id = CompetitorSerializer(read_only=True)
    competition_type_id = CompetitionTypeSerializer(read_only=True)

    class Meta:
        model = Participation
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=Participation.objects.all(),
                fields=['competitor_id', 'competition_type_id'],
                message='Nie można dodać tego samego zawodnika w tej samej konkurencji!'
            ),
            UniqueTogetherValidator(
                queryset=Participation.objects.all(),
                fields=['series_nr', 'track_nr', 'competition_type_id'],
                message='Nie można dodać 2 zawodników w tej samej serii na tym samym torze!'
            ),
        ]


class ParticipationPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participation
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=Participation.objects.all(),
                fields=['competitor_id', 'competition_type_id'],
                message='Nie można dodać tego samego zawodnika w tej samej konkurencji!'
            ),
            UniqueTogetherValidator(
                queryset=Participation.objects.all(),
                fields=['series_nr', 'track_nr', 'competition_type_id'],
                message='Nie można dodać 2 zawodników w tej samej serii na tym samym torze!'
            ),
        ]