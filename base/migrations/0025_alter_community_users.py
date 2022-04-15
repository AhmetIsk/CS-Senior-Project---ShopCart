# Generated by Django 3.2.8 on 2022-04-14 08:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0024_alter_community_community_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='users',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
