import React from 'react';
import { Card } from 'react-bootstrap';
import angryCat from '../../img/angry_cat.png';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { selectBookApi } from '../../api/bookerflyApi';

const selectBook = (bookInformation, navigate) => {
  selectBookApi(bookInformation.bookInfoId, response => {
    navigate('/bookDetail', { state: { bookInformation, books: response.data, image: angryCat } });
  }, error => console.error(error))
}

const SimpleBookInformation = ({ bookInformation }) => {
  const navigate = useNavigate();
  return (
    <Card className="simple-book-card" onClick={() => selectBook(bookInformation, navigate)} >
      <Card.Img variant="top" src={angryCat} />
      <Card.Body style={{ "textAlign": "center" }}>
        <Card.Title>{bookInformation.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

const AllBookList = ({ bookInfos }) => {
  return (
    <React.Fragment>
      <h1 className="all-book-title">所有藏書</h1>
      <div className="all-book-list">
        {bookInfos.map(item => <SimpleBookInformation bookInformation={item} />)}
      </div>
    </React.Fragment>
  )
}

export default AllBookList;