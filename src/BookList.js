import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap';
import angryCat from './angry_cat.png'
import './App.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import {FaSearch} from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup'

const selectBook = (bookInformation, navigate) => {
  console.log("click", bookInformation)
  axios.get(`http://localhost:8080/bookerfly/collection/select/book-infos/${bookInformation.bookInfoId}`).then(response => {
    navigate('/bookDetail', { state: { bookInformation, books: response.data, image: angryCat } });
  }).catch(error => console.error(error));
}

const BookInformation = ({ bookInformation }) => {
  const navigate = useNavigate();
  return (
    <Card className="book" onClick={() => selectBook(bookInformation, navigate)} >
      <Card.Img variant="top" src={angryCat} />
      <Card.Body style={{ "textAlign": "center" }}>
        <Card.Title>{bookInformation.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

const BookList = ({bookInfos}) => {
  return (
    <React.Fragment>
      <div className="search-bar">
        <div className="search-option">
          <Form.Select>
            <option>關鍵字</option>
            <option>書名</option>
            <option>作者</option>
            <option>類型</option>
          </Form.Select>
        </div>
        <div className="keyword">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
            <Form.Control
              placeholder="請輸入關鍵字"
            />
        </InputGroup>
        </div>
        <Button className="search-button">搜尋</Button>
      </div>
      <h1 className="title">所有藏書</h1>
      <div className="book-list">
        { bookInfos.map(item => <BookInformation bookInformation={item}/>) }
      </div>
    </React.Fragment>
  )
}

export default BookList;