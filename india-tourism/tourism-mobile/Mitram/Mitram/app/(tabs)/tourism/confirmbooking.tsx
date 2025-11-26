import { Text, View } from 'react-native';
 
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import TextStyle from '../../styles/textStyles.js';
import { useLocalSearchParams } from 'expo-router';
import {sendConfirmationBookingEmail} from "../../admin/admin";
import { useEffect,useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons.js';
export default function ConfirmBooking()
{
    const {booking,locationName,startDate,endDate,tourmanagerName,package_cost,
        email} = useLocalSearchParams();
    const[showConfirmation,setShowConfirmation] = useState(false)
    const[bookingObj,setBookingObj] = useState(JSON.parse(booking));
    useEffect(()=>{

        console.log('bookingid...',booking)
        console.log('email...',email);
        let mounted = true;
        const timer = setTimeout(() =>{
                        
        const confirmBooking = async () =>{
           let data = {
            bookingid:bookingObj.bookingid,
              locationName:locationName,
              startDate:startDate,
              endDate:endDate,
             package_cost:package_cost,
              email: email,
             tourmanagername:tourmanagerName
          }
        let emailSent = await sendConfirmationBookingEmail(data);
        if(emailSent)
        {
            console.log('email Confirmation sent');
            setShowConfirmation(true)
            mounted = false;
        }
    };
     if(mounted) 
                        {
                            if(!showConfirmation)
                            {
                                 confirmBooking();
                            }
                        }},1000);
                
                        return () => {
                            mounted = false; // Set flag to false on cleanup
                            clearTimeout(timer); // Clean up the timer
                        };
          
    },[]);
    return(
        <View style={TourCommonStyle.centeredsecContainer}>
          {showConfirmation ?
           <View>
          <View style={TourCommonStyle.centeredContainer}>
            <Ionicons name="checkmark-circle" size={140} color="#175c06ff" /> 
            </View>
            <View>
            <Text style={TextStyle.body}>You are going to {locationName} on - {startDate} and returning back on - {endDate}</Text>
                 <Text style={TextStyle.body}>We are confirming your trip with booking id # {bookingObj.bookingid} with {tourmanagerName}</Text>
            <Text style={TextStyle.body}>We'll send you the bookingid in your registered email-id/mobile, 
            please save it for future reference. </Text>
            </View>
            </View>
            :<View/>
        }
        </View>



    )
    
}