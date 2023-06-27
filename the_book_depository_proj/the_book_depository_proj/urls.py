from django.contrib import admin
from django.urls import path, re_path
from books import views


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/books/$', views.books_list),
    re_path(r'^api/books/([0-9])$', views.books_detail),
]
