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
 import { Link } from 'expo-router';
 import { loginUser,getApiAccessToken } from '../../admin/admin';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login({navigation}){
const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  
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


     
  const handleLogin = async () => {
    setError(''); // Clear previous errors

    // Basic validation
    if (!email || !mobile) 
    {
      setError('Please enter both email and mobile.');
      return;
    }

    try {

      let token = await getApiAccessToken();

      if(token)
      {
          console.log('token....',token)
          const req_data = {
                        email:email,
                        mobile:mobile,
                         access_token:token
                      };
         // Replace with your actual API call
          const response = await loginUser(req_data);
       if (response) {
        let data = response.data;
        // Assuming your API returns a token on success
        await SecureStore.setItemAsync('userToken', data.token);
        navigation.replace('Home'); // Navigate to home screen
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    }
    } catch (err) {
      setError('An error occurred. Please check your internet connection.');
    }
  
  };


  return (
    <KeyboardAvoidingView style = {LoginSignUpStyle.centeredContainer}
     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
    
    >
    <Text style={{ fontFamily: 'Inter-Black-Header',color:'#f3f3f3d7',fontSize:50 }}>Login</Text>
    <View
      style={LoginSignUpStyle.flexboxcontainer}>
       
       

       <Ionicons name="mail-open" size={24} color="white"></Ionicons>


      <TextInput
        style={LoginSignUpStyle.textfieldunderlinedInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
</View>
<View
      style={LoginSignUpStyle.flexboxcontainer}>
         <Text style={{fontFamily:'Poppins-Regular',textAlign: 'center'}}>OR</Text>
      </View>
<View
      style={LoginSignUpStyle.flexboxcontainer}>
 <Ionicons name="phone-portrait" size={24} color="white"></Ionicons>
      <TextInput
        style={LoginSignUpStyle.textfieldunderlinedInput}
        placeholder="mobile"
        value={mobile}
        onChangeText={setMobile}
         keyboardType="phone-pad"
        autoCapitalize="none"
      />
    </View>
    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <View style={LoginSignUpStyle.buttonscontainer}>
     <Link href={{pathname:"/login/validateOTP",
        params: { email: email, mobile:mobile
                             }}} asChild>
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText} 
                    onPress={handleLogin} >Send OTP</Text>
                  </TouchableOpacity>
    </Link>
    
      {/* Add a "Forgot Password" link or similar */}
    
    </View>

     <View style={LoginSignUpStyle.buttonscontainer}>
         <Link href={{pathname:"/login/signup"}} asChild>
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
    </Link>
    
      {/* Add a "Forgot Password" link or similar */}
    
    </View>
    </View>
    <View>
        {error ? <Text style={LoginSignUpStyle.errorText}>{error}</Text> : null}
    </View>
    </KeyboardAvoidingView>
  );
}

