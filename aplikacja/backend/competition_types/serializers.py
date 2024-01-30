from rest_framework import serializers
from .models import CompetitionType
from competitions.models import Competition
from swimming_facilities.models import SwimmingFacility
from competitions.serializers import CompetitionSerializer
from rest_framework.validators import UniqueTogetherValidator


class CompetitionTypeSerializer(serializers.ModelSerializer):
    competition_id = CompetitionSerializer(read_only=True)

    class Meta:
        model = CompetitionType
        fields = '__all__'


class CompetitionTypePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetitionType
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=CompetitionType.objects.all(),
                fields=['length', 'style', 'gender', 'competition_id'],
                message='Nie można dodać tej samej konkurencji na tych samych zawodach!'
            )
        ]

    def validate(self, data):
        pool_length = data['competition_id'].swimming_facility_id.pool_length
        if pool_length == 50 and data['length'] == 25:
            raise serializers.ValidationError('Nie można dodać takiej konkurencji na basenie 50 metrowym!')
        if data['style'] == 'zmienny' and data['length'] < 4 * pool_length:
            raise serializers.ValidationError(f'Konkurencja ze stylem zmiennym musi mieć przynajmniej '
                                              f'{4 * pool_length} m na tym obiekcie!')
        return data

