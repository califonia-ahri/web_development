from rest_framework import routers
from django.urls import path, include
from .views import BooksAPIMixins, BookAPIMixins, BookViewSet
urlpatterns=[
    path("fbv/books/", BooksAPIMixins.as_view()),
    path("fbv/book/<int:bid>/", BookAPIMixins.as_view()),
    path("mixin/books/", BooksAPIMixins.as_view()),
    path("mixin/book/<int:bid>/", BookAPIMixins.as_view()),
]

router = routers.SimpleRouter()
router.register('books', BookViewSet)
urlpatterns=router.urls