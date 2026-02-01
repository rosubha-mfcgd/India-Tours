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
const BookingForm = ({access_token,tourDetails,triggerDisplayBookings,triggerEditBookingForm}) =>{
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
//Create form for each tourist
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
    //remove tourist entry from grid
    const removeTourist = async(key)=>{
      for(let count = 1;count<=noOfTourist;count++)
          {
            console.log('key...',key);
            if(count === key)
            {
              updateBooking('name',count,'name');
              updateBooking('mobile',count,'mobile');
              updateBooking('email',count,'email');
              updateBooking('ageGroup',count,'ageGroup'); 
              updateBooking('gender',count,'gender');
              //updateBooking('specialRequest',count,'specialRequest');
            }
          }
       setNoOfTourist(noOfTourist-1);
    }
 
    useEffect(()=>{
      if(document.getElementById('numberOfTourist'))
        {
          let noofTourists = document.getElementById('numberOfTourist').value;
          createForms(noofTourists);
       
      }
    },[noOfTourist]);

    useEffect(()=>{
         setBookingPageMessage(process.env.REACT_APP_BOOKING_PAGE_MESSAGE);
        setStartBooking(true);
        setShowBookingBtn(false);
        createForms(0);
    },[]);
    
    return(
        <div className='navbar-grid'>
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
                     
                      <TableRow >
                        <TableCell sx={{border:"none"}}>
                           <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                            Enter no. of tourists
                            </Typography>
                        </TableCell>
                        <TableCell sx={{border:"none"}}>
                          <CssTextField id="numberOfTourist" 
                          sx={{ color: '#FFFFFF' }}
                          label="Enter number of tourists" 
                          defaultValue={noOfTourist}
                          slotProps={{
                           htmlInput: {
                            maxLength: 2, // Set the maximum length to 2 characters
                             },
                            }}
                          />    
                         </TableCell>
                         <TableCell sx={{border:"none"}}>
                           <CustomButton noOfTourist={noOfTourist} setNoOfTourist={setNoOfTourist} 
                           />
                          </TableCell>     
                        </TableRow>
                         
                    </TableBody>
                </Table>
            </TableContainer>
           :<div></div>
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
         backgroundColor:'#97a7b6',
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
          touristCount && touristCount.length >0 ?
            touristCount.map((tourist)=>(
           
              <div className="head"
                style={{
                    width: "fit-content",
                    margin: "auto",
                     }}>
                
                <h2
                    style={{
                        color: "solid white"
                    }}
                >
             <Typography variant="body2" style={{ color: '#160101ff' }}> 
              <strong>Tourist #{tourist.key}</strong>
              <img src={close_button} alt="" height="30" width="30" className='img-style' 
                onClick={()=>removeTourist(tourist.key)}
             />
               </Typography>

              
                </h2>
                 <TableContainer sx={{boxShadow: 'none'}}>
                                                <Table>
                                                    <TableBody>
                                                      <TableRow>
                                                        <TableCell>
                <FormControl variant="outlined" fullWidth>
             
                <InputLabel htmlFor="component-outlined"
                fullWidth>Name</InputLabel>
                <OutlinedInput id="name" name="name" 
                defaultValue={tourist.value.name}  
                inputProps={{
                    maxLength: 20,
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
                  <FormControl>
                    
                <InputLabel 
                style={{ color: '#0c0000ff', }} 
                variant="outlined" fullWidth>Email</InputLabel>
                <OutlinedInput id="email" name="email" 
                 defaultValue={tourist.value.email}  inputProps={{
                      maxLength: 50,
                    }}
                  sx={{
                 backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                 borderRadius: 50, // Fully rounded (pill shape)
                 width: '500px'
                  }}
                />
                </FormControl>
                     </TableCell>
                     </TableRow>
                     <TableRow> 
                       <TableCell>
                   <FormControl style={{ marginLeft: 5 }}>
                   
                <InputLabel 
                style={{ color: '#0c0000ff' }} 
                variant="outlined" fullWidth>Mobile</InputLabel>
                <OutlinedInput id="mobile" name="mobile" 
                defaultValue={tourist.value.mobile}  inputProps={{
                 maxLength: 10,
                   }}  sx={{
                  backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                 borderRadius: 50, // Fully rounded (pill shape)
                 width: '500px'
                  }}
                   />
                    </FormControl>
                    </TableCell>
                     </TableRow>
                     <TableRow>
                        <TableCell>
      <FormControl fullWidth variant="outlined" sx={{ borderRadius: '20px' }}> 
           <InputLabel 
                style={{ color: '#0c0000ff' }} 
                variant="outlined" fullWidth>Age Group</InputLabel>               
        <Select
          labelId="select-label"
          id="ageGroup" name="ageGroup"
          label="ageGroup"
           value={"Adult"} sx={{ borderRadius: 'inherit',
            backgroundColor: 'rgba(109, 101, 101, 0.53)' 
            }} 
           >
          <MenuItem value={"Minor"}>Minor</MenuItem>
          <MenuItem value={"Adult"}>Adult</MenuItem>
          <MenuItem value={"SeniorCitizen"}>Senior Citizen</MenuItem>
        </Select>
      </FormControl>
     </TableCell>
     </TableRow>
     <TableRow>
     <TableCell>
      <FormControl fullWidth variant="outlined" sx={{ borderRadius: '20px' }}> 
            <InputLabel 
                style={{ color: '#0c0000ff' }} 
                variant="outlined" fullWidth>Gender</InputLabel>              
        <Select  sx={{ borderRadius: 'inherit',backgroundColor: 'rgba(109, 101, 101, 0.53)'  }}
         labelId="select-label"
          id="gender" name="gender"
          label="gender"
           defaultValue={"Select"}
           >
          <MenuItem value={"Select"}>Select</MenuItem>
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
      </FormControl>
      </TableCell>
      </TableRow>
      </TableBody>
      </Table>
      </TableContainer>
      </div>
       )):<div></div>
          }</Paper></div>:<div></div>
        }
        { startBooking && touristCount && touristCount.length >0? 
       
        <div className="button-container">
         <div className='submit-container'>
                    <button type="submit" 
                        class="button"
                        >Go Back</button>

                    <button type="submit" 
                       class="button" onClick={submitBookings}>Submit your Booking</button>
        </div>
      </div>
       :<div></div>
    }
         </div>
         {notification ?
                        <div style={{position: 'fixed', top:70,right:0}} >    
                        <SideBarNotification/> 
                     </div> 
                     :<div></div>
                      }
         </div> 
         </div> 
    );
  }
export default BookingForm