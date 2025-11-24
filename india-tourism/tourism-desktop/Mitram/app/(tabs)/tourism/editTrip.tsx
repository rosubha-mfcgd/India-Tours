import { ScrollView, Text,TextInput,View } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import ProductStyle from '../../styles/productStyle.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js' ;
import BookingStyle from '../../styles/bookingStyle.js';
import {getBookingsByBookingId} from "../../admin/admin";
import { useEffect, useState } from "react";
import { TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';

export default function EditMyTrip(){
    return(
        <View>
            <Text>This page edits the trip by booking id</Text>
        </View>
    )
}
