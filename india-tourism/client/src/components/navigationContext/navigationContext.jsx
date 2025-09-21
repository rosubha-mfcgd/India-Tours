import {createContext, useState} from 'react';

export const NavContext = createContext();

export const NavProvider = ({children}) =>{
    
const[notification,setNotification] = useState(false);

    const triggerNotification = (data) => {
    setNotification(data);
    
  };

  
return (
    <NavContext.Provider value={{notification, triggerNotification}}>
      {children}
    </NavContext.Provider>
  );
};