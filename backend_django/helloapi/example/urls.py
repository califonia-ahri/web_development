from django.urls import path, include
from .views import HelloAPI, BooksAPI, BookAPI

urlpatterns = [
    path("hello/", HelloAPI),
    path("fbv/books/", BooksAPI),
    path("fbv/book/<int:bid>", BookAPI)
]