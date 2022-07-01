# Generated by Django 3.2.3 on 2021-08-15 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_review_created_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='TopProducts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, default='index.jpg', null=True, upload_to='')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
    ]