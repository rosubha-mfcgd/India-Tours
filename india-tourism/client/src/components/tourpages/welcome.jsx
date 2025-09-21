import React, { useEffect,useState,useContext } from "react";  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NavBar from '../navigationTabs/navBar.jsx';
import Header from '../header/header.jsx';
import Layout from '../Layout/layout.jsx';
import UserProfile from '../userprofile/userprofile.jsx';
import '../../styles/loginsignup.css';
 import { NavProvider } from '../navigationContext/navigationContext.jsx';
 import {useLocation } from 'react-router-dom';
import TripList from "./tripList.jsx";
import TripDetails from "./tripDetails.jsx";

const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile,access_token} = location.state || {};
     
     const [showTrips,setShowTrips] = useState(false);
     const [showTripDetails,setShowTripDetails] = useState(false);
     const[tripListParam,setTripListParam] = useState('');
     const[tripDetailsParam,setTripDetailsParam] = useState('');

  
     const triggerDisplayTripsByCatId = (categoryId) =>{
      console.log('categoryId....',categoryId)
      setShowTripDetails(false);

        if(categoryId)
        {
          setTripListParam(categoryId);
          setShowTrips(true);
        }else{
          setShowTrips(false);
        }
     }

       const showDetails = (tourDetails) =>{
        if(tourDetails){
       //tourDetails =   prepareDetails(tourDetails);
      console.log('location....',tourDetails.locationName)
      console.log('tourManager name....',tourDetails.tourManagerName)
      console.log('tripLength....',tourDetails.tripLength)
      console.log('start date....',tourDetails.startDate)
      console.log('end date....',tourDetails.endDate)
      console.log('image....',tourDetails.image)
        if(tourDetails)
        {
         
          setTripDetailsParam(tourDetails);
          setShowTripDetails(true);
          setShowTrips(false);
        }else{
          //setTripDetailsParam(tourDetails);
          setShowTripDetails(false);
        }
      }
     }
      
           
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
         <Layout access_token={access_token} > {/* Wrap your routes with the Layout component */}
          {
           (showTrips)? 
              <TripList access_token={access_token} categoryId={tripListParam} showDetails={showDetails}/>
            : (showTripDetails) ?
              <TripDetails access_token={access_token} tourDetails={tripDetailsParam}/> 
            :
              <NavBar access_token={access_token} triggerDisplayTripsByCatId={triggerDisplayTripsByCatId}/>
          }
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