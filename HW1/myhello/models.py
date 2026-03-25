from django.db import models

class Course_table(models.Model):
    Department = models.CharField(max_length=50)
    CourseTitle = models.CharField(max_length=100)
    Instructor = models.CharField(max_length=50)

    def __str__(self):
        return self.CourseTitle