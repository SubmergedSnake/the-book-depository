import React, { useState, useEffect } from "react";
import { Alert, Col, Container, Row, Button } from "reactstrap";
import BookList from "./BookList";
import BookForm from "./BookForm";

import axios from "axios";

import { API_URL } from "../constants";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState(false);


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
    ).catch(err => { setError(err) });
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
            setError={setError}
          />
        </Col>
      </Row>
          {error?.message && <Alert color="danger" className="mt-2">
            <h4 className="alert-heading">
              An error occurred
            </h4>
            <p>
              {error.message}
            </p>
            <hr />
            <Button onClick={() => setError(false)}> Acknowledge </Button>
          </Alert>}

    </Container >
  );
}

export default Home;
