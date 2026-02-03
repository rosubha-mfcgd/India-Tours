import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons'
import { useEffect, useState, useContext} from "react";
import { styled } from '@mui/material/styles';
import {getBookingsByBookingId} from "../admin/admin";
import SideBarNotification from '../navigationTabs/sideBarNotification';
import close_button from '../Assets/images/close-button.png';
import failure_animation from '../Assets/images/failure_animation.gif';
import {validateBookingData} from "../admin/utility";
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
const EditBookingForm = ({access_token,tourDetails}) =>{
    console.log('tourdetails.....',tourDetails);
    const [startBooking,setStartBooking] = useState(false);
    const [touristCount, setTouristCount] = useState(0);
    const[openBookingForm,setOpenBookingForm] = useState(true);
   
    const [bookingPageMessage,setBookingPageMessage] = useState('');
    const [bookingid,setBookingid] = useState('');
     const [bookingData,setBookingData] = useState([]);
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
    //display the list of bookings by booking id 
    const showCurrentBookings = async(event) =>{
      let bookingid = event.target.value;
      console.log('booking id is ',bookingid);
      if(bookingid){
          setBookingid(bookingid);
          tourDetails.bookingid = bookingid;
         
            let data = {"tourOperatorId":tourDetails.tourManagerId,
                "bookingId":bookingid
            }
            let existingBookings = await getBookingsByBookingId(data);
            if(existingBookings &&  !existingBookings.errormessage)
            {
                setBookingData(existingBookings);
            }
            else{
                  setErrorMessage('Booking id '+bookingid+' was not found in our system');
                  setDisplayErrorDialog(true);
                  setDialogOpen(true);
            }
      }
    }

     const columns = [
          { field: 'name', headerName: 'Name' },
          { field: 'mobile', headerName: 'Mobile' },
          { field: 'email', headerName: 'Email' },
          { field: 'ageGroup', headerName: 'AgeGroup' },
          { field: 'gender', headerName: 'Gender' }
  ];




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
    //Update the booking payload with fields for each tourist
    const updateBooking = async(name,index,id) =>{
      
      if(document.getElementsByName(id)[index-1])
      {
        let fieldVal = document.getElementsByName(id)[index-1].value;
        console.log('field value...',fieldVal)
        if(fieldVal.trim().length> 0)
        {
            bookingData[index-1][name]= fieldVal;
            console.log('bookingdata....',bookingData);
        }
      }
    }

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
        let noOfTourists = document.getElementById('numberOfTourist').value;
         for(let count = 1;count<=noOfTourists;count++)
          {
            updateBooking('name',count,'name');
            updateBooking('mobile',count,'mobile');
            updateBooking('email',count,'email');
            updateBooking('ageGroup',count,'ageGroup'); 
            updateBooking('gender',count,'gender'); 
            //updateBooking('specialRequest',count,'specialRequest');
          }
          //validate booking fields before submission 
         let errMsg =  await validateFields();
          if(errMsg)
          {
            setErrorMessage(errMsg);
            setDisplayErrorDialog(true)
            setDialogOpen(true);
            
          }
    }
    
     useEffect(()=>{
         setBookingPageMessage(process.env.REACT_APP_BOOKING_PAGE_MESSAGE);
        setStartBooking(true);
        setShowBookingBtn(false);
        createForms(0);
    },[]);
    
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
        {startBooking ?
         
              <TableContainer sx={{boxShadow: 'none'}}>
                <Table sx={{alignContent:'center', justifyContent: 'center'}}>
                    <TableBody>
                     
                    
                         <TableRow>
                         <TableCell sx={{border:"none"}}>
                           <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                            Enter the booking ID 
                            </Typography>
                        </TableCell>
                         <TableCell sx={{border:"none"}}>
                         <CssTextField id="bookingid" 
                          sx={{ color: '#FFFFFF' }}
                          label="Booking id " 
                           defaultValue={bookingid} 
                           onBlur={showCurrentBookings}  slotProps={{
                           htmlInput: {
                            maxLength: 8, // Set the maximum length to 8 characters
                             },
                            }}
                         />
                         </TableCell>
                      </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
           :<div/>
        }
     {
        openBookingForm ?
        <div  display="flex"
      justifyContent="center"
      alignItems="center"
      // Example height for visualization
      width="100%">
          {/* <Typography variant="body2" style={{ color: '#FFFFFF' }}>{bookingPageMessage}</Typography> */}
         <Paper sx={{ 
         backgroundColor:'#F8F9FA',
          backgroundRepeat: 'no-repeat',
          padding: 2, // theme.spacing(2)
          textAlign: 'center', // Centers the text itself horizontally
          display: 'flex',
          flexDirection: 'column', // Ensures children stack vertically
          justifyContent: 'center', // Centers children vertically
          alignItems: 'center', // Centers children horizontally
          height: '100%',
          width: '100%', // Example width for demonstration 
          }}>
          {
          bookingData && bookingData.length >0 ?
           (
              <DynamicTable columns={columns} data={bookingData}/>  
             
       ):<div/>
          }</Paper></div>:<div></div>
        }
        { startBooking && touristCount && touristCount.length >0? 
       
         <div className = "center-container" style={{
                    width: "fit-content",
                    margin: "auto",
                  }}>
                    
       
          
          
        <div className="button-container">
         <div className='submit-container'>
                    <button type="submit" 
                        class="button"
                        >Go Back</button>

                            <button type="submit" 
                       class="button" onClick={submitBookings}>Submit your Booking</button>
                       
        </div>
      </div>
        </div>:<div></div>
    }
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
export default EditBookingForm