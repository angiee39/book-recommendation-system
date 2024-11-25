from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    added_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="books_added",
        default=1
    )  # Link to the user who added the book
    status = models.CharField(default="to-read")

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()