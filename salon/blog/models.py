from django.db import models
from django.utils import timezone
from django.conf import settings
from users.models import NewUser
import datetime

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class PostLike(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Post", on_delete=models.CASCADE)
    #timestamp = models.DateTimeField(auto_now_add=True)



class Post(models.Model):
    # model manager
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='published')

    OPTIONS = (
        ('draft', 'draft'),
        ('published', 'published')
    )

    content = models.TextField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, blank=True, null=True)
    slug = models.SlugField(max_length=100, unique_for_date='published', null=True, blank=True)
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
    image = models.ImageField(null=True, blank=True)
    likes = models.ManyToManyField(NewUser, related_name='post_user', blank=True, through=PostLike)    #
    status = models.CharField(max_length=10, choices=OPTIONS, default='published')
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    def __str__(self):
        return str(self.author)

    @property  # decorator to help us assign image_url as a variable
    def image_url(self):  # so that we don't get an error in case an image fails to load,
        try:  # instead we get an empty string
            url = self.image.url
        except:
            url = ''
        return url


class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField(blank=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']
