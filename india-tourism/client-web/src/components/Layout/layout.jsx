 import React from 'react';
 import '../../styles/loginsignup.css';
 import { createTheme, ThemeProvider } from '@mui/material/styles';
 const Layout = ({ children }) => {

  const theme = createTheme({
           palette: {
             background: {
               paper: 'rgba(110, 43, 41, 0)', // Your desired hex color
             },
           },
         }); 
      return (
        
      
        <div className="original-content">
          
           <main>{children}</main> {/* This is where your page content will be rendered */}
        </div>
       
      );
    };

    export default Layout;