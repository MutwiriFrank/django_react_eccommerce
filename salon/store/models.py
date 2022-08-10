
import uuid


from django.db import models

from users.models import NewUser


class Room(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)

    def __str__(self):
        return self.name


class Dealer(models.Model):
    store_dealer = models.ForeignKey(NewUser, blank=True, null=True, on_delete=models.CASCADE)
    is_dealer = models.BooleanField(default=True)
    shop_name = models.CharField(max_length=100, null=True, blank=True,  default='mniiz_shop') 
    location = models.CharField(max_length=255, null=True, blank=True,  default='Nairobi') 
    city = models.CharField(max_length=255, null=True, blank=True,  default='NAIROBI') 
    email = models.EmailField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=13, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)


    class Meta:
        ordering = ('shop_name',)

    def __str__(self):
        return self.shop_name

class QuerySearched(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    date = models.DateField(null=True, auto_now=True )
    time = models.TimeField(null=True, blank=True , auto_now=True)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return str(self.name)


class Tag (models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return str(self.name)


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    rating = models.IntegerField(null=True, blank=True)
    

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/{self.slug}'

class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    rating = models.IntegerField(null=True, blank=True)   

    def __str__(self):
            return f"{self.name }- {self.id}"


class CaroselItems(models.Model):
    image = models.ImageField( blank=True, null=True, default='index.jpg')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.name)


class Product(models.Model):

    dealer = models.ForeignKey(Dealer, on_delete=models.SET_NULL,  null=True, blank=True, default='mniiz_shop')
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, blank=True )
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True )
    tag = models.ManyToManyField(Tag, blank=True,null=True)
    querysearched = models.ManyToManyField(QuerySearched, blank=True,null=True)
    room = models.ManyToManyField('Room', blank=True,null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField( blank=True, null=True, default='index.jpg')
    date_added = models.DateTimeField(auto_now_add=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=255, null=True, blank=True)
    size = models.IntegerField(null=True, blank=True)
    discount = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ('-date_added',)     

    def __str__(self):
        return self.name

    
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True )
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True,  null=True, blank=True)

    
    def __str__(self):
        return f" {self.product}  "


class Order(models.Model):
    PAYMENTMETHODS = (
        ("mpesa", "mpesa"),
        ("ondelivery", "ondelivery"),     
    )
    DELIVERYOPTIONS = (
        ("pick_up", "pick_up"),
        ("delivery_to_home", "delivery_to_home"),
    )
    
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE, null=True)
    payment_method = models.CharField(max_length=200, choices= PAYMENTMETHODS, null=True, blank=True )
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
        return  f'{self.user} - {self.id}'

    class Meta:
        ordering = ('-created_at',)
    
   
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True )
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True )
    quantity = models.PositiveIntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2,  null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    order_code = models.UUIDField( default=uuid.uuid4, unique=True,  editable=False)
    
    def __str__(self):
        return f'{self.product} - {self.order_code}'
    
# shipping details
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.SET_NULL, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    estate = models.CharField(max_length=100, blank=True, null=True)
    road = models.CharField(max_length=100, blank=True, null=True)
    landmark = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)
    alternative_phone = models.CharField(max_length=200, blank=True, null=True)
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)



