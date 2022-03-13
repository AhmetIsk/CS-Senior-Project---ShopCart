# Generated by Django 3.2.8 on 2022-03-12 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_alter_shoppingcart_products'),
    ]

    operations = [
        migrations.AddField(
            model_name='community',
            name='community_code',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='community',
            name='name',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
