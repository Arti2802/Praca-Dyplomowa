from django.contrib import admin
from .models import Competitor, Organiser, Club, User


admin.site.register(Competitor)
admin.site.register(Organiser)
admin.site.register(Club)
admin.site.register(User)
