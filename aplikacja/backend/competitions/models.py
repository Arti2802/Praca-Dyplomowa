from django.db import models
from swimming_facilities.models import SwimmingFacility
from members.models import Organiser
from competitions.statuses import Statuses


class Competition(models.Model):
    name = models.CharField(max_length=150, blank=True)
    date_start = models.DateTimeField(blank=True)
    date_stop = models.DateTimeField(blank=True)
    swimming_facility_id = models.ForeignKey(SwimmingFacility, on_delete=models.CASCADE, null=True)
    organiser_id = models.ForeignKey(Organiser, on_delete=models.CASCADE, null=True)
    status = models.CharField(choices=Statuses.choices, max_length=255, default=Statuses.A)

    def __str__(self):
        return self.name
