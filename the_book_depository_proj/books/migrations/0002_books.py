# Generated by Django 4.2.2 on 2023-06-18 10:30

from django.db import migrations


def create_data(apps, schema_editor):
    Book = apps.get_model('books', 'Book')
    Book(title="The Heart of Darkness", author="Joseph Conrad",
         description="""Heart of Darkness (1899) is a novella by Polish-English
         novelist Joseph Conrad in which the sailor Charles Marlow tells
         his listeners the story of...""").save()

    Book(title="1984", author="George Orwell",
         description="""A dystopian future, where Big Brother
         is always watching you.""").save()

    Book(title="Atlas Shrugged", author="Ayn Rand",
         description="""Who is John Galt?""").save()


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
