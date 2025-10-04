import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons.jsx'
import { useEffect, useState, useContext,useRef } from "react";
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
    const [touristCount, setTouristCount] = useState(1);
    const[openBookingForm,setOpenBookingForm] = useState(true);
    const [noOfTourist,setNoOfTourist] = useState(1);
    const [bookingPageMessage,setBookingPageMessage] = useState('');
    
    const initBooking = async() =>{
      setBookingPageMessage(process.env.REACT_APP_BOOKING_PAGE_MESSAGE);
        setStartBooking(true);
    }
    const [bookingData,setBookingData] = useState('');
    const createForms = async(noOfTourists) =>
    {
      let result = [];
      console.log('value is....',noOfTourists)
      if(parseInt(noOfTourists)>0)
      {
        setOpenBookingForm(true);
      }
      if(openBookingForm){
      for(let count=1;count<=parseInt(noOfTourists);count++)
      {
        let data = {"key":count,"value":count}
        result.push(data);
      }
      console.log('result...',result)
      setTouristCount(result);
      let data = new Array(parseInt(noOfTourists));
      for(let index=0;index<noOfTourists;index++)
      {
        data[index] = {};
      }
      //console.log('data...',data);
       setBookingData(data);
    }
    
    }
    
    const updateBooking = async(name,index,event) =>{
        bookingData[index-1][name]= event.target.value;
        console.log('bookingdata....',bookingData);
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
           <Box  component="form">
              <TableContainer sx={{boxShadow: 'none'}}>
                <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                           <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                            How many people will be travelling ?
                            </Typography>
                        </TableCell>
                        <TableCell>
                          <TextField id="numberOfTourist" 
                          sx={{ color: '#FFFFFF' }}
                          label="Enter number of travellers" 
                          variant="standard"
                          value={noOfTourist}
                           />    

                         </TableCell>

                         <TableCell>
                           <CustomButton noOfTourist={noOfTourist} setNoOfTourist={setNoOfTourist} 
                           />
                          </TableCell>     
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
           </Box>:<div></div>
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
                <Input id="name" name="name" onChange={(event)=>updateBooking("name",tourist.key,event)}/>
                 </FormControl>
                  <FormControl style={{ marginLeft: 5 }}>
                    
                <InputLabel 
                style={{ color: '#0c0000ff' }}
                variant="outlined" fullWidth>Email</InputLabel>
                <Input id="email" name="email" onChange={(event)=>updateBooking("email",tourist.key,event)}/>
                </FormControl>
                     
                   <FormControl style={{ marginLeft: 5 }}>
                   
                <InputLabel 
                style={{ color: '#0c0000ff' }}
                variant="outlined" fullWidth>Mobile</InputLabel>
                <Input id="mobile" name="mobile" onChange={(event)=>updateBooking("mobile",tourist.key,event)}/>
                    </FormControl>
                    <FormControl style={{ marginLeft: 5 }}> 
                      
                  <InputLabel 
                  style={{ color: '#080000ff' }}
                  variant="outlined" fullWidth>Age</InputLabel>
                 <Input id="age" name="age" onChange={(event)=>updateBooking("age",tourist.key,event)} />  
                </FormControl>
                  <FormControl style={{ marginLeft: 5 }}> 
                     
                  <InputLabel 
                  style={{ color: '#080000ff' }}
                  variant="outlined" fullWidth>Any Special request?</InputLabel>
                 <Input id="specialRequest" name="specialRequest" 
                 onChange={(event)=>updateBooking("specialRequest",tourist.key,event)} />  
                </FormControl>
              </div>
            )):<div></div>
          }</Paper></div>:<div></div>
        }
        { openBookingForm ? 
       
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
                       class="button" onClick={()=>{
                        triggerDisplayBookings(bookingData,
                        tourDetails)}}>Submit your Booking</button>
                       
        </div>
      </div>
        </div>:<div></div>
    }
         </div>
         </div> 
          
    );
  }
export default BookingForm