import React, { useState, useEffect } from 'react';
import {Routes,Route} from 'react-router-dom'
import axios from 'axios';
import TodoForm from './TodoForm';
import './styles/App.css';
import LoginSignup from  './components/loginsignup/loginsignup.jsx'
import sendotp from './components/loginsignup/sendotp.jsx'
import welcome from './components/tourpages/welcome.jsx'
import hillstationtourism from './components/tourpages/hillstationtourism.jsx'
const App = () => {
  const [todos, setTodos] = useState([]);
  
  return (
    
   
      <Routes>
      <Route path='/' Component={LoginSignup}></Route>
      <Route path='sendotp' Component={sendotp}></Route>
      <Route path='welcome' Component={welcome}></Route>
      <Route path='hillstation' Component={hillstationtourism}></Route>
    </Routes>
      
    
  );
};
export default App;
