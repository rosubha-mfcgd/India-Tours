import React, { useEffect,useState,useContext } from "react";
import { NavProvider } from '../navigationContext/navigationContext.jsx';
import NavBar from '../navigationTabs/navBar.jsx';
import UserProfile from '../userprofile/userprofile.jsx';
import '../../styles/loginsignup.css';

import { useLocation } from 'react-router-dom';
const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile,access_token} = location.state || {};
     
   return (
   
    <div>
         <NavProvider>
        <div>
           
        <div>
            
            <UserProfile name = {name} email={email} mobile={mobile}
             access_token={access_token}/>
             
           
        </div>
        <div className="center-container">
         <div className="rightinfo-container">
           

         <div className="original-content">
         <NavBar access_token={access_token}/>
          </div>
          </div>
         
       </div>  
     </div>
     </NavProvider>
    </div>
      )
}

export default Welcome;