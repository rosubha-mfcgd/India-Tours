import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import { useEffect, useState, useContext } from "react";
import { performTripBooking,updateBookingsByBookingId } from "../admin/admin";
import success_animation from '../Assets/images/success_animation.gif';
import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
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



const PreviewForm = ({access_token,bookings,tourDetailsParam}) =>{

    const[disable,setDisable] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const[bookingId, setBookingId] = useState('');
    const[bookingUpdateId, setBookingUpdateId] = useState('');
      const { notification} = useContext(NavContext);
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
    let primarycount = 0;
    let depcount = 0;
    for(let booking of bookings)
    {
         if(primary_booking.length===0)
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


    return(<View className = "center-container">
            <View style={{border: "2px solid black;" }}>
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
          <Button onClick={handleClickOpenOrClose} autoFocus>
            Proceed to Payment
          </Button>
          {dialogOpen?
          <img src={success_animation} alt="" width="40" height="40"/>:<View></View>}
        </DialogActions>
      </Dialog>:<View></View>}
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
                            <Paper>
                   {bookings && bookings.length>0 ?
                        bookings.map((booking)=>(
                           
                                  <View className="head"
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
                                                <Input id="name" name="name" defaultValue = {booking.name} 
                                                disabled={disable} 
                                                onChange={(event)=>updateBooking("name",sum,event)}
                                               inputProps={{
         maxLength: 10,
     }}
                                                />
                                                 </FormControl>
                                                  <FormControl style={{ marginLeft: 5 }}>
                                                    
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Email</InputLabel>
                                                <Input id="email" name="email" 
                                                defaultValue = {booking.email} 
                                                inputProps={{
         maxLength: 50,
     }}
                                                disabled={disable} 
                                                onChange={(event)=>updateBooking("email",sum,event)}/>
                                                </FormControl>
                                                     
                                                   <FormControl style={{ marginLeft: 5 }}>
                                                   
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Mobile</InputLabel>
                                                <Input id="mobile" name="mobile" defaultValue = {booking.mobile} 
                                                disabled={disable} inputProps={{
         maxLength: 10,
     }}
                                                onChange={(event)=>updateBooking("mobile",sum,event)}/>
                                                    </FormControl>
                                                    <FormControl style={{ marginLeft: 5 }}> 
                                                      
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Age</InputLabel>
                                                 <Input id="age" name="age" defaultValue = {booking.age} 
                                                 disabled={disable}  inputProps={{
                                                                       maxLength: 2,
                                                                   }}
                                                 onChange={(event)=>updateBooking("age",sum,event)}/>  
                                                </FormControl>
                                                  <FormControl style={{ marginLeft: 5 }}> 
                                                     
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Any Special request?</InputLabel>
                                                 <Input id="specialRequest" name="specialRequest"  inputProps={{
                                                      maxLength: 100,
                                                  }}
                                                defaultValue = {booking.specialRequest} disabled={disable} 
                                                onChange={(event)=>updateBooking("specialRequest",sum,event)}/>  
                                                </FormControl>
                                              </View>
                           
                            )
                        ):<View></View>
                   }
                    </Paper>
                   
                   <View className="button-container">
         <View className='submit-container'>
                    <button type="submit" 
                        class="button"
                        >Go Back</button>

                            <button type="submit" 
                       class="button" onClick={submitBooking}>Confirm Booking</button>
                       
        </View>
      </View>
        {notification ?
                     <View style={{position: 'fixed', top:70,right:0}} >    
                     <SideBarNotification/> 
                  </View> 
                  :<View></View>
                   }
      </View>
    </View>)
}

export default PreviewForm;