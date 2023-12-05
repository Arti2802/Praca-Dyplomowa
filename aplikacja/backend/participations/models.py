from django.db import models
from competition_types.models import CompetitionType
from members.models import Competitor


class Participation(models.Model):
    result = models.TimeField(null=True, default=None)
    series_nr = models.IntegerField(null=True, blank=True)
    track_nr = models.IntegerField(null=True, blank=True)
    disqualification = models.BooleanField(default=False)
    place = models.IntegerField(null=True, default=None)
    competitor_id = models.ForeignKey(Competitor, on_delete=models.CASCADE, default=None, null=True)
    competition_type_id = models.ForeignKey(CompetitionType, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return str(self.result)
