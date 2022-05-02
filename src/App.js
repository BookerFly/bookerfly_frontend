import React from 'react'
import './App.css';
import BookList from './BookList';
import BookDetail from './BookDetail';
import AppNavbar from './AppNavbar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
      <NavigationContainer>
        <AppNavbar />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<BookList />} />
            <Route path="/bookDetail" element={<BookDetail />} />
          </Routes>
        </BrowserRouter>
      </NavigationContainer>
  )
}

export default App;
