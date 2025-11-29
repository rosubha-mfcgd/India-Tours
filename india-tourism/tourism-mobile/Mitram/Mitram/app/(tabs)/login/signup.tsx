import React, { useState } from 'react';
import { View, Text, TextInput, 
    TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For storing tokens
import LoginSignUpStyle from '../../styles/loginsignup.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import AppLoading from 'expo-app-loading';
 import { useFonts } from 'expo-font';
    import { Inter_900Black,Inter_900Black_Italic } from '@expo-google-fonts/inter'; 
    import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
     import { Link } from 'expo-router';
export default function SignUp({navigation}){
  const [name, setName] = useState('');
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

  const handleSignup = async () => {
    setError(''); // Clear previous errors

    // Basic validation
    if (!email || !mobile) {
      setError('Please enter both email and mobile.');
      return;
    }

    try {
      // Replace with your actual API call
      const response = await fetch('YOUR_API_ENDPOINT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming your API returns a token on success
        await SecureStore.setItemAsync('userToken', data.token);
        navigation.replace('Home'); // Navigate to home screen
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please check your internet connection.');
    }
  };

  return (
    <View style = {LoginSignUpStyle.centeredContainer}>
    <Text style={{ fontFamily: 'Inter-Black-Header',color:'#f3f3f3d7',fontSize:50 }}>SignUp</Text>
    <View
      style={LoginSignUpStyle.flexboxcontainer}>
       
        <Text style={{fontFamily:'Poppins-SemiBold'}}>Name</Text>

        <TextInput
        style={LoginSignUpStyle.textfieldunderlinedInput}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        keyboardType="name-phone-pad"
        autoCapitalize="none"
      />
      </View>

<View
      style={LoginSignUpStyle.flexboxcontainer}>
        <Text style={{fontFamily:'Poppins-SemiBold'}}>Email</Text>


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
  <Text style={{fontFamily:'Poppins-SemiBold'}}>Mobile</Text>
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
   
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText} onPress={()=>
                      handleSignup()}>Send OTP</Text>
                  </TouchableOpacity>
    
      {/* Add a "Forgot Password" link or similar */}
    
    </View>
    <View style={LoginSignUpStyle.buttonscontainer}>
   <Link href={{pathname:"/login/"}} asChild>
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText}>Login</Text>
                  </TouchableOpacity>
    </Link>
      {/* Add a "Forgot Password" link or similar */}
    
    </View>

    
    </View>
    <View>
        {error ? <Text style={LoginSignUpStyle.errorText}>{error}</Text> : null}
    </View>
    </View>
  );
}

