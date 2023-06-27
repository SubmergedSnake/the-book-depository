import React from "react";
import { Table } from "reactstrap";

const BookList = (props) => {


  const { books, selectBook } = props;
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {!books || books.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No books have been added yet</b>
              </td>
            </tr>
          ) : (
            books.map(book => (
              <tr key={book.pk} id={"book" + book.pk} onClick={(e) => selectBook(book, e.target)}>
                <td> {book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default BookList;
