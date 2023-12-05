from django.db import models
from django.utils.translation import gettext_lazy as _


class Styles(models.TextChoices):
    A = "motylkowy", _("motylkowy")
    B = "grzbietowy", _("grzbietowy")
    C = "klasyczny", _("klasyczny")
    D = "dowolny", _("dowolny")
    E = "zmienny", _("zmienny")