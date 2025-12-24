import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons.jsx'
import { useEffect, useState, useContext} from "react";
import { styled } from '@mui/material/styles';
import {getBookingsByBookingId} from "../admin/admin";
import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
import close_button from '../Assets/images/close-button.png';
import failure_animation from '../Assets/images/failure_animation.gif';
import { NavContext } from '../navigationContext/navigationContext.jsx';
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


const CustomBookingForm = ({access_token,tourDetails,triggerDisplayBookings}) =>{
    console.log('tourdetails.....',tourDetails);
    const [startBooking,setStartBooking] = useState(false);
    const [touristCount, setTouristCount] = useState(0);
    const[openBookingForm,setOpenBookingForm] = useState(true);
    const [noOfTourist,setNoOfTourist] = useState(0);
    const [bookingPageMessage,setBookingPageMessage] = useState('');
    const [bookingid,setBookingid] = useState('');
     const [bookingData,setBookingData] = useState('');
     const[currentBooking,setCurrentBooking] = useState('');
     const[displayErrorDialog,setDisplayErrorDialog] = useState(false);
     const[errorMessage,setErrorMessage] = useState('');
         const [dialogOpen, setDialogOpen] = useState(false);
         const[showBookingBtn,setShowBookingBtn] = useState(true);
  const { notification} = useContext(NavContext);
    const CssTextField = styled(TextField)({
      '& label': {
        color: '#FFFF', // Default label color
       }  
  });

   const initBooking = async() =>{
      setBookingPageMessage(process.env.REACT_APP_BOOKING_PAGE_MESSAGE);
        setStartBooking(true);
        setShowBookingBtn(false);
        createForms(0);
    }


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

    const showCurrentBookings = async(event) =>{
      let bookingid = event.target.value;
      console.log('booking id is ',bookingid);
      if(bookingid){
      setBookingid(bookingid);
      tourDetails.bookingid = bookingid;
      setNoOfTourist(0);
        let data = {"tourManagerId":tourDetails.tourManagerId,
            "startDate":tourDetails.startDate,
            "endDate":tourDetails.endDate,
            "bookingId":bookingid,
            "locationName":tourDetails.locationName,
            "domesticOrInternational":tourDetails.domesticOrInternational
        }
        let existingBookings = await getBookingsByBookingId(data);
        if(existingBookings &&  !existingBookings.errormessage)
        {
          console.log("existingBookings....",existingBookings)
          console.log("primarybookings length....",existingBookings.primarybookings.length)
          console.log("dependantbookings length....",existingBookings.dependantbookings.length)
          setCurrentBooking(existingBookings);
         let existingBookingsCount = existingBookings.primarybookings.length+
                  existingBookings.dependantbookings.length;
         let totalTourists = noOfTourist+existingBookingsCount;
         setNoOfTourist(totalTourists);
         }
         else{
          setErrorMessage('Booking id '+bookingid+' was not found in our system');
          setDisplayErrorDialog(true);
          setDialogOpen(true);
         }
      }
    }

    const createForms = async(noOfTourists) =>
    {
          let result = [];
          console.log('value is....',noOfTourists)
          if(parseInt(noOfTourists)>0)
          {
            setOpenBookingForm(true);
          }
          if(openBookingForm)
          {
            if(!currentBooking)
            {
              for(let count=result.length;count<parseInt(noOfTourists);count++)
              {
                  let data = {"key":(count+1),"value":(count+1)}

                  result.push(data);
              }
          }
        else{
            let count = result.length;
            for(let primarybooking of currentBooking.primarybookings)
            {
               let data = {"key":(count+1),"value":primarybooking}

                  result.push(data);
                  count++;
            }
            for(let dependantbooking of currentBooking.dependantbookings)
            {
               let data = {"key":(count+1),"value":dependantbooking}

                  result.push(data);
                  count++;
            }
            setCurrentBooking('');
          }
          console.log('result...',result);
          setTouristCount(result);
          let data = new Array(parseInt(noOfTourists));
          
          for(let index=0;index<noOfTourists;index++)
          {
            data[index] = {};
          }
          setBookingData(data);
        }
    }
    
    const updateBooking = async(name,index,id) =>{
      
      if(document.getElementsByName(id)[index-1])
      {
        let fieldVal = document.getElementsByName(id)[index-1].value;
        if(fieldVal.trim().length> 0)
        {
            bookingData[index-1][name]= fieldVal;
            console.log('bookingdata....',bookingData);
        }
      }
    }

  

    const submitBookings = async() =>{
        let noOfTourists = document.getElementById('numberOfTourist').value;
         for(let count = 1;count<=noOfTourists;count++)
          {
            updateBooking('name',count,'name');
            updateBooking('mobile',count,'mobile');
            updateBooking('email',count,'email');
            updateBooking('age',count,'age'); 
            updateBooking('specialRequest',count,'specialRequest');
          }
        triggerDisplayBookings(bookingData,
                        tourDetails);
    }
 
    useEffect(()=>{
      if(document.getElementById('numberOfTourist')){
          let noofTourists = document.getElementById('numberOfTourist').value;
          createForms(noofTourists);
       
      }
    },[noOfTourist]);

    
    return(
        
            <div className = "center-container">
              
                    <div className="original-content">
              
{displayErrorDialog?
                     <Dialog
        open={dialogOpen}
        onClose={handleClickOpenOrClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Error Message From {tourDetails.tourManagerName}</DialogTitle>
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
      
     
       
         </div>
         {notification ?
                        <div style={{position: 'fixed', top:70,right:0}} >    
                        <SideBarNotification/> 
                     </div> 
                     :<div></div>
                      }
         </div> 
          
    );
  }
export default CustomBookingForm