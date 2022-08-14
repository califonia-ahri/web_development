from django.urls import path, include
from .views import HelloAPI, BooksAPI, BookAPI, BooksAPIMixins, BookAPIMixins, BookViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register('books', BookViewSet)

urlpatterns = router.urls

# urlpatterns = [
#     path("hello/", HelloAPI),
#     path("fbv/books/", BooksAPI),
#     path("fbv/book/<int:bid>", BookAPI),
#     path("mixin/books/", BooksAPIMixins.as_view()),
#     path("mixin/book/<int:bid>", BookAPIMixins.as_view()),
# ]