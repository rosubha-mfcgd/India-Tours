import {createContext, useState} from 'react';

export const NavContext = createContext();

export const NavProvider = ({children}) =>{
    
const[notification,setNotification] = useState(false);
const[sortTrip,setSortTrip] = useState(false);
const[loading,setLoading] = useState(false);
const[bookingData,setBookingData] = useState([]);
    const triggerNotification = (data) => {
    setNotification(data);
    
  };

const triggerSorting = (data) => {
    setSortTrip(data);
    
  };
 const prepareBookingData = (data) =>{
  setBookingData(data)
 }
  
return (
    <NavContext.Provider value={{notification, sortTrip,triggerNotification,triggerSorting,
      loading,setLoading,bookingData,prepareBookingData}}>
      {children}
    </NavContext.Provider>
  );
};