import React from "react";
import NavBar from '../navigationTabs/navBar.jsx';
import UserProfile from '../userprofile/userprofile.jsx';
import '../../styles/loginsignup.css';
import { useLocation } from 'react-router-dom';
const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile } = location.state || {};
    return (
   
    <div>
        <div>

            <UserProfile name = {name} email={email} mobile={mobile}/>
        </div>
<div className='underline'></div>
         <div className="center-container">
         <NavBar/>
         
          </div>
    </div>)
}

export default Welcome;