# Generated by Django 3.2.8 on 2022-04-10 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0022_auto_20220410_1055'),
    ]

    operations = [
        migrations.AddField(
            model_name='productbase',
            name='min_price',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
