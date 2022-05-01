import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Card } from 'react-bootstrap';
import angryCat from './angry_cat.png'
import './App.css';
import { useNavigation } from '@react-navigation/native';
import AppNavbar from './AppNavbar';
import BookDetail from './BookDetail';
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
      <AppNavbar />
      <div className="book-list">
        {
          data.map(item => <BookInformation bookInformation={item} />)
        }
      </div>

    </React.Fragment>
  )
}

// const selectBook = (bookInformation, navigation) => {
//   console.log("click", bookInformation)
//   axios.get(`http://localhost:8080/bookerfly/collection/select/book-infos/${bookInformation.bookInfoId}`).then(response => {
//     console.log(response.data)
//     navigation.navigate('bookDetail', {bookInformation, books: response.data, image: angryCat});
//   }).catch(error => console.error(error));
// }
// const BookInformation = ({ bookInformation }) => {
//   const navigation = useNavigation();
//   return (
//     <Card className="book" onClick={() => selectBook(bookInformation, navigation)} >
//       <Card.Img variant="top" src={angryCat} />
//       <Card.Body style={{ "textAlign": "center" }}>
//         <Card.Title>{bookInformation.title}</Card.Title>
//       </Card.Body>
//     </Card>
//   )
// }

// const BookList = ({navigation}) => {
//     const [data, setData] = useState([]);
//     useEffect(() => {
//       fetchData(setData)
//     }, [])
//     return (
//       <React.Fragment>
//         <AppNavbar/>
//         <div className="book-list">
//         {
//           data.map(item => <BookInformation bookInformation={item} />)
//         }
//       </div>
//       </React.Fragment>
//     )
// }

export default BookList;