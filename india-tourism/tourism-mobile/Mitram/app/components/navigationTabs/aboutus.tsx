import React, { useEffect,useState,useContext } from "react";


 import { View,Text } from 'react-native';
const Aboutus = () =>{

return (
      <View>
      <h1>Terms and Conditions</h1>

      <section className="section-intro">
        <Text>Welcome to [Your Company Name]! These terms and conditions outline the rules and regulations for the use of [Your Company Name]'s Website, located at [Your Website URL].</Text>
      </section>

      <section className="section-intellectual-property">
        <h2>1. Intellectual Property</h2>
       <Text> The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights.</Text>
      </section>

      {/* Add more sections as needed */}

      <section className="section-acceptance">
        <Text>By accessing this website we assume you accept these terms and conditions. Do not continue to use [Your Company Name] if you do not agree to take all of the terms and conditions stated on this page.</Text>
        {/* Optional: Add an "I agree" checkbox and button */}
        {/* <input type="checkbox" id="agree" />
        <label htmlFor="agree">I agree to the Terms and Conditions</label>
        <button disabled={!agreed}>Continue</button> */}
      </section>
    </View>
  );
}


export default Aboutus;
