from django.contrib import admin
from . import models


@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'category', 'status',  'author')
    prepopulated_fields = {'slug': ('author',), }


admin.site.register(models.Category)