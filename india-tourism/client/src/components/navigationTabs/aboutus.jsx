import React, { useEffect,useState,useContext } from "react";
import { NavProvider } from '../navigationContext/navigationContext.jsx';
import NavBar from '../navigationTabs/navBar.jsx';
import UserProfile from '../userprofile/userprofile.jsx';
import '../../styles/loginsignup.css';

const Aboutus = () =>{

return (
      <div className="terms-and-conditions-container">
      <h1>Terms and Conditions</h1>

      <section className="section-intro">
        <p>Welcome to [Your Company Name]! These terms and conditions outline the rules and regulations for the use of [Your Company Name]'s Website, located at [Your Website URL].</p>
      </section>

      <section className="section-intellectual-property">
        <h2>1. Intellectual Property</h2>
        <p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights.</p>
      </section>

      {/* Add more sections as needed */}

      <section className="section-acceptance">
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use [Your Company Name] if you do not agree to take all of the terms and conditions stated on this page.</p>
        {/* Optional: Add an "I agree" checkbox and button */}
        {/* <input type="checkbox" id="agree" />
        <label htmlFor="agree">I agree to the Terms and Conditions</label>
        <button disabled={!agreed}>Continue</button> */}
      </section>
    </div>
  );
}


export default Aboutus;
