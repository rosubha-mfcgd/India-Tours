import { StyleSheet, Text, View } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import ProductStyle from '../../styles/productStyle.js'; 
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import TextStyle from '../../styles/textStyles.js';
import { useLocalSearchParams,Link } from 'expo-router';
export default function ConfirmBooking()
{
    const {booking,locationName,startDate,endDate} = useLocalSearchParams();
    return(
        <View style={TourCommonStyle.centeredsecContainer}>
            <Text style={TextStyle.text}>You are going to </Text>
            <Text style={TextStyle.infotext}>{locationName}</Text>
            <Text style={TextStyle.text}>on - {startDate}</Text>
            <Text style={TextStyle.text}>and returning back on - {endDate}</Text>
            <Text style={TextStyle.text}>We are confirming your trip to with the booking id </Text>
            <Text style={TextStyle.infotext}> # {booking}</Text>
           <Text style={TextStyle.text}>We'll text you the bookingid in your registered email-id/mobile #, 
            please save it for future reference. </Text>
        </View>



    )
    
}