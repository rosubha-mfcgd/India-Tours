import React, { useEffect,useState,useContext } from "react";  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NavProvider } from '../navigationContext/navigationContext.jsx';
import NavBar from '../navigationTabs/navBar.jsx';
import Header from '../header/header.jsx';
import Layout from '../Layout/layout.jsx';
import UserProfile from '../userprofile/userprofile.jsx';
import '../../styles/loginsignup.css';

import {useLocation } from 'react-router-dom';
import TripList from "./tripList.jsx";
const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile,access_token} = location.state || {};

   return (
   
    <div>
         <NavProvider>
        <div>
           
        <div>
            {access_token?
              <UserProfile name = {name} email={email} mobile={mobile}
                access_token={access_token}/>:<Header/>
            } 
           
        </div>
       
        <div className="center-container">
         <div className="rightinfo-container">
           

         <div className="original-content">
         <Layout> {/* Wrap your routes with the Layout component */}
            <Routes>
              <Route path="/" element={<NavBar access_token={access_token} />} />
              <Route path="/tripList/:category" element={<TripList access_token={access_token}  />} />
              {/* Add more routes here */}
            </Routes>
          </Layout>
          </div>
          </div>
         
       </div>
      
     </div>
     </NavProvider>
    </div>
      )
}

export default Welcome;