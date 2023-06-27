import React, { useRef, useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

const BookForm = (props) => {
  const { getBooks, selectedBook } = props;
  const [currentBook, setCurrentBook] = useState(selectedBook);
  useEffect(() => { setCurrentBook(selectedBook) }, [selectedBook]);
  const titleInput = useRef(null);

  const onChange = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setCurrentBook({ ...currentBook, [name]: value });
  }

  const resetForm = () => {
    setCurrentBook({ pk: '', title: '', author: '', description: '' });
  }

  const addNewBook = e => {
    e.preventDefault();
    resetForm();
    titleInput.current.focus();
  };


  const deleteBook = () => {
    axios.delete(API_URL + currentBook.pk, currentBook).then(() => {
      getBooks();
      resetForm();
    })
  }

  const saveBook = (e) => {
    e.preventDefault();
    if (currentBook.pk) {
      axios.put(API_URL + currentBook.pk, currentBook).then(() => {
        getBooks();
      });
    } else {
      axios.post(API_URL, currentBook).then(() => {
        getBooks();
      }).catch((err) => {
        console.log('erroneous payload!', err)
      });
    }
  }


  return (
    <div>
      <Form onSubmit={saveBook} >
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input
            innerRef={titleInput}
            name="title"
            type="text"
            value={currentBook?.title}
            onChange={onChange}
            maxLength={50}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author:</Label>
          <Input
            type="text"
            name="author"
            value={currentBook?.author}
            onChange={onChange}
            maxLength={50}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description:</Label>
          <Input
            type="textarea"
            name="description"
            value={currentBook?.description}
            onChange={onChange}
            required
            maxLength={200}
          />
        </FormGroup>
        <Button outline>Save</Button>&nbsp;
        <Button outline onClick={addNewBook}>Add new book</Button>&nbsp;
        <Button outline onClick={() => deleteBook(currentBook.pk)}>Delete</Button>
      </Form>
    </div>
  );
}

export default BookForm;
