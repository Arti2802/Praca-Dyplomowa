# Generated by Django 4.2.4 on 2023-11-18 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('participations', '0009_alter_participation_result'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participation',
            name='place',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='participation',
            name='result',
            field=models.TimeField(default=None, null=True),
        ),
    ]
