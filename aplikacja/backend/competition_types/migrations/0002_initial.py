# Generated by Django 4.2.4 on 2024-01-10 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('competition_types', '0001_initial'),
        ('competitions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='competitiontype',
            name='competition_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='competitions.competition'),
        ),
    ]
