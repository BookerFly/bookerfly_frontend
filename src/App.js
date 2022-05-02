import React, { useState, useEffect } from 'react'
import './App.css';
import BookList from './BookList';
import BookDetail from './BookDetail';
import AppNavbar from './AppNavbar';
import CheckOutRecord from './CheckOutRecord';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios'

const fetchBookInfos = (setBookInfos) => {
  axios.get(`http://localhost:8080/bookerfly/collection/book-infos`).then(response => {
    setBookInfos(response.data)
  }).catch(error => console.error(error));
}

const fetchBooks = (setBooks) => {
  axios.get(`http://localhost:8080/bookerfly/collection/books`).then(response => {
    setBooks(response.data)
  }).catch(error => console.error(error));
}

const App = () => {
  const [flag, setFlag] = useState(false);
  const [bookInfos, setBookInfos] = useState([]);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetchBookInfos(setBookInfos)
    // fetchBooks(setBooks)
  }, [])
  useEffect(() => {
    fetchBookInfos(setBookInfos)
    console.log("trigger fetchBookInfos.", flag)
  }, [flag])
  let setFlagFunction = (f) => setFlag(f)

  return (
    <NavigationContainer>
      <AppNavbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BookList bookInfos={bookInfos} />} />
          <Route path="/bookDetail" element={<BookDetail setFlag={setFlagFunction}/>} />
          <Route path="/checkOutRecord" element={<CheckOutRecord/>} />
        </Routes>
      </BrowserRouter>
    </NavigationContainer>
  )
}

export default App;
