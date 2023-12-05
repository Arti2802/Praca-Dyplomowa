from django.db import models


class PoolLength(models.TextChoices):
    SHORT = '25'
    LONG = '50'
