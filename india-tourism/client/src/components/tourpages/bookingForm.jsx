import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons.jsx'
import { useEffect, useState, useContext,useRef } from "react";
import { styled } from '@mui/material/styles';
import {getBookingsByBookingId} from "../admin/admin";
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
    TextareaAutosize
  } from "@mui/material";


const BookingForm = ({access_token,tourDetails,triggerDisplayBookings}) =>{
    console.log('tourdetails.....',tourDetails);
    const [startBooking,setStartBooking] = useState(false);
    const [touristCount, setTouristCount] = useState(0);
    const[openBookingForm,setOpenBookingForm] = useState(true);
    const [noOfTourist,setNoOfTourist] = useState(0);
    const [bookingPageMessage,setBookingPageMessage] = useState('');
    const [bookingid,setBookingid] = useState('');
     const [bookingData,setBookingData] = useState('');
     const[currentBooking,setCurrentBooking] = useState('');
   //  const inputRef = useRef(null);
    const CssTextField = styled(TextField)({
      '& label': {
        color: '#FFFF', // Default label color
       }  
  });

   const initBooking = async() =>{
      setBookingPageMessage(process.env.REACT_APP_BOOKING_PAGE_MESSAGE);
        setStartBooking(true);
        createForms(0);
    }
   

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
        if(existingBookings)
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
                       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        maxWidth: 400,
        margin: 'auto',
        bgcolor: 'hsla(0, 73%, 50%, 1.00)',
        cursor: 'pointer',
         animation: 'blink-animation 5s linear infinite;'
      }}
      noValidate
      autoComplete="off" onClick={()=>initBooking() }>
         <Typography variant="body2" style={{ color: 'rgba(17, 17, 17, 1)' }}>
                  Click me to book your trip to {tourDetails.locationName} with {tourDetails.tourManagerName}    
        </Typography> 
           </Box>

        {startBooking ?
         
              <TableContainer sx={{boxShadow: 'none'}}>
                <Table sx={{alignContent:'center', justifyContent: 'center'}}>
                    <TableBody>
                     
                      <TableRow >
                        <TableCell sx={{border:"none"}}>
                           <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                            How many people will be travelling ?
                            </Typography>
                        </TableCell>
                        <TableCell sx={{border:"none"}}>
                          <CssTextField id="numberOfTourist" 
                          sx={{ color: '#FFFFFF' }}
                          label="Enter number of travellers" 
                          defaultValue={noOfTourist}
                          />    
                         </TableCell>
                         <TableCell sx={{border:"none"}}>
                           <CustomButton noOfTourist={noOfTourist} setNoOfTourist={setNoOfTourist} 
                           />
                          </TableCell>     
                        </TableRow>
                         <TableRow>
                         <TableCell sx={{border:"none"}}>
                           <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                            Please enter the booking ID of the trip you want to attend?
                            </Typography>
                        </TableCell>
                         <CssTextField id="bookingid" 
                          sx={{ color: '#FFFFFF' }}
                          label="Booking id (Optional)" 
                           defaultValue={bookingid} 
                           onBlur={showCurrentBookings}
                         />
                      </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
           :<div></div>
        }
     {
        openBookingForm ?
        <div style={{border: "2px solid black;" }}>
          <Typography variant="body2" style={{ color: '#FFFFFF' }}>{bookingPageMessage}</Typography>
         <Paper>
          {
          touristCount && touristCount.length >0 ?
            touristCount.map((tourist)=>(
           
              <div className="head"
                style={{
                    width: "fit-content",
                    margin: "auto",
                   border: "2px solid black;"
                }}>
                
                <h2
                    style={{
                        color: "solid white"
                    }}
                >
             <Typography variant="body2" style={{ color: '#160101ff' }}> 
              <strong>Tourist #{tourist.key}</strong>

               </Typography>
                </h2>
                <FormControl>
             
                <InputLabel variant="outlined" 
                style={{ color: '#080000ff' }}
                fullWidth>Name</InputLabel>
                <Input id="name" name="name" 
                defaultValue={tourist.value.name}/>
                 </FormControl>
                  <FormControl style={{ marginLeft: 5 }}>
                    
                <InputLabel 
                style={{ color: '#0c0000ff' }}
                variant="outlined" fullWidth>Email</InputLabel>
                <Input id="email" name="email" 
                 defaultValue={tourist.value.email}
                />
                </FormControl>
                     
                   <FormControl style={{ marginLeft: 5 }}>
                   
                <InputLabel 
                style={{ color: '#0c0000ff' }}
                variant="outlined" fullWidth>Mobile</InputLabel>
                <Input id="mobile" name="mobile" 
                defaultValue={tourist.value.mobile}/>
                    </FormControl>
                    <FormControl style={{ marginLeft: 5 }}> 
                      
                  <InputLabel 
                  style={{ color: '#080000ff' }}
                  variant="outlined" fullWidth>Age</InputLabel>
                 <Input id="age" name="age" 
                 defaultValue={tourist.value.age} />  
                </FormControl>
                  <FormControl style={{ marginLeft: 5 }}> 
                     
                  <InputLabel 
                  style={{ color: '#080000ff' }}
                  variant="outlined" fullWidth>Any Special request?</InputLabel>
                 <Input id="specialRequest" name="specialRequest" 
                  defaultValue={tourist.value.specialRequest}
                 />  
                </FormControl>
              </div>
            )):<div></div>
          }</Paper></div>:<div></div>
        }
        { startBooking ? 
       
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
         </div> 
          
    );
  }
export default BookingForm