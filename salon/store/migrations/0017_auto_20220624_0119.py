# Generated by Django 3.2.3 on 2022-06-24 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0016_auto_20220624_0019'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='searchquery',
            options={'ordering': ('query',)},
        ),
        migrations.AddField(
            model_name='searchquery',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
