# Generated by Django 3.2.8 on 2022-03-13 09:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0019_alter_shoppingcart_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productincart',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='base.productbase'),
        ),
    ]
