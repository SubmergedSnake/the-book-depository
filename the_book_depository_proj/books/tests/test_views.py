from django.test import TestCase
from books.models import Book
from django.forms.models import model_to_dict


class BookModelTests(TestCase):

    def test_retrieves_all_books_successfully(self):
        books = self.client.get('/api/books/').data
        self.assertIs(3, len(books), 'should return 3 books')

    def test_edits_book_successfully(self):
        book_to_edit = Book.objects.get(title='1984')

        # Edit book
        book_to_edit.title = '1985'
        book_to_edit.author = 'Joonas Heikkinen'
        book_to_edit.description = 'New version of the classic dystopia'

        persisted_book_props = self.client.put(
            '/api/books/' +
            str(book_to_edit.pk), model_to_dict(book_to_edit, exclude='id'),
            content_type='application/json').data
        self.assertEqual(
                book_to_edit, Book.objects.create_book(persisted_book_props))

    def test_a_book_has_all_required_properties(self):
        book = Book.objects.create_book(self.client.get('/api/books/1').data)
        self.assertTrue(hasattr(book, 'title'))
        self.assertTrue(hasattr(book, 'author'))
        self.assertTrue(hasattr(book, 'description'))

    def test_book_is_deleted_successfully(self):
        self.client.delete('/api/delete/1')
        self.assertEquals(404, self.client.get('/api/books/1').status_code)
