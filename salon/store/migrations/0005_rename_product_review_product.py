# Generated by Django 3.2.3 on 2021-08-10 19:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_alter_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='Product',
            new_name='product',
        ),
    ]
