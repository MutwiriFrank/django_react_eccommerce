# Generated by Django 3.2.3 on 2021-08-04 13:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dealer',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='dealer',
            name='longitude',
        ),
        migrations.AddField(
            model_name='dealer',
            name='location',
            field=models.CharField(blank=True, default='mniiz_shop', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='dealer',
            field=models.ForeignKey(blank=True, default='mniiz_shop', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='dealer', to='store.dealer'),
        ),
    ]
