import  { useState, useEffect } from 'react';
// Import the UPI QR library
import QRCode from 'react-qr-code';
import '../../styles/bookingForm.css';

import {
     Card,
    Grid,
    Typography,
    CardMedia,
    CardContent
  } from "@mui/material";

const CreateBooking = ({ isOpen, onClose, amount, onswitch }) => {
  
  //const [qrCode, setQrCode] = useState('');
  let upiId = 'shop@ybl';
  let name = 'Tourism Payment';
    // Define payment details
  const upiDetails = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
  
  // useEffect(()=>{
  //   async function generateQRCode()
  //   {
  //       try{
  //           // Generate the QR code as a data URL (PNG)
  //       const { qr } = await new UPIQR()
  //         .set(upiDetails)
  //         .generate();
  //       setQrCode(qr);
  //       }catch(err){
  //           console.log("Error using QR code :-",err);
  //       }
  //   }
  //   if(!qrCode)
  //   {
  //       generateQRCode();
  //    }
  // });

  // if (!qrCode) {
  //   return <div>Loading QR Code...</div>;
  // }
  if (!isOpen) return null;
  return (
    <div className="bookingDivContainer-modal">
   <div className="modal">
      <div className="modal-content">
        <h2>Scan to Pay via UPI</h2>
        <p>Thank you for your purchase.</p>
          <Card className="card"
                     >
                    
                    {/* <CardMedia component= "img"  height="100"
                    image = {qrCode} alt="shop@ybl" 
                    /> */}
                     <QRCode value={upiDetails} size={256} />
                                     
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
         <div className='submit-container'>
        <button onClick={onswitch} class="button">Try other method</button>
        
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateBooking;