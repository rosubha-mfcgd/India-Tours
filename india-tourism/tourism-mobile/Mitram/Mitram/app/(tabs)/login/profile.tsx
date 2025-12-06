import React, { useState } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, 
    TouchableOpacity,Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For storing tokens
import LoginSignUpStyle from '../../styles/loginsignup.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black,Inter_900Black_Italic } from '@expo-google-fonts/inter'; 
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import {Link} from 'expo-router';
import {loginUser,getApiAccessToken,persistDataInCache,getDataFromCache } from '../../admin/admin.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import AuthCommonModal from '../../admin/authCommonModal.js'
import { useLocalSearchParams } from 'expo-router';


export default function Profile(){

     const {email,mobile,name,access_token} = useLocalSearchParams();
    const [fontsLoaded] = useFonts({
      'Inter-Black': Inter_900Black, // Assign a name to the loaded font
      'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Inter-Black-Header': Inter_900Black_Italic
    });
    if(!fontsLoaded)
    {
        return <AppLoading/>
    }

return (
 <KeyboardAvoidingView style = {LoginSignUpStyle.centeredContainer}  
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
              >
    <Text style={{ fontFamily: 'Inter-Black-Header',color:'#f3f3f3d7',fontSize:50 }}>My Profile</Text>

    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Name</Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{name}</Text>

    </View>

    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Email</Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{email}</Text>

    </View>

      <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Mobile</Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{mobile}</Text>

    </View>



</KeyboardAvoidingView>

)


}