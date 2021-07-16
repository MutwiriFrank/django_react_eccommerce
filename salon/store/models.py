from io import BytesIO
from PIL import Image
import uuid

from django.core.files import File
from django.db import models

from users.models import NewUser


class Dealer(NewUser):
    is_dealer = models.BooleanField(default=True)
    shop_name = models.CharField(max_length=100, null=True, blank=True)
    # location
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null = True, blank=True )

    class Meta:
        ordering = ('shop_name',)

    def __str__(self):
        return self.shop_name

class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/{self.slug}'


class Product(models.Model):
    dealer = models.ForeignKey(Dealer, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, related_name="category", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.name


    @property
    def get_image(self):
        if self.image:
            return 'http://127.0.0.1:8000' + self.image.url
        return ''

    def get_thumbnail(self):
        if self.thumbnail:
            return 'http://127.0.0.1:8000' + self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()

                return 'http://127.0.0.1:8000' + self.thumbnail.url
            else:
                return ''

    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        img.convert('RGB')
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)

        thumbnail = File(thumb_io, name=image.name)

        return thumbnail 
    
class Review(models.Model):
    Product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True )
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(blank=True, null=True)
    
    
    def __str__(self):
        return str( self.product)  + " - " + (self.rating)


class Order(models.Model):
    PAYMENTMETHODS = (
        ("mpesa", "mpesa"),
        ("cash_on_delevery", "cash_on_delevery"),
        ("equity", "equity"),
        ("kcb", "kcb"),
        ("paypal", "paypal"),
        
    )
    DELIVERYOPTIONS = (
      
        ("pick_up", "pick_up"),
        ("delivery_to_home", "delivery_to_home"),
    )
    
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE, null=True)
    payment_method = models.CharField(max_length=200, choices= PAYMENTMETHODS)
    tax_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    shipping_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True,  null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False,  null=True, blank=True)
    deliveryOption = models.CharField(max_length=100, choices=DELIVERYOPTIONS)
    isDelivered = models.BooleanField(default=False,  null=True, blank=True)
    deliveredAt= models.DateTimeField(auto_now_add=False,  null=True, blank=True)
    order_code = models.UUIDField( default=uuid.uuid4, unique=True,  editable=False)
    
    def __str__(self):
        return str(self.order_code)
    
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True )
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True )
    quantity = models.PositiveIntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2,  null=True, blank=True)
    Image = models.CharField(max_length=100, null=True, blank=True)
    order_code = models.UUIDField( default=uuid.uuid4, unique=True,  editable=False)
    
    def __str__(self):
        return f'{self.product} - {self.order_code}'
    

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.SET_NULL, null=True)
    town = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    shipping_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)