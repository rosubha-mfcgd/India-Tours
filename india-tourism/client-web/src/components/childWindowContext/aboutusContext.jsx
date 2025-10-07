import {createContext, useState} from 'react';

export const aboutusContext = createContext();

export const aboutusProvider = ({children}) =>{
    
const[aboutusWin,setAboutusWin] = useState(false);
    const triggerAboutusWin = (data) => {
    setAboutusWin(data);
    
  };
return (
    <NavContext.Provider value={{aboutusWin, triggerAboutus}}>
      {children}
    </NavContext.Provider>
  );
};