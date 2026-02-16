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
import { confirmStripePayment,retrievePaymentIntent } from "../admin/admin";
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

  
  const PaymentModal = ({ isOpen, onClose, title, message,totalpackagecost,paymentmode,onswitch,
    clientSecret,tourManagerName,location,bookingid,paymentIntentId}) => {
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
 // const [clientSecret, setClientSecret] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const[isPaymentWindowOpen, setIsPaymentWindowOpen] = useState(true)
   const closeCardPayment =()=>{
    console.log('call reached me...')
     isOpen = false;
     setIsPaymentWindowOpen(false);
   }

   
   //Submits the payment  data to server backend
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
    console.log('window location path....',window.location.origin);
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // Return URL where the user is redirected after the payment
        return_url: window.location.origin,
      },
      // Set 'redirect' to 'if_required' to handle the result synchronously
    // in the same view if possible, or redirect if needed.
    redirect: 'if_required'
    });
if(result)
{
    if(result.error){
         // This point will only be reached if an error (such as a card error)
    // occurs when confirming the payment.
        setErrorMessage(result.error.message);
       setIsModalOpen(false); // Ensure modal is closed on error
    }else {
          // This point is reached when a synchronous payment succeeds (no redirect required).
          // You can now open your success modal.
          // The payment has been processed. The PaymentIntent ID is available here.
          console.log('payment intent id...',result.paymentIntent)
          let paymentIntentId = result.paymentIntent.id;
          console.log('Payment Intent ID:', paymentIntentId);
          let data = {paymentIntentId:paymentIntentId};
          let response = await retrievePaymentIntent(data);

            if(response)
              {
                console.log('result fom payment intent retrieve....',response);
                if(response.paymentstatus === 'succeeded'){
                const amount = response.amount; // The total amount of the PaymentIntent
                const last4carddigits = response.last4carddigits; 
                const brand = response.brand;
                console.log('amount,last4carddigits,brand....',amount,last4carddigits,brand)
                let data = {bookingid:bookingid,last4carddigits:last4carddigits,paidamount:amount,
                  paymentmode:paymentmode,paymentIntentId:paymentIntentId,brand:brand};
                
                  let result = await confirmStripePayment(data);
                
              if(result){
                setErrorMessage(null);
                setIsModalOpen(true);
              }
            }
      }else {
        console.log('error....',response.error)
      }
    }
  }
}
}

    if (!isOpen) return null;

 return (
  isPaymentWindowOpen?
  ReactDOM.createPortal(
  
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
     
      <div>
        <Typography variant="body2" color="text.secondary">
          Pay Rs.{totalpackagecost} to {tourManagerName} for your trip to {location}
        </Typography>
      </div>
          
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
   
        <PaymentSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        closeCardPayment = {closeCardPayment} 
        />
    }
   </form>
      </div> 
       </div>
    
      ,
    document.getElementById('modal-root') // This element must exist in your index.html
  ):<div/>)
};

export default PaymentModal;