import React, { useState, useEffect } from 'react'
import './App.css';
import BookList from './pages/BookList/BookList';
import BookDetail from './pages/BookDetail/BookDetail';
import EditableBookDetail from './pages/BookDetail/EditableBookDetail';
import AppNavbar from './AppNavbar';
import CheckOutRecord from './pages/CheckOutRecord/CheckOutRecord';
import BookManagement from './pages/BookManagement/BookManagement';
import TrackingCheckOutRecord from './pages/CheckOutRecord/TrackingCheckOutRecord';
import BookAdder from './pages/BookManagement/BookAdder';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { NavigationContainer } from '@react-navigation/native';
import {getAllBookInformationApi} from './api/bookerflyApi.js'
import Login from './pages/Login/Login';
import FavoriteList from './pages/FavoriteList/FavoriteList';

const fetchBookInfos = (setBookInfos) => {
  getAllBookInformationApi(response => {
    setBookInfos(response.data)
  }, error => console.error(error))
}

const App = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [bookInfos, setBookInfos] = useState([]);
  const [searchCondition, setSearchCondition] = useState({ option: "ANY_MATCH", keyword: "", isSearched: false})

  useEffect(() => {
    fetchBookInfos(setBookInfos)
    if(sessionStorage.getItem("authenticated")) {
      console.log("istrue")
      setIsAuthed(true)
    } else {
      console.log("isfalse")
    }
  }, [])


  return (
    <NavigationContainer>
      <AppNavbar isAuthed={isAuthed}/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login setIsAuthed={setIsAuthed}/>} />

          <Route path="/" element={<BookList bookInfos={bookInfos} setBookInfos={setBookInfos} searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>} />
          <Route path="/user/bookDetail" element={<BookDetail/>} />
          <Route path="/manager/bookDetail" element={<EditableBookDetail/>} />
          <Route path="/checkOutRecord" element={<CheckOutRecord/>} />
          <Route path="/favoriteList" element={<FavoriteList/>} />
          <Route path="/bookManagement" element={<BookManagement/>} />
          <Route path="/trackingCheckOutRecord" element={<TrackingCheckOutRecord/>} />
          <Route path="/bookAdder" element={<BookAdder/>} />

          <Route path="*" element={<Navigate replace to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </NavigationContainer>
  )
}

export default App;
