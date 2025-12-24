import { KeyboardAvoidingView, Text,TextInput,View,Platform } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import ProductStyle from '../../styles/productStyle.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js' ;
import BookingStyle from '../../styles/bookingStyle.js';
import {getBookingsByBookingId} from "../../admin/admin.js";
import { useEffect, useState } from "react";
import { TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';

export default function BookCustomTrip(){
    return(
          <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' works best for iOS, 'height' or 'padding' for Android
              style={{ flex: 1 }}
            >
            <Text>Book your custom trip here !!</Text>
        </KeyboardAvoidingView>
    )
}