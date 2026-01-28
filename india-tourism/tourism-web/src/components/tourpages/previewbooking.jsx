import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import { useEffect, useState, useContext } from "react";

import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { performTripBooking,updateBookingsByBookingId } from "../admin/admin";
import success_animation from '../Assets/images/success_animation.gif';
import failure_animation from '../Assets/images/failure_animation.gif';
import SideBarNotification from '../navigationTabs/sideBarNotification';
import { NavContext } from '../navigationContext/navigationContext';
import {validateBookingData} from "../admin/utility";
import PaymentModal from "./payment";
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
    OutlinedInput,
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
import { loadStripe } from '@stripe/stripe-js';

const PreviewForm = ({access_token,bookings,tourDetailsParam}) =>{

    const[disable,setDisable] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
     const[displayErrorDialog,setDisplayErrorDialog] = useState(false);
    const[bookingId, setBookingId] = useState('');
    const[bookingUpdateId, setBookingUpdateId] = useState('');
     const[errorMessage,setErrorMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

      const { notification} = useContext(NavContext);

      const[modalContent,setModalContent] = useState({ title: '', message: '' })
      const[isModalOpen,setIsModalOpen] = useState(false)

        const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

          const options = {
     mode: 'payment', // or 'setup'
  amount: 100,
  currency: 'usd',
  };
     //Used to close dialog box
    const handleClickOpenOrClose = () => {
        
        setDialogOpen(!dialogOpen);
        if(dialogOpen)
        {
            setBookingId('');
            setBookingUpdateId('');
            setDisable(true)
        }
    };

  
    console.log('bookings...',bookings)
    var sum = 0;

function increment () {
     sum += 1;
    return sum;
}
 const updateBooking = async(name,index,event) =>{
        bookings[index-1][name]= event.target.value;
        console.log('bookingdata....',bookings);
    }
const triggerEditable = () =>{
    setDisable(!disable);
}

const validateFields= async() =>{
       let errMsg = null;
       
                 console.log('booking to be validated....',bookings)
              errMsg =  await validateBookingData(bookings);
              if(errMsg)
                {
                  return errMsg;
                }else{
                  return null;
                }            
    }
//Submit bookings
const submitBooking = async()=>{
    let primary_booking = [];
    let dependantbookings = [];
    let primarycount = 0;
    let depcount = 0;
     let errMsg =  await validateFields();
          if(errMsg)
          {
            setErrorMessage(errMsg);
            setDisplayErrorDialog(true)
            setDialogOpen(true);
            
          }else{
           
              for(let booking of bookings)
              {
                  if(booking.ageGroup === 'Minor')
                  {
                      primary_booking[primarycount] = booking;
                      primarycount++;
                  }else
                  {
                      dependantbookings[depcount] = booking;
                      depcount++;
                  }
                  
              }
              if(!tourDetailsParam.bookingid)
              {
                  let data = {tourManagerId:tourDetailsParam.tourManagerId,
                          locationName:tourDetailsParam.locationName,
                          startDate:tourDetailsParam.startDate,
                          endDate:tourDetailsParam.endDate,
                          domesticOrInternational:tourDetailsParam.domesticOrInternational,
                          package_cost:(tourDetailsParam.package_cost)*(bookings.length),
                          tourid: tourDetailsParam.tourid,
                          primarybookings:primary_booking,
                          dependantbookings:dependantbookings,
                      }
                let result = await performTripBooking(data);
                if(result){
                    console.log('result...',result);
                    setBookingId(result.bookingid);
                }
              }else{
                    let data = {tourManagerId:tourDetailsParam.tourManagerId,
                          locationName:tourDetailsParam.locationName,
                          startDate:tourDetailsParam.startDate,
                          endDate:tourDetailsParam.endDate,
                          domesticOrInternational:tourDetailsParam.domesticOrInternational,
                          package_cost:(tourDetailsParam.package_cost)*(bookings.length),
                          tourid: tourDetailsParam.tourid,
                          primarybookings:primary_booking,
                          dependantbookings:dependantbookings,
                          bookingId:tourDetailsParam.bookingid
                      }
                      console.log('request data....',data);
                let result = await updateBookingsByBookingId(data);
                if(result)
                  {
                    console.log('result...',result);
                  //  setBookingId(result.bookingId);
                    setBookingUpdateId(result.bookingId);
                }

              }
  }  
}

const handlePayment = (title, message) => {
    handleClickOpenOrClose();
    setModalContent({ title, message });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect (() =>{
    if(bookingId != '')
    {
        handleClickOpenOrClose();
    }
    if(bookingUpdateId != '')
    {
        handleClickOpenOrClose();
    }
  },[bookingId,bookingUpdateId])

 if (!stripePromise) return null;

    return(
    
    <div className = "center-container">

        
      
            <div style={{border: "2px solid black" }}>
                 <Box  component="form" >
                    {dialogOpen && !errorMessage?
                     <Dialog
        open={dialogOpen}
        onClose={handleClickOpenOrClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{tourDetailsParam.tourManagerName} Confirmation</DialogTitle>
        <DialogContent>
              {!tourDetailsParam.bookingid?
          <DialogContentText id="dialog-description">
          
           Bingo !! Your booking has been allocated with bookingId {bookingId}. 
           Ensure to complete payment by next 48 hours else this booking will be deactivated
          </DialogContentText>:
          <DialogContentText id="dialog-description">
          
           Yaay !! Your bookingId {bookingId} has been updated. 
           Ensure to complete additional payment by next 48 hours.
           For adjustment/refund, kindly wait for 5 business days
          </DialogContentText>
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpenOrClose}>Cancel</Button>
          <Button onClick={()=>handlePayment('SUCCESS','SUCCESS')} >
            Proceed to Payment
          </Button>
          {dialogOpen?
          <img src={success_animation} alt="" width="40" height="40"/>:<div></div>}
        </DialogActions>
      </Dialog>:<div></div>}

      {displayErrorDialog && errorMessage?
            <Dialog
            open={dialogOpen}
            onClose={handleClickOpenOrClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">Error</DialogTitle>
            <DialogContent>
              
              <DialogContentText id="dialog-description">
              
              {errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickOpenOrClose}>Cancel</Button>
              <Button onClick={handleClickOpenOrClose} autoFocus>
              OK
              </Button>
              {dialogOpen?
              <img src={failure_animation} alt="" width="40" height="40"/>:
              <div></div>}
            </DialogActions>
          </Dialog>:<div></div>
      }
                              <TableContainer>
                                <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>
                                    {!tourDetailsParam.bookingid?
                                        <Typography variant="h5" style={{ color: 'hsla(0, 32%, 92%, 1.00)' }}>
                                            Booking details for {tourDetailsParam.locationName} tour by {tourDetailsParam.tourManagerName}
                                        </Typography>:
                                        <Typography variant="h5" style={{ color: 'hsla(0, 32%, 92%, 1.00)' }}>
                                            Booking ID {tourDetailsParam.bookingid} updates for  {tourDetailsParam.locationName} tour by {tourDetailsParam.tourManagerName}
                                        </Typography>
                                    }
                                        </TableCell>
                                        <TableCell>
                                         <button type="button" onClick={()=>{
                        triggerEditable()}}
                       class="button" 
                        >Edit </button>

                                        </TableCell>
                                        </TableRow>
                                        </TableBody>
                                        </Table>
                                        </TableContainer>
                                         </Box>
                            <Paper sx={{ 
          backgroundImage: "url('/background/booking.png')",
          backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', // Optional: adjusts the image size to cover the entire Paper
        padding: 2, // theme.spacing(2)
          textAlign: 'center', // Centers the text itself horizontally
          display: 'flex',
          flexDirection: 'column', // Ensures children stack vertically
          justifyContent: 'center', // Centers children vertically
          alignItems: 'center', // Centers children horizontally
          height: '100%',
          width: '100%', // Example width for demonstration 
          }}>
                   {bookings && bookings.length>0 ?
                        bookings.map((booking)=>(
                           
                                  <div className="head"
                                                style={{
                                                    width: "fit-content",
                                                    margin: "auto",
                                                   border: "2px solid black"
                                                }}>
                                                
                                                <h2
                                                    style={{
                                                        color: "solid white"
                                                    }}
                                                >
                                            Tourist #{increment()}
                                                </h2>
                                                <TableContainer>
                                                <Table>
                                                    <TableBody>
                                                      <TableRow>
                                                        <TableCell>
                                                <FormControl variant="outlined" fullWidth>
                                             
                                                <InputLabel variant="outlined" 
                                                style={{ color: '#080000ff' }}
                                                fullWidth>Name</InputLabel>
                                                <OutlinedInput id="name" name="name" defaultValue = {booking.name} 
                                                disabled={disable} 
                                                onChange={(event)=>updateBooking("name",sum,event)}
                                               inputProps={{
                                                  maxLength: 10,
                                                }}
                                                 sx={{
                                                    backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                                                  borderRadius: 50, // Fully rounded (pill shape)
                                                  width: '500px',
                                                  }}
                                                />
                                                 </FormControl>
                                                 </TableCell>
                                                 </TableRow>
                                                 <TableRow>
                                                  <TableCell>
                                                  <FormControl variant="outlined" fullWidth>
                                                    
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Email</InputLabel>
                                                <OutlinedInput id="email" name="email" 
                                                defaultValue = {booking.email} 
                                                value={booking.email}
                                                inputProps={{
                                                        maxLength: 50,
                                                    }} 
                                                     sx={{
                                                    backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                                                  borderRadius: 50, // Fully rounded (pill shape)
                                                  width: '500px',
                                                  }}
                                                disabled={disable} 
                                                onChange={(event)=>updateBooking("email",sum,event)}/>
                                                </FormControl>
                                                </TableCell>
                                                   </TableRow> 
                                                    <TableRow>
                                                  <TableCell> 
                                                   <FormControl variant="outlined" fullWidth>
                                                   
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Mobile</InputLabel>
                                                <OutlinedInput id="mobile" name="mobile" defaultValue = {booking.mobile} 
                                                 value={booking.mobile}
                                                disabled={disable} 
                                                inputProps={{
                                                    maxLength: 10,
                                                    }}
                                                     sx={{
                                                    backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                                                  borderRadius: 50, // Fully rounded (pill shape)
                                                  width: '500px',
                                                  }}
                                                onChange={(event)=>updateBooking("mobile",sum,event)}/>
                                                    </FormControl>
                                                    </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                  <TableCell>
                                                    <FormControl variant="outlined" fullWidth> 
                                                      
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Age Group</InputLabel>
                                                 <OutlinedInput id="ageGroup" name="ageGroup" 
                                                 defaultValue = {booking.ageGroup} 
                                                 value={booking.ageGroup}
                                                 disabled={disable}  
                                                 inputProps={{maxLength: 20}}
                                                sx={{
                                                    backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                                                  borderRadius: 50, // Fully rounded (pill shape)
                                                  width: '500px',
                                                  }}
                                                 onChange={(event)=>updateBooking("ageGroup",sum,event)}/>  
                                                </FormControl>
                                                </TableCell>
                                                </TableRow>
                                                 <TableRow>
                                                  <TableCell>
                                                 <FormControl variant="outlined" fullWidth> 
                                                      
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Gender</InputLabel>
                                                 <Input id="gender" name="gender" 
                                                 defaultValue = {booking.gender} 
                                                 value={booking.gender}
                                                 disabled={disable}  
                                                 inputProps={{maxLength: 10}}
                                                  sx={{
                                                    backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                                                  borderRadius: 50, // Fully rounded (pill shape)
                                                  width: '500px',
                                                  }}
                                                 onChange={(event)=>updateBooking("gender",sum,event)}/>  
                                                </FormControl>
                                                 </TableCell>
                                                </TableRow>
                                                </TableBody>
                                                </Table>
                                                </TableContainer>
                                              </div>
                           
                            )
                        ):<div></div>
                   }
                    </Paper>
                   
                   <div className="button-container">
         <div className='submit-container'>
                    <button type="submit" 
                        class="button"
                        >Go Back</button>
           <button type="submit" 
                       class="button" onClick={submitBooking}>Confirm Booking</button>
                       
        </div>
      </div>
        {notification ?
                     <div style={{position: 'fixed', top:70,right:0}} >    
                     <SideBarNotification/> 
                  </div> 
                  :<div></div>
                   }
        {stripePromise ?
          <Elements stripe={stripePromise} options={options}>
          <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message} 
        />
      </Elements>:<div/>
      }
      </div>
    </div>)
}

export default PreviewForm;