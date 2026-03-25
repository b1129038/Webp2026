from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course_table

@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return Response(list(courses))

@api_view(['POST'])
def addcourse(request):
    dept = request.data.get('Department')
    title = request.data.get('CourseTitle')
    teacher = request.data.get('Instructor')
    
    if dept and title and teacher:
        Course_table.objects.create(
            Department=dept, 
            CourseTitle=title, 
            Instructor=teacher
        )
        return Response({"message": "Success"}, status=status.HTTP_201_CREATED)
    return Response({"error": "Data incomplete"}, status=status.HTTP_400_BAD_REQUEST)