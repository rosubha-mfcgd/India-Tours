import React from "react";
import NavBar from '../navigationTabs/navBar.jsx';
import RightInfo from '../navigationTabs/rightInfo.jsx';
import UserProfile from '../userprofile/userprofile.jsx';

import '../../styles/loginsignup.css';
import { useLocation } from 'react-router-dom';
const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile,access_token} = location.state || {};
    return (
   
    <div>
        <div>

            <UserProfile name = {name} email={email} mobile={mobile} access_token={access_token}/>
        </div>
        <div className="center-container">
         <div className="rightinfo-container">
            <RightInfo/>
           

         <div className="original-content">
         <NavBar access_token={access_token}/>
          </div>
          </div>
       </div>  
    </div>)
}

export default Welcome;