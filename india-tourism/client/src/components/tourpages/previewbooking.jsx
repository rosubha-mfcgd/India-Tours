import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import { useEffect, useState, useContext } from "react";
import { performTripBooking } from "../admin/admin";
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



const PreviewForm = ({access_token,bookings,tourDetailsParam}) =>{

    const[disable,setDisable] = useState(true);
   const [dialogOpen, setDialogOpen] = useState(false);
    const[bookingId, setBookingId] = useState('');
  const handleClickOpenOrClose = () => {
    setDialogOpen(!dialogOpen);
  };

  
    console.log('bookings...',bookings)
    var sum = 0;

function increment () {
     sum += 1;
   //setTouristkey(sum);
    return sum;
}
 const updateBooking = async(name,index,event) =>{
        bookings[index-1][name]= event.target.value;
        console.log('bookingdata....',bookings);
    }
const triggerEditable = () =>{
    setDisable(!disable);
}
const submitBooking = async()=>{

    let primary_booking = [];
    let dependantbookings = [];
    let count = 0;
    for(let booking of bookings)
    {
         if(primary_booking.length===0)
         {
            primary_booking[count] = booking;
         }else{
            dependantbookings[count-1] = booking;
         }
         count++;
    }

    let data = {tourManagerId:tourDetailsParam.tourManagerId,
        locationName:tourDetailsParam.locationName,
        startDate:tourDetailsParam.startDate,
        endDate:tourDetailsParam.endDate,
        domesticOrInternational:tourDetailsParam.domesticOrInternational,
        package_cost:tourDetailsParam.package_cost*(bookings.length),
        primarybookings:primary_booking,
        dependantbookings:dependantbookings,

       }

       console.log('data...',data);
       let result = await performTripBooking(data);
       if(result){
        console.log('result...',result);
        setBookingId(result.bookingid);
        
       }
       
}
  useEffect (() =>{
    if(bookingId != '')
    {
        handleClickOpenOrClose();
    }
  },[bookingId])


    return(<div className = "center-container">
            <div style={{border: "2px solid black;" }}>
                 <Box  component="form" >
                    {dialogOpen?
                     <Dialog
        open={dialogOpen}
        onClose={handleClickOpenOrClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{tourDetailsParam.tourManagerName} Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Your booking has been confirmed with bookingId {bookingId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpenOrClose}>Cancel</Button>
          <Button onClick={handleClickOpenOrClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>:<div></div>}
                              <TableContainer>
                                <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>
                                    
                                    <Typography variant="h5" style={{ color: 'hsla(0, 32%, 92%, 1.00)' }}>
                                    Booking details for {tourDetailsParam.locationName} tour by {tourDetailsParam.tourManagerName}
                                    </Typography>
                                   
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
                            <Paper>
                   {bookings && bookings.length>0 ?
                        bookings.map((booking)=>(
                           
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
                                            Tourist #{increment()}
                                                </h2>
                                                <FormControl>
                                             
                                                <InputLabel variant="outlined" 
                                                style={{ color: '#080000ff' }}
                                                fullWidth>Name</InputLabel>
                                                <Input id="name" name="name" value = {booking.name} 
                                                disabled={disable} onChange={(event)=>updateBooking("name",sum,event)}
                                                
                                                />
                                                 </FormControl>
                                                  <FormControl style={{ marginLeft: 5 }}>
                                                    
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Email</InputLabel>
                                                <Input id="email" name="email" value = {booking.email} 
                                                disabled={disable} onChange={(event)=>updateBooking("email",sum,event)}/>
                                                </FormControl>
                                                     
                                                   <FormControl style={{ marginLeft: 5 }}>
                                                   
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Mobile</InputLabel>
                                                <Input id="mobile" name="mobile" value = {booking.mobile} disabled={disable}
                                                onChange={(event)=>updateBooking("mobile",sum,event)}/>
                                                    </FormControl>
                                                    <FormControl style={{ marginLeft: 5 }}> 
                                                      
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Age</InputLabel>
                                                 <Input id="age" name="age" value = {booking.age} disabled={disable} 
                                                 onChange={(event)=>updateBooking("age",sum,event)}/>  
                                                </FormControl>
                                                  <FormControl style={{ marginLeft: 5 }}> 
                                                     
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Any Special request?</InputLabel>
                                                 <Input id="specialRequest" name="specialRequest" 
                                                value = {booking.specialRequest} disabled={disable} 
                                                onChange={(event)=>updateBooking("specialRequest",sum,event)}/>  
                                                </FormControl>
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
                       class="button" onClick={() =>submitBooking()}>Confirm Booking</button>
                       
        </div>
      </div>
                   
                   
                   
                   
                   

                           
              
            </div>
    </div>)
}

export default PreviewForm;