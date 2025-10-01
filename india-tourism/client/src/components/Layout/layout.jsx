 import React from 'react';
 import '../../styles/loginsignup.css';
 import { createTheme, ThemeProvider } from '@mui/material/styles';
 const Layout = ({ children }) => {

  const theme = createTheme({
           palette: {
             background: {
               paper: 'rgba(155, 185, 250, 1)', // Your desired hex color
             },
           },
         }); 
      return (
        
       <ThemeProvider theme = {theme}>
        <div className="original-content">
          
           <main>{children}</main> {/* This is where your page content will be rendered */}
        </div>
        </ThemeProvider>
      );
    };

    export default Layout;