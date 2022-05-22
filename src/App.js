import React, { useState, useEffect } from 'react'
import './App.css';
import BookList from './pages/BookList/BookList';
import BookDetail from './pages/BookDetail/BookDetail';
import AppNavbar from './AppNavbar';
import CheckOutRecord from './pages/CheckOutRecord/CheckOutRecord';
import BookManagement from './pages/BookManagement/BookManagement';
import TrackingCheckOutRecord from './pages/CheckOutRecord/TrackingCheckOutRecord';
import BookAdder from './pages/BookManagement/BookAdder';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { NavigationContainer } from '@react-navigation/native';
import {getAllBookInformationApi} from './api/bookerflyApi.js'

const fetchBookInfos = (setBookInfos) => {
  getAllBookInformationApi(response => {
    setBookInfos(response.data)
  }, error => console.error(error))
}

const App = () => {
  const [flag, setFlag] = useState(false);
  const [bookInfos, setBookInfos] = useState([]);
  const [searchCondition, setSearchCondition] = useState({ option: "ANY_MATCH", keyword: "", isSearched: false})

  useEffect(() => {
    fetchBookInfos(setBookInfos)
  }, [])

  let setFlagFunction = (f) => setFlag(f)

  return (
    <NavigationContainer>
      <AppNavbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BookList bookInfos={bookInfos} setBookInfos={setBookInfos} searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>} />
          <Route path="/bookDetail" element={<BookDetail setFlag={setFlagFunction}/>} />
          <Route path="/checkOutRecord" element={<CheckOutRecord/>} />
          <Route path="/bookManagement" element={<BookManagement/>} />
          <Route path="/trackingCheckOutRecord" element={<TrackingCheckOutRecord/>} />
          <Route path="/bookAdder" element={<BookAdder/>} />
        </Routes>
      </BrowserRouter>
    </NavigationContainer>
  )
}

export default App;
