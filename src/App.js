import React, { useState, useEffect } from 'react'
import './App.css';
import BookList from './BookList';
import BookDetail from './BookDetail';
import AppNavbar from './AppNavbar';
import CheckOutRecord from './CheckOutRecord';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios'

const fetchData = (setData) => {
  axios.get(`http://localhost:8080/bookerfly/collection/book-infos`).then(response => {
    console.log("data", response.data)
    setData(response.data)
  }).catch(error => console.error(error));
}

const fetchBooks = (setBooks) => {
  axios.get(`http://localhost:8080/bookerfly/collection/books`).then(response => {
    console.log("fetchBooks", response.data)
    setBooks(response.data)
  }).catch(error => console.error(error));
}


const App = () => {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetchData(setData)
    fetchBooks(setBooks)
  }, [])
  useEffect(() => {
    fetchData(setData)
    console.log("trigger fetchData.", flag)
  }, [flag])
  let setFlagFunction = (f) => setFlag(f)

  return (
    <NavigationContainer>
      <AppNavbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BookList data={data} />} />
          <Route path="/bookDetail" element={<BookDetail setFlag={setFlagFunction}/>} />
          <Route path="/checkOutRecord" element={<CheckOutRecord bookInfos={data} books={books}/>} />
        </Routes>
      </BrowserRouter>
    </NavigationContainer>
  )
}

export default App;
