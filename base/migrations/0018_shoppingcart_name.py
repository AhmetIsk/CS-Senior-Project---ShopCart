# Generated by Django 3.2.8 on 2022-03-12 22:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_rename_community_shoppingcart_communities'),
    ]

    operations = [
        migrations.AddField(
            model_name='shoppingcart',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
