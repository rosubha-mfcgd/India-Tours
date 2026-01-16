import {createContext, useState} from 'react';

export const NavContext = createContext();

export const NavProvider = ({children}) =>{
    
const[notification,setNotification] = useState(false);
const[sortTrip,setSortTrip] = useState(false);
const[loading,setLoading] = useState(false);

    const triggerNotification = (data) => {
    setNotification(data);
    
  };

const triggerSorting = (data) => {
    setSortTrip(data);
    
  };
 
  
return (
    <NavContext.Provider value={{notification, sortTrip,triggerNotification,triggerSorting,
      loading,setLoading}}>
      {children}
    </NavContext.Provider>
  );
};