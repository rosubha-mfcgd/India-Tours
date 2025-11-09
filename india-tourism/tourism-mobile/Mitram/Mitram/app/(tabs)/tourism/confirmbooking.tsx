import { Text, View } from 'react-native';
 
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import TextStyle from '../../styles/textStyles.js';
import { useLocalSearchParams } from 'expo-router';
import {sendConfirmationBookingEmail} from "../../admin/admin";
import { useEffect,useState } from 'react';
export default function ConfirmBooking()
{
    const {booking,locationName,startDate,endDate,tourmanagerName,package_cost,
        email} = useLocalSearchParams();
    const[showConfirmation,setShowConfirmation] = useState(false)
    const[bookingObj,setBookingObj] = useState(JSON.parse(booking));
    useEffect(()=>{

        console.log('bookingid...',booking)
        console.log('email...',email);
           let data = {
            bookingid:bookingObj.bookingid,
              locationName:locationName,
              startDate:startDate,
              endDate:endDate,
             package_cost:package_cost,
              email: email,
             tourmanagername:tourmanagerName
          }
        let emailSent =   sendConfirmationBookingEmail(data);
        if(emailSent)
        {
            console.log('email Confirmation sent');
            setShowConfirmation(true)
        }
          
    },[]);
    return(
        <View style={TourCommonStyle.centeredsecContainer}>
          {showConfirmation ?
          <View>
            <Text style={TextStyle.text}>You are going to </Text>
            <Text style={TextStyle.infotext}>{locationName}</Text>
            <Text style={TextStyle.text}>on - {startDate}</Text>
            <Text style={TextStyle.text}>and returning back on - {endDate}</Text>
            <Text style={TextStyle.text}>We are confirming your trip to with the booking id </Text>
            <Text style={TextStyle.infotext}> # {bookingObj.bookingid} with {tourmanagerName}</Text>
           <Text style={TextStyle.text}>We'll text you the bookingid in your registered email-id/mobile, 
            please save it for future reference. </Text>
            </View>:<View/>
        }
        </View>



    )
    
}