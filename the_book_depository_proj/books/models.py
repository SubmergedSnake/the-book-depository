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

    def __eq__(self, other):
        return self.title == other.title and \
            self.author == other.author and \
            self.description == other.description

    # When __eq__ is implemented (implemented here to ease testing, namely using assertEqual),
    # Python for some reason implicitly sets __hash__ to return None - thus had to implement this
    # see https://stackoverflow.com/questions/1608842/types-that-define-eq-are-unhashable
    def __hash__(self):
        return super().__hash__()
