from django.db import models
from django.utils.translation import gettext_lazy as _


class Lengths(models.IntegerChoices):
    A = 25, _('25')
    B = 50, _('50')
    C = 100, _('100')
    D = 200, _('200')
    E = 400, _('400')
    F = 800, _('800')
    G = 1500, _('1500')
