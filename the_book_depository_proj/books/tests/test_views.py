from django.test import TestCase
from books.models import Book


class BookModelTests(TestCase):
    def test_retrieves_all_books_successfully(self):
        books = self.client.get('/api/books/').data
        self.assertIs(3, len(books), 'should return 3 books')

    def test_a_book_has_all_required_properties(self):
        book = Book.objects.create_book(self.client.get('/api/books/1').data)
        self.assertTrue(hasattr(book, 'title'))
        self.assertTrue(hasattr(book, 'author'))
        self.assertTrue(hasattr(book, 'description'))
