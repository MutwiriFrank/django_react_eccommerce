from django.http import JsonResponse

from rest_framework.decorators import api_view,  renderer_classes
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post

