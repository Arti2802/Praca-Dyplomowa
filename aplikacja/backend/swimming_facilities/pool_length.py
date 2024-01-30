from django.db import models
from django.utils.translation import gettext_lazy as _


class PoolLength(models.IntegerChoices):
    SHORT = 25, _('25')
    LONG = 50, _('50')
