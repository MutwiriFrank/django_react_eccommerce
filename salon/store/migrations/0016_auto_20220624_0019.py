# Generated by Django 3.2.3 on 2022-06-24 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_product_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='SearchQuery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('query', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='searchquery',
            field=models.ManyToManyField(to='store.SearchQuery'),
        ),
        migrations.AddField(
            model_name='product',
            name='tag',
            field=models.ManyToManyField(to='store.Tag'),
        ),
    ]
