import React, { useEffect,useState,useContext } from "react";  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../styles/loginsignup.css';

import {useLocation } from 'react-router-dom';

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  
const TripList = ({access_token}) =>{
    const[photo,setPhoto] = useState('');
    const { category } = useParams();
    const image = "hillstation.png";
   
    useEffect = (() =>{
        //const rndInt = randomIntFromInterval(1, 5);
        setPhoto("hillstation.png");
    },[]);
    const rndInt = 1;
       
   
   return(
        
        <div>
            <img src = {photo} alt=''></img>
            <div className='submit-container'></div>
            
        </div>
   )
    
}

export default TripList