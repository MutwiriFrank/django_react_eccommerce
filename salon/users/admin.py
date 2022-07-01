from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from.models import NewUser, Stylist


class UserAdminConfig(UserAdmin):
    model = NewUser
    ordering = ('-start_date',)
    search_fields = ('email', 'user_name', 'first_name',)
    list_display = ('email', 'user_name',  'is_active', 'is_staff')

    fieldsets = (
        (None, {'fields': ('email', 'user_name',  'phone_number',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),

    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name',  'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(NewUser, UserAdminConfig,)

admin.site.register(Stylist)
