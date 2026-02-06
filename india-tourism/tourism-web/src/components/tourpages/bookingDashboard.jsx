import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingdashboard.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons'
import { useEffect, useState, useContext} from "react";
import { styled } from '@mui/material/styles';
import {getBookingsByBookingId} from "../admin/admin";
import SideBarNotification from '../navigationTabs/sideBarNotification';
import close_button from '../Assets/images/close-button.png';
import failure_animation from '../Assets/images/failure_animation.gif';
import {validateBookingData} from "../admin/utility";
import CreateBooking from "../modal/createBooking"
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
  } from "@mui/material";

import MenuItem from '@mui/material/MenuItem';
import DynamicTable from '../Utilities/DynamicTable';
 import { NavContext } from '../navigationContext/navigationContext';
const BookingDashboard = ({access_token,tourDetails,triggerDisplayBookings,
    triggerDisplayOptionsByCatId,
    triggerEditBookingForm}) =>{

 const [openBookingForm, setOpenBookingForm] = useState(true);   
 const[displayErrorDialog,setDisplayErrorDialog] = useState(false);
 const[errorMessage,setErrorMessage] = useState('');    
 const [dialogOpen, setDialogOpen] = useState(false);
 //const {bookingData} = useContext(NavContext);
 const[bookingData,setBookingData] = useState([]);
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
 
 const columns = [
          { field: 'name', headerName: 'Name' },
          { field: 'mobile', headerName: 'Mobile' },
          { field: 'email', headerName: 'Email' },
          { field: 'ageGroup', headerName: 'AgeGroup' },
          { field: 'gender', headerName: 'Gender' }
  ];


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
    const submitBookings = async() =>{
        
          //validate booking fields before submission 
         let errMsg =  await validateFields();
         //Display error message if there is any missing or error fields
          if(errMsg)
          {
            setErrorMessage(errMsg);
            setDisplayErrorDialog(true)
            setDialogOpen(true);
            
          }else{
            triggerDisplayBookings(bookingData,
                        tourDetails);
          }
    }

    
    //Opens or close the dialog box for error message validations
   const handleClickOpenOrClose = () => {
        
        setDialogOpen(!dialogOpen);
        if(!dialogOpen)
        {
           // setBookingId('');
            //setBookingUpdateId('');
            //setDisable(true)
             setDisplayErrorDialog(false);
         // setDialogOpen(false);
        }
    };
  return(
        <div className='navbar-grid'>
            <div className = "center-container">
              
                    <div className="original-content">
                       <div  display="flex" 
      justifyContent="center"
      alignItems="center"
      // Example height for visualization
      width="100%">
          {/* <Typography variant="body2" style={{ color: '#FFFFFF' }}>{bookingPageMessage}</Typography> */}
         <Paper className='bookingDashboard-Paper'>
          {
          bookingData && bookingData.length >0 ?
           (
              <DynamicTable columns={columns} data={bookingData} setData={setBookingData}/>  
             
       ):<div/>
          }</Paper></div> 
           {displayErrorDialog?
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
      </Dialog>:<div></div>}
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
        <button onClick={()=>setOpenBookingForm(true)} class="button">Add Tourist</button>
       
                    

                    <button type="submit" 
                       class="button" onClick={submitBookings}>Submit your Booking</button>
               
        </div>
        
        </div>:<div/>
    }

                    </div>
                    </div>
                    </div>
  )}
export default BookingDashboard