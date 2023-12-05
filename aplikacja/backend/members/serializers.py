from rest_framework import serializers
from .models import Member, Competitor, Club


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'


class CompetitorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Competitor
        fields = '__all__'


