from django.db import models


class Member(models.Model):
    username = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    password = models.CharField(max_length=45)

    def __str__(self):
        return self.username


class Club(Member):
    pass


class Organiser(Member):
    pass


class Competitor(Member):
    first_name = models.CharField(max_length=75, null=True)
    last_name = models.CharField(max_length=75)
    date_of_birth = models.DateField()
    gender = models.BooleanField(default=True)
    club_id = models.ForeignKey(Club, on_delete=models.CASCADE)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
