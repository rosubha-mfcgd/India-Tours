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
import CustomBookingForm from "./custombookingForm.jsx"; 
import { getCities } from "../admin/admin";
import ChatButton from '../Utilities/ChatButton.jsx';
import ChatWindow from '../Utilities/ChatWindow.jsx';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css'; // Import the default styles

const Welcome =()=>{

     const location = useLocation();
     const { name,email,mobile,access_token} = location.state || {};
     
     const [showTrips,setShowTrips] = useState(false);
     const [showTripDetails,setShowTripDetails] = useState(false);
     const [bookTrip,setBookTrip] = useState(false);
     const [showCategories,setShowCategories] = useState(false);
     const [previewbooking,setPreviewbooking] = useState(false);
     const [searchOptions,setSearchOptions] = useState(false);
    const [userBooking,setUserBooking] = useState(false);
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

        if(categoryId && categoryId != 9 && categoryId != 10)
        {
          console.log('here in categoryId 1...')
          setTripListParam(categoryId);
          setShowTrips(true);
        }
        else if(categoryId === 9){
           console.log('here in categoryId 2...')
          setCategoryID(categoryId);
          setShowCategories(false);
          setUserBooking(false);
             setSearchOptions(true);
        }        
        else if(categoryId === 10){

           console.log('here in categoryId 3...')
           console.log('cityList....',cityList)
          setCategoryID(categoryID);
          setShowCategories(false);
          setShowTrips(false);
          setSearchOptions(false);
          setUserBooking(true);

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
      //This method populates the information in trip detail screen
       const showDetails = async (tourDetails,tourManager) =>{
        if(tourDetails){
            //tourDetails =   prepareDetails(tourDetails);
            
            let location = '';
            if(tourDetails.cityName && tourDetails.stateName)
              {
                location = tourDetails.cityName +','+tourDetails.stateName;
              } else if(tourDetails.cityName)
              {
                location = tourDetails.cityName;

              }
              else if(tourDetails.stateName)
              {
                 location = tourDetails.stateName;
              }
            console.log('location....',location)
            console.log('tourManager name....',tourManager.tourManagerName)
            console.log('tripLength....',tourDetails.tripLength)
            console.log('start date....',tourDetails.startDate)
            console.log('end date....',tourDetails.endDate)
            console.log('image....',tourDetails.image)
            console.log('domesticOrInternational....',tourDetails.domesticOrinternational)
            console.log('categoryId....',tourDetails.categoryId)
        if(tourDetails)
        {
   
            let tourDtls = {"locationName":location,
                "tourManagerName":tourManager.tourManagerName,
                "tourManagerId":tourManager.tourManagerId,
                "triplength":tourDetails.tripLength,
                "image":tourDetails.image,
                "nights": tourDetails.nights,
                "desc":tourDetails.description,
                "contact":tourManager.contact,            
                "startDate":tourDetails.startDate,
                "endDate":tourDetails.endDate,
                "currency":tourDetails.currency,
                "package_cost":tourDetails.packageCost,
                "max_tourist":tourDetails.maxTourist,
                "seats_left":tourDetails.seatsLeft,
                "ticket_cost":tourDetails.ticketCost,
                "itinerary": tourDetails.itinerary,
                "categoryId":tourDetails.categoryId,
                "domesticOrInternational":tourDetails.tourType
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
   
    <div className="center-container">
         <NavProvider>
          
        <div>
           
            <div>
                      {access_token?
                        <UserProfile name = {name} email={email} mobile={mobile}
                          access_token={access_token}/>:<Header/>
                      } 
                     
                  </div> 
       
       
      
         <div className="center-container">
           

         <div className="original-content">
      
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
             (userBooking)?
            <CustomBookingForm access_token={access_token} cityList = {cityList}
            triggerDisplayOptionsByCatId={triggerDisplayOptionsByCatId}/>:
            <Product access_token={access_token} 
             triggerDisplayTripsByProductId={triggerDisplayTripsByProductId} />
         }
          </Layout>
          
          {/* <ChatButton toggleChat={toggleChat} />
                    {isChatOpen && <ChatWindow onClose={toggleChat} /> */}
                   {
                    <WhatsAppWidget
      phoneNumber="+919836266731" // Your international phone number
      companyName="Mitram Support"
      replyTimeText="Typically replies within an hour"
      message="Hello! 👋🏼\n\nHow can we help you today?"
    />
          }
          </div>
          </div>
        
       </div>
      
    
     </NavProvider>
    </div>
      )
}

export default Welcome;