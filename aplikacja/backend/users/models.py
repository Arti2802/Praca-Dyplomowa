from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from datetime import date
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, null=True)
    USERNAME_FIELD = "username"


class Club(User):
    pass


class Organiser(User):
    pass


class Competitor(User):
    date_of_birth = models.DateField()
    gender = models.BooleanField(default=True)
    club_id = models.ForeignKey(Club, on_delete=models.CASCADE)
    password = None

    def __str__(self):
        return self.first_name + ' ' + self.last_name
