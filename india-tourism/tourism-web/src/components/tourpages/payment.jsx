import React from "react";
import ReactDOM from 'react-dom';
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import { useEffect, useState, useContext } from "react";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getApiAccessToken,createIntent } from "../admin/admin";
import success_animation from '../Assets/images/success_animation.gif';
import SideBarNotification from '../navigationTabs/sideBarNotification';
import { NavContext } from '../navigationContext/navigationContext';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Modal,
    Box,
    Snackbar,
    Card,
    Grid,
    Typography,
    CardMedia,
    CardContent,
    FormGroup,
    FormControl,  
    Input,
    Switch,
    InputLabel,
    TextareaAutosize,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
  } from "@mui/material";

  
  const PaymentModal = ({ isOpen, onClose, title, message }) => {
    // Define appearance options for the PaymentElement
  const appearance = {
    theme: 'stripe', // 'stripe' (default), 'flat', or 'none'
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#450ddd',
      colorText: '#30313d',
      colorDanger: '#bf4d2a',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '4px',
    }};
    // You can also add rules for different states (e.g., 'invalid')
      
   const stripe = useStripe();
  const elements = useElements();
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState(null);



    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
     // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) return;
    
    let csrfToken = await getApiAccessToken();


    if(csrfToken)
    {
      console.log('csrftoken...',csrfToken.data)
     // 1. Create the PaymentIntent on your server
    const client_secret = await createIntent(csrfToken.data);
    
    if(client_secret){
        // let client_secret = await res.json();
        // 2. Confirm the payment
        const elements = stripe.elements({ clientSecret: client_secret });
                const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'https://example.com/order/123/complete',
                },
                });
              
                if (error) console.log(error.message);
          }
  }
}

    if (!isOpen) return null;

 return (ReactDOM.createPortal(
  
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(139, 33, 33, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000 // Ensure it's on top of other content
    }}>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
     
          
        <PaymentElement />
      {/* The button container for alignment */}
       <div className="button-container">
         <div className='submit-container'>
       <button type="submit" disabled={!stripe}>Make Payment</button>  
       </div>
       </div>  
       </form>
      </div> 
       </div>
      ,
    document.getElementById('modal-root') // This element must exist in your index.html
  ));
};

export default PaymentModal;