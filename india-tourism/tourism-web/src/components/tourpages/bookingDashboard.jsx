import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingdashboard.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons'
import { useEffect, useState, useContext} from "react";
import { styled } from '@mui/material/styles';
import {createIntent} from "../admin/admin";
import SideBarNotification from '../navigationTabs/sideBarNotification';
import close_button from '../Assets/images/close-button.png';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import success_animation from '../Assets/images/success_animation.gif';
import failure_animation from '../Assets/images/failure_animation.gif';
import {validateBookingData} from "../admin/utility";
import { performTripBooking } from "../admin/admin";
import CreateBooking from "../modal/createBooking"
import PaymentModal from "./payment";
import PaymentQRCodeGenerator from "../modal/generateQRcodeForUPI";
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
    OutlinedInput,
    Typography,
    CardMedia,
    CardContent,
    FormGroup,
    FormControl,  
    Input,
    Switch,
    Select,
    InputLabel,
    TextareaAutosize,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
  } from "@mui/material";
import { NavContext } from '../navigationContext/navigationContext';
import { loadStripe } from '@stripe/stripe-js';
import DynamicTable from '../Utilities/DynamicTable';

const BookingDashboard = ({access_token,tourDetails,triggerDisplayBookings,
    triggerDisplayOptionsByCatId,
    triggerEditBookingForm}) =>{

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
   
const { notification,loading, setLoading} = useContext(NavContext);
 const [openBookingForm, setOpenBookingForm] = useState(true);   
 const[displayErrorDialog,setDisplayErrorDialog] = useState(false);
  const[totalpackageCost,setTotalpackageCost] = useState(null);
   const[bookingId, setBookingId] = useState(null);
 const[errorMessage,setErrorMessage] = useState(null);    
 const [dialogOpen, setDialogOpen] = useState(false);
const [clientSecret, setClientSecret] = useState(null);
 const[bookingData,setBookingData] = useState([]);
 const [advanceBooking,setAdvanceBooking] = useState(false);
 const [fullBooking,setFullBooking] = useState(false);
  const [advanceBookingDialog,setAdvanceBookingDialog] = useState(false);
 const [fullBookingDialog,setFullBookingDialog] = useState(false);
 const[modalContent,setModalContent] = useState({ title: '', message: '' })
  const[isModalOpen,setIsModalOpen] = useState(false)
 const [qrCodeModalOpen,setQrCodeModalOpen] = useState(false);
const columns = [
          { field: 'name', headerName: 'Name' },
          { field: 'mobile', headerName: 'Mobile' },
          { field: 'email', headerName: 'Email' },
          { field: 'ageGroup', headerName: 'AgeGroup' },
          { field: 'gender', headerName: 'Gender' }
  ];
//This method is called from the booking modal for updating the booking details
  const prepareBookingData = (data) =>{
    console.log('Here in prepareBookingData...',data)
    const updatedBookingItem = [...bookingData,data];
    setBookingData(updatedBookingItem);
    if(bookingData)
    {
        console.log('bookingData...',bookingData);

    }
 }
   //Validate the booking data
      const validateFields= async() =>{
         let errMsg = null;
         
                   console.log('booking to be validated....',bookingData)
                errMsg =  await validateBookingData(bookingData);
                if(errMsg)
                  {
                    return errMsg;
                  }else{
                    return null;
                  }            
      }

  //Submit the booking
    const submitBookings = async(paymentMode) =>{
        
      console.log('tour details....',tourDetails)
          //validate booking fields before submission 
         let errMsg =  await validateFields();
         //Display error message if there is any missing or error fields
          if(errMsg)
          {
            setErrorMessage(errMsg);
            setDisplayErrorDialog(true)
            setDialogOpen(true);
            
          }else{
            // triggerDisplayBookings(bookingData,
            //             tourDetails);
            saveBooking(bookingData,paymentMode);
          }
    }



    //Save bookings
    const saveBooking = async(bookings,paymentMode)=>{
        let primary_booking = [];
        let dependantbookings = [];
        let primarycount = 0;
        let depcount = 0;
                  for(let booking of bookings)
                  {
              //Add as primary booking if tourist is Adult or Senior citizen
                      if(booking.ageGroup !== 'Minor')
                      {
                          primary_booking[primarycount] = booking;
                          primarycount++;
                      }
                      else
                      {
                          dependantbookings[depcount] = booking;
                          depcount++;
                      }
                      
                  }
                 console.log('paymentMode in savebooking...',paymentMode)
                 let totalpackageAmount = 0;
                  if(paymentMode === 'ADV')
                  {
                     totalpackageAmount = (Number(tourDetails.package_cost)*(bookings.length))*0.40;
                  }
                  else if(paymentMode === 'FULL'){
                     totalpackageAmount = (Number(tourDetails.package_cost)*(bookings.length));
                  }
                  console.log('Total package cost...',totalpackageAmount);
                  setTotalpackageCost(totalpackageAmount);
                       
                  if(!bookingId)
                  {
                      let data = {tourManagerId:tourDetails.tourManagerId,
                              locationName:tourDetails.locationName,
                              startDate:tourDetails.startDate,
                              endDate:tourDetails.endDate,
                              domesticOrInternational:tourDetails.domesticOrInternational,
                              package_cost:totalpackageAmount,
                              tourid: tourDetails.tourid,
                              primarybookings:primary_booking,
                              dependantbookings:dependantbookings,
                          }

                    setLoading(true);
                    console.log('data....',data);
                    let result = await performTripBooking(data);
                    if(result){
                        console.log('result...',result);
                        setLoading(false);
                        setDialogOpen(true);
                        setErrorMessage(null);
                        setBookingId(result.bookingid);
                    }
                  }       
    }
    //Opens or close the dialog box for error message validations
   const handleClickOpenOrClose = () => {
      setDialogOpen(!dialogOpen);
        if(!dialogOpen)
        {
           setDisplayErrorDialog(false);
        }
    };
//Opt for advance payment/full payment submission
    const confirmSubmitMode = (paymentMode) =>{
      console.log('payment mode....',paymentMode);
      if( paymentMode === 'ADV')
      {
        setErrorMessage('You will be charged 40% of your booking fees online to book a spot in the tour group. You can pay the balance amaount later or directly to the operator');
        setFullBookingDialog(false); 
       handleClickOpenOrClose();
        setAdvanceBookingDialog(true);
      }
      else if( paymentMode === 'FULL')
      {
        setErrorMessage('Pay the complete booking amount and confirm your spot');
        setAdvanceBookingDialog(false);
        handleClickOpenOrClose();
        setFullBookingDialog(true)
      }
    }
//Opt for advance payment mode or full payment mode
    const confirmPaymentMode = (paymentMode) =>{
      

      if(paymentMode === 'ADV')
      {
        console.log('paymentmode....',paymentMode)
          setAdvanceBooking(true)
          setAdvanceBookingDialog(false)
          
            submitBookings(paymentMode);
          
      }
      else if(paymentMode === 'FULL')
      {
        console.log('paymentmode....',paymentMode)
        setFullBooking(true)
        setFullBookingDialog(false)
       
         submitBookings(paymentMode);
      }
    }

    const handlePayment = (title, message) => {
        console.log('Payment started...')
      handleClickOpenOrClose();
      console.log('dialogOpen...',dialogOpen)
      setModalContent({ title, message });
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const switchToQRcodeModal = () =>{
    setQrCodeModalOpen(true)
    setIsModalOpen(false)
  }

  const switchToCardPaymentModal = () =>{
      setQrCodeModalOpen(false)
    setIsModalOpen(true)
  }

    //Change the date to words
            function changeDateToWords(dateObject)
                {
                    const date = new Date(dateObject);
                    console.log('date....',date)
                    console.log('formatted date...', date.toLocaleDateString('en-GB')); // Or 'en-GB' for a different locale
                    return date.toLocaleDateString('en-GB');
                }

      useEffect(()=>{
          let mounted = true;

                  const timer = setTimeout(() =>{
                  //get client secret from stripe for payment    
                      const getClientSecret = async () =>{
                        console.log('totalPackageCost....',totalpackageCost);
                      let data =  {amount: Number(totalpackageCost), currency: 'inr'};
                      const responsedata = await createIntent(data);
                  
                  if(responsedata){
                    console.log('client secret received ....',responsedata.clientSecret)
                    //set client secret in state variable
                      setClientSecret(responsedata.clientSecret);
                }
                };
                
                
                if(!clientSecret && mounted && Number(totalpackageCost)>0)
                {
                    console.log('totalpackageCost.....',totalpackageCost)
                  console.log('Fetching client secret for stripe payment');
                  getClientSecret();
                }

  },100);
   return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };
    },[bookingId]);

    


  return(
        <div className='navbar-grid'>
            <div className = "center-container">
              <div className='booking-header-container'>
               <div className="left-section">
      <h2 className="section-title">{tourDetails.tourManagerName}
      <Typography>Book your trip to {tourDetails.locationName} from {changeDateToWords(tourDetails.startDate)} - {changeDateToWords(tourDetails.endDate)}</Typography>
      </h2>
       </div>
       <div className="right-section">
        <button className="right-button" onClick={()=>setOpenBookingForm(true)}>
          Add new Tourist
        </button>
      </div>
   </div>
                    <div className="original-content">
                       <div  className='div-dashboard-container'>
          {/* <Typography variant="body2" style={{ color: '#FFFFFF' }}>{bookingPageMessage}</Typography> */}
         <Paper className='bookingDashboard-Paper'>
            {
      loading?
                      (
                      <div>
                      <Box
                         sx={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           minHeight: '100vh', // Optional: Centers vertically within the viewport
                         }}
                       >
                         <CircularProgress/>
                        </Box>
                        </div>) :<div/>
      }

      {
        (advanceBookingDialog || fullBookingDialog) ?
        <Dialog
        open={dialogOpen}
        onClose={handleClickOpenOrClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Confirmation</DialogTitle>
        <DialogContent>
           
          <DialogContentText id="dialog-description">
          
          {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpenOrClose}>Cancel</Button>
          {advanceBookingDialog && !fullBookingDialog ? 
          <Button onClick={()=>{confirmPaymentMode('ADV')}} autoFocus>
           Confirm
          </Button>:fullBookingDialog && !advanceBookingDialog?
          <Button onClick={()=>{confirmPaymentMode('FULL')}} autoFocus>
           Confirm
          </Button>:<div/>
          }
          {dialogOpen?
          <img src={success_animation} alt="" width="40" height="40"/>:
          <div></div>}
        </DialogActions>
      </Dialog>:<div/>
      }
      {
          bookingData && bookingData.length >0 ?
           (
              <DynamicTable columns={columns} data={bookingData} setData={setBookingData}/>  
             
       ):<div/>
          }</Paper></div> 
         
           {
           displayErrorDialog?
        <Dialog
        open={dialogOpen}
        onClose={handleClickOpenOrClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Error Message</DialogTitle>
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
      </Dialog>:<div/>
      }
         {
                          dialogOpen && !displayErrorDialog && bookingId?
                           <Dialog
              open={dialogOpen}
              onClose={handleClickOpenOrClose}
              aria-labelledby="dialog-title"
              aria-describedby="dialog-description"
            >
              <DialogTitle id="dialog-title">{tourDetails.tourManagerName} Confirmation</DialogTitle>
              <DialogContent>
                    {
                    bookingId?
                <DialogContentText id="dialog-description">
                
                 Bingo !! Your booking has been allocated with bookingId {bookingId}. 
                 Proceed to complete your payment
                </DialogContentText>:
                <DialogContentText id="dialog-description">
                   Your trip booking failed. Try again.
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
            </Dialog>:<div></div>
            }
      
           
{
    openBookingForm ? 

   
    <CreateBooking isOpen={openBookingForm} onClose={() => setOpenBookingForm(false)}
    prepareBookingData = {prepareBookingData} bookingData={bookingData}
    />
        
        :<div/>
}
 {
          bookingData && bookingData.length >0 ?
<div className="button-container-2">

          <div className='submit-container'>
            <button type="submit" onClick={()=>{
                        triggerDisplayOptionsByCatId(tourDetails.categoryId)}}
                          class="button"
                        >Go Back</button>

                <button type="submit" 
                       class="button" onClick={()=>{confirmSubmitMode('ADV')}}>Make Advance Payment</button>

            <button type="submit" 
                       class="button" onClick={()=>{confirmSubmitMode('FULL')}}>Confirm your booking</button>
               
        </div>
        
        </div>:<div/>
    }


     {stripePromise && totalpackageCost>0 && clientSecret  ?
          <Elements stripe={stripePromise} 
          options={{clientSecret:clientSecret}}>
          <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message} 
        totalpackagecost={totalpackageCost}
        tourManagerName = {tourDetails.tourManagerName}
        location={tourDetails.locationName}
        onswitch = {switchToQRcodeModal} clientSecret={clientSecret}


        />
      </Elements>:<div/>
      }
        {qrCodeModalOpen && !isModalOpen ?
   
      <PaymentQRCodeGenerator isOpen={qrCodeModalOpen} onClose={() => setQrCodeModalOpen(false)} 
      amount={totalpackageCost}  tourManagerName = {tourDetails.tourManagerName}
        location={tourDetails.locationName}
      onswitch={switchToCardPaymentModal}
      />:<div/>
        }

        </div>
          </div>
             </div>
  )}
export default BookingDashboard