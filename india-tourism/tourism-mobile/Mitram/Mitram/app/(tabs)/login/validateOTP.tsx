import React, { useState } from 'react';
import { View, Text, TextInput, 
    TouchableOpacity,KeyboardAvoidingView,ActivityIndicator,Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For storing tokens
import LoginSignUpStyle from '../../styles/loginsignup.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black,Inter_900Black_Italic } from '@expo-google-fonts/inter'; 
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import { useLocalSearchParams } from 'expo-router';
import {validateOTPForLogin,resendOTPForLogin} from '../../admin/admin.js'
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthCommonModal from '../../admin/authCommonModal.js'
import PleaseWaitScreen from '../../admin/waitscreen.js'
export default function ValidateOTP(){
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
   const[modalVisible,setModalVisible] = useState(false);
   const [isloading,setIsloading] = useState(false)
  const [fontsLoaded] = useFonts({
      'Inter-Black': Inter_900Black, // Assign a name to the loaded font
      'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Inter-Black-Header': Inter_900Black_Italic
    });
    // if(!fontsLoaded)
    // {
    //     return <AppLoading/>
    // }

   
    const {email,mobile,access_token} = useLocalSearchParams();
    const router = useRouter();

  const validateOTP = async () => {
    setError(''); // Clear previous errors
    setModalVisible(false)
   
    // Basic validation
    if (!email && !mobile) {
      setError('Please enter and email and mobile.');
      setModalVisible(true)
      setIsloading(false)
      return
    }

    try {
         let req_data = ({ email:email, mobile:mobile, otp:otp,
             access_token:access_token
          });
           setIsloading(true)
            // Replace with your actual API call
            let response = await validateOTPForLogin(req_data);
       
      
           if (response) {
            setIsloading(false)
            console.log('response from validate OTP....',response)
            const otpValid = response.otpValid;

            if(otpValid)
            {
                router.push( { pathname: "/login/profile",
          params: {mobile: mobile,email:email,access_token:access_token} 
          })
            }
            else{
              setIsloading(false)
               setError('OTP validation failed , Please try again'); 
               setModalVisible(true)
            }
        // Assuming your API returns a token on success
      //  await SecureStore.setItemAsync('userToken', data.token);
        //navigation.replace('Home'); // Navigate to home screen
      } else {
        setError(data.message || 'Login failed. Please try again.');
        setIsloading(false)
      }
    } catch (err) {
      setError('An error occurred. Please check your internet connection.');
      setIsloading(false)
    }
  };


  const resendOTP = async () => {
    setError(''); // Clear previous errors
    setModalVisible(false)
    // Basic validation
    if (!email && !mobile) {
      setError('Please enter and email and mobile.');
      setModalVisible(true)
      return
    }

    try {
         let req_data = ({ email:email, mobile:mobile, otp:otp,
             access_token:access_token
          });

            // Replace with your actual API call
            let response = await resendOTPForLogin(req_data);
       
      
           if (response) {
            console.log('response from validate OTP....',response)
            const otp = response.otp;

            if(otp)
            {
              setError('Please use your new OTP sent to your email/mobile'); 
              setModalVisible(true) 
            }
            else{
               setError('resend OTP failed , Please try again'); 
               setModalVisible(true)
            }
        // Assuming your API returns a token on success
      //  await SecureStore.setItemAsync('userToken', data.token);
        //navigation.replace('Home'); // Navigate to home screen
      } else {
        setError(data.message || 'Login failed. Please try again.');
         setModalVisible(true)
      }
    } catch (err) {
      setError('An error occurred. Please check your internet connection.');
    }
  };
  return (
    fontsLoaded?
    <KeyboardAvoidingView style = {LoginSignUpStyle.centeredContainer}  
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
              >
    <Text style={{ fontFamily: 'Inter-Black-Header',color:'#f3f3f3d7',fontSize:50 }}>Validate OTP</Text>
    

<View
      style={LoginSignUpStyle.flexboxcontainer}>
         <Ionicons name="mail-open" size={24} color="white"></Ionicons>



      <Text  style={{fontFamily:'Poppins-SemiBold'}}
        >{email}</Text>
</View>
{
  isloading ?
   
       <PleaseWaitScreen/>:<View/>
    
}
<View
      style={LoginSignUpStyle.flexboxcontainer}>
   <Ionicons name="phone-portrait" size={24} color="white"></Ionicons>
      <Text  style={{fontFamily:'Poppins-SemiBold'}}
        >{mobile}</Text>
    </View>
    <View
      style={LoginSignUpStyle.flexboxcontainer}>
       
        <Text style={{fontFamily:'Poppins-SemiBold'}}>OTP</Text>

        <TextInput
        style={LoginSignUpStyle.textfieldunderlinedInput}
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
       <View>
        {error ? <AuthCommonModal modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} errorMessage={error}
                     setErrorMessage={setError}
                    /> : null}
    </View>
     </View>
      <View
      style={LoginSignUpStyle.flexboxcontainer}>

         <View style={LoginSignUpStyle.buttonscontainer}>
   
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText} onPress={()=>
                      validateOTP()}>Validate OTP</Text>
                  </TouchableOpacity>
    
      {/* Add a "Forgot Password" link or similar */}
    
    </View>

      <View style={LoginSignUpStyle.buttonscontainer}>
   
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText} onPress={()=>
                      resendOTP()}>Resend OTP</Text>
                  </TouchableOpacity>
    
      {/* Add a "Forgot Password" link or similar */}
    
    </View>
     </View>
  
    </KeyboardAvoidingView>:
    <View style={TourCommonStyle.centeredContainer}>
            <ActivityIndicator 
            size="large" color="#3c3ca7ff"/>
            </View>
  );
}

