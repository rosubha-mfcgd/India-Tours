
import CategoryStyle from '../stylecomp/navbar'; 
import CardStyle from '../stylecomp/cards'; 
import SidebarStyle from '../stylecomp/sidebar'; 
import TripDetailsStyle from '../stylecomp/TripDetails'
import BookingFormStyle from '../stylecomp/bookingForm'; 
import LoginSignUpStyle from '../stylecomp/loginsignup';
import { useNavigation } from '@react-navigation/native';  


import CustomButton from '../Utilities/CustomButtons.jsx'
import { useEffect, useState, useContext} from "react";
import {getBookingsByBookingId} from "../admin/admin";
import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
import close_button from '../Assets/images/close-button.png';
import failure_animation from '../Assets/images/failure_animation.gif';
import { NavContext } from '../navigationContext/navigationContext.jsx';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple,Paper,DataTable} from 'react-native-paper';



import { useForm, Controller } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';


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
     const[displayErrorDialog,setDisplayErrorDialog] = useState(false);
     const[errorMessage,setErrorMessage] = useState('');
     const [dialogOpen, setDialogOpen] = useState(false);
     const[showBookingBtn,setShowBookingBtn] = useState(true);
 
  const { notification} = useContext(NavContext);
    const CssTextInput = styled(TextInput)({
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

      const navigate = useNavigation();
    
            const goBack = () =>{
                navigate(-1);
            }

   const handleClickOpenOrClose = () => {
        
        setDialogOpen(!dialogOpen);
        if(!dialogOpen)
        {
           setDisplayErrorDialog(false);
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
        
            <View  style={LoginSignUpStyle.centeredContainer}>
              
                    <View>
                      {showBookingBtn ? 
                       <View
      component="form"
      style={{
        '& .MuiTextInput-root': { m: 1, width: '25ch' },
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
      autoComplete="off" onPress={initBooking}>
         <Text variant="body2" style={{ color: 'rgba(17, 17, 17, 1)' }}>
                  Click me to book your trip to {tourDetails.locationName} with 
                  {tourDetails.tourManagerName}    
        </Text> 
           </View>:<View></View>
              }
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
          <Button onPress={handleClickOpenOrClose}>Cancel</Button>
          <Button onPress={handleClickOpenOrClose} autoFocus>
           OK
          </Button>
          {dialogOpen?
          <img src={failure_animation} alt="" width="40" height="40"/>:
          <View></View>}
        </DialogActions>
      </Dialog>:<View></View>}
        {startBooking ?
         
          <DataTable style={{alignContent:'center', justifyContent: 'center'}}>
                   
                     
                      <DataTable.Row>
                        <DataTable.Cell style={{border:"none"}}>
                           <Text variant="body2" style={{ color: '#FFFFFF' }}>
                            How many people will be travelling ?
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell sx={{border:"none"}}>
                          <CssTextInput id="numberOfTourist" 
                          sx={{ color: '#FFFFFF' }}
                          label="Enter number of travellers" 
                          defaultValue={noOfTourist}
                          slotProps={{
                           htmlInput: {
                            maxLength: 2, // Set the maximum length to 2 characters
                             },
                            }}
                          />    
                         </DataTable.Cell>
                         <DataTable.Cell sx={{border:"none"}}>
                           <CustomButton noOfTourist={noOfTourist} setNoOfTourist={setNoOfTourist} 
                           />
                          </DataTable.Cell>     
                        </DataTable.Row>
                         <DataTable.Row>
                         <DataTable.Cell style={{border:"none"}}>
                           <Text variant="body2" style={{ color: '#FFFFFF' }}>
                            Please enter the booking ID of the trip you want to attend?
                            </Text>
                        </DataTable.Cell>
                         <CssTextInput id="bookingid" 
                          sx={{ color: '#FFFFFF' }}
                          label="Booking id (Optional)" 
                           defaultValue={bookingid} 
                           onBlur={showCurrentBookings}  slotProps={{
                           htmlInput: {
                            maxLength: 8, // Set the maximum length to 8 characters
                             },
                            }}
                         />
                      </DataTable.Row>
                   
                </DataTable>
           
           :<View></View>
        }
     {
        openBookingForm ?
        <View style={{border: "2px solid black;" }}>
          <Text variant="body2" style={{ color: '#FFFFFF' }}>{bookingPageMessage}</Text>
         <Paper>
          {
          touristCount && touristCount.length >0 ?
            touristCount.map((tourist)=>(
           
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
             <Text variant="body2" style={{ color: '#160101ff' }}> 
              <strong>Tourist #{tourist.key}</strong>
              <Image source={close_button} alt="" height="30" width="30" className='img-style' 

             />
               </Text>

              
                </h2>
                <FormControl>
             
                <InputLabel variant="outlined" 
                style={{ color: '#080000ff' }}
                fullWidth>Name</InputLabel>
                <Input id="name" name="name" 
                defaultValue={tourist.value.name}   inputProps={{
         maxLength: 20,
     }}/>
                 </FormControl>
                  <FormControl style={{ marginLeft: 5 }}>
                    
                <InputLabel 
                style={{ color: '#0c0000ff' }} 
                variant="outlined" fullWidth>Email</InputLabel>
                <Input id="email" name="email" 
                 defaultValue={tourist.value.email}  inputProps={{
         maxLength: 50,
     }}
                />
                </FormControl>
                     
                   <FormControl style={{ marginLeft: 5 }}>
                   
                <InputLabel 
                style={{ color: '#0c0000ff' }} 
                variant="outlined" fullWidth>Mobile</InputLabel>
                <Input id="mobile" name="mobile" 
                defaultValue={tourist.value.mobile}  inputProps={{
         maxLength: 10,
     }}/>
                    </FormControl>
                    <FormControl style={{ marginLeft: 5 }}> 
                      
                  <InputLabel 
                  style={{ color: '#080000ff' }} 
                  variant="outlined" fullWidth>Age</InputLabel>
                 <Input id="age" name="age" 
                 defaultValue={tourist.value.age}  inputProps={{
         maxLength: 2,
     }}/>  
                </FormControl>
                  <FormControl style={{ marginLeft: 5 }}> 
                     
                  <InputLabel 
                  style={{ color: '#080000ff' }} 
                  variant="outlined" fullWidth>Any Special request?</InputLabel>
                 <Input id="specialRequest" name="specialRequest" 
                  defaultValue={tourist.value.specialRequest}  inputProps={{
         maxLength: 100,
     }}
                 />  
                </FormControl>
                
              </View>
            )):<View></View>
          }</Paper></View>:<View></View>
        }
        { startBooking && touristCount && touristCount.length >0? 
       
         <View className = "center-container" style={{
                    width: "fit-content",
                    margin: "auto",
                    flex: 1,
                    justifyContent: 'center', // Centers content vertically
                    alignItems: 'center',     // Centers content horizontally
                    backgroundColor: '#f0f0f0', 
                  }}>
                    
       
          
          
        <View style={BookingFormStyle.buttoncontainer}>
         <View style={LoginSignUpStyle.submitcontainer}>
                    <TouchableOpacity onPress = {goBack}
                        style={TripDetailsStyle.button}
                        >Go Back</TouchableOpacity>

                            <TouchableOpacity style={TripDetailsStyle.button}
                      onPress={submitBookings}>
                        Submit your Booking</TouchableOpacity>
                       
        </View>
      </View>
        </View>:<View></View>
    }
         </View>
         {notification ?
                        <View style={{position: 'fixed', top:70,right:0}} >    
                        <SideBarNotification/> 
                     </View> 
                     :<View></View>
                      }
         </View> 
          
    );
  }
export default BookingForm
