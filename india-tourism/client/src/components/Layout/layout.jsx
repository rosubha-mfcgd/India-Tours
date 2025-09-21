 import React from 'react';
 import '../../styles/loginsignup.css';

 const Layout = ({ children }) => {

 
      return (
        
       
        <div className="original-content">
           <main>{children}</main> {/* This is where your page content will be rendered */}
        </div>
        
      );
    };

    export default Layout;