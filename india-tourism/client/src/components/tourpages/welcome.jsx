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
import BookingForm from "./bookingForm.jsx"
const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile,access_token} = location.state || {};
     
     const [showTrips,setShowTrips] = useState(false);
     const [showTripDetails,setShowTripDetails] = useState(false);
     const [bookTrip,setBookTrip] = useState(false);
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

const openBookingForm = (tourDetails) =>{
  console.log('tourDetails...',tourDetails);
    if(tourDetails)
    {
       setShowTripDetails(false);
          setShowTrips(false);
      setBookTrip(true);
    }else
    {
      setBookTrip(false);
    }
}

       const showDetails = (tourDetails,tourManager) =>{
        if(tourDetails){
       //tourDetails =   prepareDetails(tourDetails);
      console.log('location....',tourDetails.locationName)
      console.log('tourManager name....',tourManager.tourManagerName)
      console.log('tripLength....',tourDetails.tripLength)
      console.log('start date....',tourDetails.startDate)
      console.log('end date....',tourDetails.endDate)
      console.log('image....',tourDetails.image)
        if(tourDetails)
        {
         let tourDtls = {"locationName":tourDetails.locationName,
            "tourManagerName":tourManager.tourManagerName,
            "triplength":tourDetails.triplength,
            "image":tourDetails.image,
            "desc":tourDetails.desc,
            "contact":tourManager.contact,            
            "startDate":tourDetails.startDate,
            "endDate":tourDetails.endDate,
            "package_cost":tourDetails.package_cost,
            "max_tourist":tourDetails.max_tourist,
            "seats_left":tourDetails.seats_left,
            "ticket_cost":tourDetails.ticket_cost,
            "itinerary": tourDetails.itinerary,
            "categoryId":tourDetails.categoryId
        };
          setTripDetailsParam(tourDtls);
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
              <TripDetails access_token={access_token} tourDetails={tripDetailsParam}
              triggerDisplayTripsByCatId={triggerDisplayTripsByCatId} openBookingForm={openBookingForm}/> 
            :(bookTrip)?
            <BookingForm access_token={access_token} tourDetails={tripDetailsParam} 
           triggerDisplayTripsByCatId={triggerDisplayTripsByCatId} />
             : 
             <NavBar access_token={access_token} 
             triggerDisplayTripsByCatId={triggerDisplayTripsByCatId}/>
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