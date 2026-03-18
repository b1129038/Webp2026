from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.serializers.json import DjangoJSONEncoder
import json
from .models import Post

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    
    return Response({
        "data": json.dumps(
            list(posts), 
            sort_keys=True, 
            indent=1, 
            cls=DjangoJSONEncoder
        )
    }, status=status.HTTP_200_OK)