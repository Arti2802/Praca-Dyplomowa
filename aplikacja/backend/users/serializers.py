from rest_framework import serializers
from .models import User, Club, Organiser, Competitor
from djoser.serializers import TokenCreateSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_staff')
        write_only_field = 'password'


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class OrganiserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organiser
        fields = ('id', 'username', 'email', 'password')


class CompetitorPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competitor
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'date_of_birth', 'gender', 'club_id')


class CompetitorSerializer(serializers.ModelSerializer):
    club_id = ClubSerializer(read_only=True)

    class Meta:
        model = Competitor
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'date_of_birth', 'gender', 'club_id')


class CompetitorPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Competitor
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'date_of_birth', 'gender', 'club_id')

# class TokenSerializer(TokenCreateSerializer):
#     class Meta(TokenCreateSerializer.Meta):
#         model = Token
