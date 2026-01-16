import React, { useState, useEffect } from 'react';
import {Routes,Route} from 'react-router-dom'
import axios from 'axios';
import TodoForm from './TodoForm';
import './styles/App.css';
import LoginSignup from  './components/loginsignup/loginsignup.jsx'
import sendotp from './components/loginsignup/sendotp.jsx'
import Welcome from './components/tourpages/welcome.jsx'
import TripList from './components/tourpages/tripList.jsx'
 import { NavProvider } from './components/navigationContext/navigationContext';
const App = () => {
  const [todos, setTodos] = useState([]);
      
     
      
  
  return (
     
   <NavProvider>
      <Routes>
      <Route path='signup' Component={LoginSignup}></Route>
      <Route path='sendotp' Component={sendotp}></Route>
      <Route path='welcome' Component={Welcome}></Route>
      <Route path='/' Component={Welcome}></Route>
      <Route path='/searchtrip' Component={TripList}></Route>
    </Routes>
   </NavProvider>   
   
  );
};
export default App;
