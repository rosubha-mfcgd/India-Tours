import React, { useEffect,useState,useContext } from "react";  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NavBar from '../navigationTabs/navBar.jsx';
import Product from '../navigationTabs/products.jsx';
import DisplayOptions from '../navigationTabs/showOptions.jsx'
import Header from '../header/header.jsx';
import Layout from '../Layout/layout.jsx';
import UserProfile from '../userprofile/userprofile.jsx';

import '../../styles/loginsignup.css';
 import { NavProvider } from '../navigationContext/navigationContext.jsx';

 import {useLocation } from 'react-router-dom';
import TripList from "./tripList.jsx";
import TripDetails from "./tripDetails.jsx";
import BookingForm from "./bookingForm.jsx";
import PreviewForm from "./previewbooking.jsx";
 
import { getCities } from "../admin/admin";
import ChatButton from '../Utilities/ChatButton.jsx';
import ChatWindow from '../Utilities/ChatWindow.jsx';
const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile,access_token} = location.state || {};
     
     const [showTrips,setShowTrips] = useState(false);
     const [showTripDetails,setShowTripDetails] = useState(false);
     const [bookTrip,setBookTrip] = useState(false);
     const [showCategories,setShowCategories] = useState(false);
     const [previewbooking,setPreviewbooking] = useState(false);
     const [searchOptions,setSearchOptions] = useState(false);

     const [cityList,setCityList] = useState('');
     const[tripListParam,setTripListParam] = useState('');
     const[productID,setProductID] = useState('');
     const[categoryID,setCategoryID] = useState('');
     const[tripDetailsParam,setTripDetailsParam] = useState('');
     const[bookings,setBookings] = useState('');
     const[tourDetailsParam,setTourDetailsParam] = useState('');
     const [isChatOpen, setIsChatOpen] = useState(false);
    console.log('showTrips....',showTrips);
    console.log('showTripDetails....',showTripDetails);
    console.log('bookTrip....',bookTrip);
    console.log('showCategories....',showCategories);
    console.log('previewbooking....',previewbooking);
    
    const triggerDisplayOptionsByCatId = (categoryId) =>{
      console.log('categoryId....',categoryId)
      setShowTripDetails(false);

        if(categoryId && categoryId != 9)
        {
          setTripListParam(categoryId);
          setShowTrips(true);
        }
        else if(categoryId == 9){
          setCategoryID(categoryId);
          setShowCategories(false);
             setSearchOptions(true);
        }        
        else{
          setShowTrips(false);
        }
     }
    const triggerDisplayBookings = async(data,tourDetailInfo) =>{
      
      console.log('Here...');
      console.log('data is...',data);
       console.log('tourDetailInfo is...',tourDetailInfo);
      if(data){
        setShowTrips(false);
        setShowTripDetails(false);
        setBookTrip(false);
        setShowCategories(false);
        setPreviewbooking(true);
        setBookings(data);
        setTourDetailsParam(tourDetailInfo);
      }else{
        setPreviewbooking(false);
      }
    }
     const triggerDisplayTripsByProductId = async(productId) =>{
      console.log('productId....',productId)
      setShowCategories(false);

        if(productId)
        {
          if(cityList === ''){
          let cities = await getCities();
          if(cities){
            setCityList(cities);
          }
        }
          setProductID(productId);
          setShowCategories(true);
        }else{
          setShowCategories(false);
        }
     }

   const triggerDisplayTasksByOptionID = async(optionID) =>{
       console.log('optionID....',optionID)

       if(optionID)
       {
          console.log('Tasks not defined yet');
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

       const showDetails = async (tourDetails,tourManager) =>{
        if(tourDetails){
            //tourDetails =   prepareDetails(tourDetails);
            console.log('location....',tourDetails.locationName)
            console.log('tourManager name....',tourManager.tourManagerName)
            console.log('tripLength....',tourDetails.tripLength)
            console.log('start date....',tourDetails.startDate)
            console.log('end date....',tourDetails.endDate)
            console.log('image....',tourDetails.image)
            console.log('domesticOrInternational....',tourDetails.domesticOrinternational)
            console.log('categoryId....',tourDetails.categoryId)
        if(tourDetails)
        {
   
            let tourDtls = {"locationName":tourDetails.locationName,
                "tourManagerName":tourManager.tourManagerName,
                "tourManagerId":tourManager.tourManagerId,
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
                "categoryId":tourDetails.categoryId,
                "domesticOrInternational":tourDetails.domesticOrinternational
            };

            console.log('tourDetails is...',tourDtls)
              setTripDetailsParam(tourDtls);
              setShowTripDetails(true);
              setShowTrips(false);
        }else{
          //setTripDetailsParam(tourDetails);
          setShowTripDetails(false);
        }
      }
     }
      

      const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
      };
           
   return (
   
    <View className="center-container">
         <NavProvider>
          
        <View>
           
            <View>
                      {access_token?
                        <UserProfile name = {name} email={email} mobile={mobile}
                          access_token={access_token}/>:<Header/>
                      } 
                     
                  </View> 
       
       
      
         <View className="center-container">
           

         <View className="original-content">
      
         <Layout access_token={access_token} > {/* Wrap your routes with the Layout component */}
          {
           (showTrips)? 
              <TripList access_token={access_token} categoryId={tripListParam} 
              showDetails={showDetails}
                cityList = {cityList}
              />
            : (showTripDetails) ?
              <TripDetails access_token={access_token} 
              tourDetails={tripDetailsParam} 
              cityList = {cityList}
              triggerDisplayOptionsByCatId={triggerDisplayOptionsByCatId} 
              openBookingForm={openBookingForm}/> 
            :(bookTrip)?
            <BookingForm access_token={access_token} tourDetails={tripDetailsParam} 
           triggerDisplayOptionsByCatId={triggerDisplayOptionsByCatId} 
           triggerDisplayBookings={triggerDisplayBookings}/>
             :(showCategories) ?
             <NavBar access_token={access_token} 
             triggerDisplayOptionsByCatId={triggerDisplayOptionsByCatId} 
             productID={productID} cityList={cityList}/>:
             (searchOptions)?
             <DisplayOptions access_token={access_token} productID={productID} 
             categoryID={categoryID} triggerDisplayTasksByOptionID={triggerDisplayTasksByOptionID}/>
            :(previewbooking)?
            <PreviewForm access_token={access_token} bookings={bookings} 
            tourDetailsParam = {tourDetailsParam}/>:
            <Product access_token={access_token} 
             triggerDisplayTripsByProductId={triggerDisplayTripsByProductId} />
          }
          </Layout>
          
          <ChatButton toggleChat={toggleChat} />
                    {isChatOpen && <ChatWindow onClose={toggleChat} />}
          </View>
          </View>
        
       </View>
      
    
     </NavProvider>
    </View>
      )
}

export default Welcome;