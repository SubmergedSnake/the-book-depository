import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import BookList from "./BookList";
import BookForm from "./BookForm";

import axios from "axios";

import { API_URL } from "../constants";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    getBooks();
  }, [])

  const selectBook = (book, td) => {
    const highlightClass = 'table-success';
    const row = td.parentElement;
    if (selectedRow) {
      selectedRow.classList.remove(highlightClass);
    }
    setSelectedRow(row);
    row.classList.add(highlightClass);
    setSelectedBook(book);
  }


  const getBooks = () => {
    axios.get(API_URL).then(
      res => {
        setBooks(res.data);
      }
    );
  };


  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col
          sm="12"
          md="6"
        >
          <BookList
            books={books}
            getBooks={getBooks}
            selectBook={selectBook}
          />
        </Col>
        <Col
          sm="12"
          md="6"
        >
          <BookForm
            getBooks={getBooks}
            selectedBook={selectedBook}
          />
        </Col>
      </Row>
    </Container >
  );
}

export default Home;
