import React from "react";
import ReactDOM from 'react-dom';
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import { useEffect, useState, useContext } from "react";
import PaymentSuccessModal from "../modal/paymentSuccessModal";
import PaymentQRCodeGenerator from "../modal/generateQRcodeForUPI"
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

  
  const PaymentModal = ({ isOpen, onClose, title, message,totalpackagecost,onswitch }) => {
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
  
   const closeCardPayment =()=>{
     isOpen = false;
   }

   useEffect(()=>{
    let mounted = true;

            const timer = setTimeout(() =>{
            //get client secret from stripe for payment    
         const getClientSecret = async () =>{
          console.log('totalPackageCost....',totalpackagecost);
        let data =  {amount: Number(totalpackagecost), currency: 'inr'};
        const responsedata = await createIntent(data);
    
    if(responsedata){
      console.log('client secret received ....',responsedata.clientSecret)
       //set client secret in state variable
        setClientSecret(responsedata.clientSecret);
   }
  };

  if(!clientSecret && mounted)
  {
    console.log('here i am');
     getClientSecret();
  }

  },100);
   return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };
    },[]);

    const handleSubmit = async (event) => {
    event.preventDefault();
    const submitterName = event.nativeEvent.submitter.name; 

    if (submitterName === 'tryothermethod') {
    
      onswitch();
     
    }
    else if(submitterName === 'cardsubmit'){


   if (!stripe || !elements || !clientSecret) {
      return;
    }
     // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) return;
    
    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // Return URL where the user is redirected after the payment
        return_url: `${window.location.origin}/order-complete`,
      },
      // Set 'redirect' to 'if_required' to handle the result synchronously
    // in the same view if possible, or redirect if needed.
    redirect: 'if_required'
    });

    if(error){
         // This point will only be reached if an error (such as a card error)
    // occurs when confirming the payment.
        setErrorMessage(error.message);
       setIsModalOpen(false); // Ensure modal is closed on error
    }else {
          // This point is reached when a synchronous payment succeeds (no redirect required).
          // You can now open your success modal.
          setErrorMessage(null);
          setIsModalOpen(true);
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
      height: '100%',
      overflowY: 'scroll',
      zIndex: 1000 // Ensure it's on top of other content
    }}>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
     
          
        <PaymentElement />
      {/* The button container for alignment */}
       <div className="button-container">
         <div className='submit-container'>
       <button type="submit" disabled={!stripe} name="cardsubmit" class="button"
       value="cardsubmit" >Make Payment</button>  
       </div>
        <div className='submit-container'>
       <button type="submit" disabled={!stripe} name="tryothermethod" class="button"
       value="tryothermethod">Try other method</button>  
       </div>
        <div className='submit-container'>
       <button  disabled={!stripe} name="close" class="button" onClick={onClose}>Close</button>  
       </div>
       </div>  
       {/*Uncomment for live testing */}
        {errorMessage && <div>{errorMessage}</div>} 

  {/*Uncomment for live testing */}
    {isModalOpen && 
   
    <PaymentSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    }

  

       </form>
      </div> 
       </div>
    
      ,
    document.getElementById('modal-root') // This element must exist in your index.html
  ));
};

export default PaymentModal;