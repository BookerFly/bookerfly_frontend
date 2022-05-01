import React, { useState, useEffect } from 'react'
import './App.css';
import BookList from './BookList';
import BookDetail from './BookDetail';
import AppNavbar from './AppNavbar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  return (
    <React.Fragment>
      <NavigationContainer>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<BookList />} />
            <Route path="/bookDetail" element={<BookDetail />} />
          </Routes>
        </BrowserRouter>
      </NavigationContainer>
    </React.Fragment>
  )
}

// const Stack = createNativeStackNavigator();
// const App = () => {
//   return (
//     <React.Fragment>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="bookList" screenOptions={{headerShown: false}}>
//         <Stack.Screen name="bookList" component={BookList} options={{headerShown: false}} />
//         <Stack.Screen name="bookDetail" component={BookDetail} options={{headerShown: false}} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     </React.Fragment>
//   )
// }

export default App;
