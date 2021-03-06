# Generated by Django 3.2.3 on 2022-06-24 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0020_auto_20220624_0130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='searchquery',
            field=models.ManyToManyField(blank=True, null=True, to='store.SearchQuery'),
        ),
        migrations.AlterField(
            model_name='product',
            name='tag',
            field=models.ManyToManyField(blank=True, null=True, to='store.Tag'),
        ),
    ]
