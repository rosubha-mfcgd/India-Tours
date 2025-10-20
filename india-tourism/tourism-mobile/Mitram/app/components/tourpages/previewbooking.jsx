import React from "react";

import LoginSignUpStyle from '../../stylecomp/loginsignup';
import CategoryStyle from '../../stylecomp/navbar'; 
import CardStyle from '../../stylecomp/cards'; 
import SidebarStyle from '../../stylecomp/sidebar'; 
import BookingFormStyle from '../../stylecomp/bookingForm'; 


import { useEffect, useState, useContext } from "react";
import {performTripBooking,updateBookingsByBookingId} from '../../admin/admin';
import { View,Text} from 'react-native';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,TextInput,Tooltip,TouchableRipple,DataTable} from 'react-native-paper'




const PreviewForm = ({access_token,bookings,tourDetailsParam}) =>{

    const[disable,setDisable] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const[bookingId, setBookingId] = useState('');
    const[bookingUpdateId, setBookingUpdateId] = useState('');
     
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


    return(<View  style={LoginSignUpStyle.centeredContainer}>
            <View style={{border: "2px solid black;" }}>
                 <View  component="form" >
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
          <Button onPress={handleClickOpenOrClose}>Cancel</Button>
          <Button onPress={handleClickOpenOrClose} autoFocus>
            Proceed to Payment
          </Button>
          {dialogOpen?
          <Image source={require('../../assets/images/success_animation.gif')} alt="" width="40" height="40"/>:<View></View>}
        </DialogActions>
      </Dialog>:<View></View>}
                            
                                <DataTable>
                                    
                                      <DataTable.Row>
                                        <DataTable.Cell>
                                    {!tourDetailsParam.bookingid?
                                        <Text variant="h5" style={{ color: 'hsla(0, 32%, 92%, 1.00)' }}>
                                            Booking details for {tourDetailsParam.locationName} tour by {tourDetailsParam.tourManagerName}
                                        </Text>:
                                        <Text variant="h5" style={{ color: 'hsla(0, 32%, 92%, 1.00)' }}>
                                            Booking ID {tourDetailsParam.bookingid} updates for  {tourDetailsParam.locationName} tour by {tourDetailsParam.tourManagerName}
                                        </Text>
                                    }
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                         <button type="button" onPress={()=>{
                        triggerEditable()}}
                       class="button" 
                        >Edit </button>

                                        </DataTable.Cell>
                                        </DataTable.Row>
                                      </DataTable>
                                        
                                         </View>
                            <Paper>
                   {bookings && bookings.length>0 ?
                        bookings.map((booking)=>(
                           
                                  <View 
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
                       class="button" onPress={submitBooking}>Confirm Booking</button>
                       
        </View>
      </View>
       
      </View>
    </View>)
}

export default PreviewForm;
