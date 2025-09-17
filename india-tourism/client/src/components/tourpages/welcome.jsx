import React, { useEffect,useState,useContext } from "react";
import { NavProvider } from '../navigationContext/navigationContext.jsx';
import NavBar from '../navigationTabs/navBar.jsx';
import UserProfile from '../userprofile/userprofile.jsx';
import '../../styles/loginsignup.css';

import { useLocation } from 'react-router-dom';
const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile,access_token} = location.state || {};

  const [childWindow, setChildWindow] = useState(null);
  const containerRef = useRef(null);

  const openChildWindow = () => {
    const newWindow = window.open(
      '',
      '_blank',
      'width=600,height=400,left=200,top=200'
    );
    setChildWindow(newWindow);

    // Create a div element in the new window's body to mount the React component
    if (newWindow) {
      const container = newWindow.document.createElement('div');
      newWindow.document.body.appendChild(container);
      containerRef.current = container;
    }
  };

    useEffect(() => {
    // Clean up the child window when the parent component unmounts
    return () => {
      if (childWindow) {
        childWindow.close();
      }
    };
  }, [childWindow]);
     
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