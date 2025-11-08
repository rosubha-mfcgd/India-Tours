import { StyleSheet, Text, View } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import ProductStyle from '../../styles/productStyle.js'; 
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import TextStyle from '../../styles/textStyles.js';
import {updateAsFavorite,getProducts} from "../../admin/admin";
import { useEffect, useState, useContext } from "react";
import { FlatList, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Button, Icon } from '@rneui/themed';
import {productImages} from "../../admin/imageManager";
import { useLocalSearchParams,Link } from 'expo-router';
export default function ConfirmBooking()
{
    const {booking,locationName,startDate,endDate} = useLocalSearchParams();
    return(
        <View style={TourCommonStyle.centeredContainer}>
            <Text style={TextStyle.text}>You are going to {locationName}</Text>
            <Text style={TextStyle.text}>on - {startDate}</Text>
            <Text style={TextStyle.text}>and returning back on - {endDate}</Text>
            <Text style={TextStyle.text}>We are confirming your trip to with the booking id # {booking}</Text>
           <Text style={TextStyle.text}>We'll text you the bookingid in your registered email-id/mobile #, 
            please save it for future reference. </Text>
        </View>



    )
    
}