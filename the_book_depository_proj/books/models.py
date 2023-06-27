from django.db import models
from django.db.utils import IntegrityError


class BookManager(models.Manager):
    def create_book(self, book_props: dict):
        book = None
        try:
            book = self.create(title=book_props["title"],
                               author=book_props["author"],
                               description=book_props["description"])
        except IntegrityError:
            pass
        return book


class Book(models.Model):
    title = models.CharField("Title", max_length=50)
    author = models.CharField("Author", max_length=50)
    description = models.CharField("Description", max_length=200)

    objects = BookManager()

    def __str__(self):
        return self.title
