# Generated by Django 3.2.3 on 2021-08-20 19:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0011_product_subcategory'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='category',
        ),
        migrations.AlterField(
            model_name='product',
            name='dealer',
            field=models.ForeignKey(blank=True, default='mniiz_shop', null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.dealer'),
        ),
    ]
