import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap';
import angryCat from './angry_cat.png'
import './App.css';
import { useNavigate } from 'react-router-dom';

const fetchData = (setData) => {
  axios.get(`http://localhost:8080/bookerfly/collection/book-infos`).then(response => {
    console.log(response.data)
    setData(response.data)
  }).catch(error => console.error(error));
}

const selectBook = (bookInformation, navigate) => {
  console.log("click", bookInformation)
  axios.get(`http://localhost:8080/bookerfly/collection/select/book-infos/${bookInformation.bookInfoId}`).then(response => {
    console.log(response.data)
    navigate('/bookDetail', 
    { state: { bookInformation, books: response.data, image: angryCat } }
    );
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

const BookList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData)
  }, [])
  return (
    <React.Fragment>
      <div className="book-list">
        {
          data.map(item => <BookInformation bookInformation={item} />)
        }
      </div>
    </React.Fragment>
  )
}

export default BookList;