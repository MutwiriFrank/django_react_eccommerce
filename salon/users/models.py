from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email,  user_name,  phone_number, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name,  phone_number, password, **other_fields)

    def create_user(self, email, user_name,  phone_number, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))
        if not phone_number:
            raise ValueError(_('You must provide a phone number'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, phone_number=phone_number,
                          **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser( AbstractBaseUser, PermissionsMixin ):
    email = models.EmailField(_('email address'), unique=True, null=False, blank=False)
    user_name = models.CharField(max_length=100 ) # Second name
    # name = models.CharField(max_length=100, blank=False) # First name
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False) # people who can access admin
    is_active = models.BooleanField(default=True    )
    created_at = models.DateTimeField(auto_now_add=True)
    phone_number = models.CharField(max_length=12, blank=False, null=False, unique=True)


    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'phone_number',]

    def __str__(self):
        return self.user_name

# multiple users https://www.botreetechnologies.com/blog/supporting-multiple-roles-using-djangos-user-model
# class StylistProfile(models.Model):
#     user = models.OneToOneField(NewUser, on_delete=models.CASCADE, null=True, related_name='intern_profile')
#     phone_number = PhoneNumberField()
#     bio = models.CharField(max_length=150, blank=True)
#     location = models.CharField(max_length=30, blank=True)
    #photo


class Stylist(NewUser):
    is_stylist = models.BooleanField(default=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null = True )


class StylistRating(models.Model):
    stylist = models.OneToOneField(Stylist, on_delete=models.CASCADE)
    stylist_rating = models.IntegerField(max_length=2, default=0)

    @property
    def rating(self, stylist_rating):
        return stylist_rating