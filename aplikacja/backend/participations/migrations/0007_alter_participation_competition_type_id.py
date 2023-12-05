# Generated by Django 4.2.4 on 2023-10-05 21:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('competition_types', '0004_alter_competitiontype_competition_id'),
        ('participations', '0006_alter_participation_competition_type_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participation',
            name='competition_type_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='competition_types.competitiontype'),
        ),
    ]