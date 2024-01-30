from django.db import models
from .pool_length import PoolLength


class SwimmingFacility(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    city = models.CharField(max_length=45)
    pool_length = models.IntegerField(choices=PoolLength.choices, default=PoolLength.SHORT)

    def __str__(self):
        return self.name
