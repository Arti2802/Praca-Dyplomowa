from django.db import models
from competitions.models import Competition
from competition_types.styles import Styles
from competition_types.lengths import Lengths


class CompetitionType(models.Model):
    style = models.CharField(choices=Styles.choices, max_length=255, default=Styles.A)
    length = models.IntegerField(choices=Lengths.choices, default=Lengths.A)
    gender = models.BooleanField(default=True)
    competition_id = models.ForeignKey(Competition, on_delete=models.CASCADE)

    def __str__(self):
        if self.gender:
            gender = 'mężczyzn'
        else:
            gender = 'kobiet'
        return str(self.length) + 'm styl ' + str(self.style) + ' ' + gender + ' ' + str(self.competition_id.name)
