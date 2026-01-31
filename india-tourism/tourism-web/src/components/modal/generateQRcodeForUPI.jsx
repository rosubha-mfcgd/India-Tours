import React, { useState, useEffect } from 'react';
// Import the UPI QR library
import { UPIQR } from '@adityavijay21/upiqr';


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
    CircularProgress
  } from "@mui/material";

const PaymentQRCodeGenerator = ({ isOpen, onClose, amount, closeCardPayment }) => {
  
  const [qrCode, setQrCode] = useState('');
    // Define payment details
  const upiDetails = {
    upiId: 'shop@ybl', // Your UPI ID
    name: 'My Awesome Shop', // Your name or business name
    amount: amount, // Optional: fixed amount
    transactionNote: 'Payment for tour booking', // Optional: note
  };

  useEffect(()=>{
    async function generateQRCode()
    {
        try{
            // Generate the QR code as a data URL (PNG)
        const { qr } = await new UPIQR()
          .set(upiDetails)
          .generate();
        setQrCode(qr);
        }catch(err){
            console.log("Error using QR code :-",err);
        }
    }
    if(!qrCode)
    {
        generateQRCode();
        closeCardPayment();
    }
  });

  if (!qrCode) {
    return <div>Loading QR Code...</div>;
  }
  if (!isOpen) return null;
  return (
   
      <div className="modal-content">
        <h2>Scan to Pay via UPI</h2>
        <p>Thank you for your purchase.</p>
          <Card className="card"
                     >
                    
                    <CardMedia component= "img"  height="100"
                    image = {qrCode} alt="shop@ybl" 
                    />
                                     
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" 
                        sx={{whiteSpace: 'pre-wrap'}}>
                        Scan the QR code to complete your payment
                        </Typography>
                        </CardContent>
                        </Card>
                         <div className="button-container">
                         <div className='submit-container'>
        <button onClick={onClose} class="button">Close</button>
        </div>
        </div>
      </div>
    
  );
};

export default PaymentQRCodeGenerator;