from rest_framework import serializers
from .models import SwimmingFacility


class SwimmingFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SwimmingFacility
        fields = ['id', 'address']
