import React, { useState } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, 
    TouchableOpacity,Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For storing tokens
import LoginSignUpStyle from '../../styles/loginsignup';
import TourCommonStyle from '../../styles/tourCommonStyle';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black,Inter_900Black_Italic } from '@expo-google-fonts/inter'; 
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import { Link,useRouter } from 'expo-router';
import { signupUser,getApiAccessToken } from '../../admin/admin';
import Ionicons from '@expo/vector-icons/Ionicons';
 import DeviceInfo from 'react-native-device-info';
 import AuthCommonModal from '../../admin/authCommonModal'


export default function SignUp({navigation}){
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
   const[modalVisible,setModalVisible] = useState(false);
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

    const router = useRouter();
  const handleSignup = async () => {
    setError(''); // Clear previous errors
    setModalVisible(false)
    // Basic validation
    if (!email && !mobile) {
      setError('Please enter your Name and either email or mobile for signup.');
      setModalVisible(true)
      return;
    }

    try {

      let token = await getApiAccessToken();

      if(token){
        console.log('signup token....',token.data.access_token)
       const req_data = {
                        email:email,
                        mobile:mobile,
                        name:name,
                        access_token:token.data.access_token
                      };
      // Replace with your actual API call
      const response = await signupUser(req_data);
      if(response)
      {
        console.log('response found...',response)
        const code = response.code;

      if (code === 'Y') {
        // Assuming your API returns a token on success
      //  await SecureStore.setItemAsync('userToken', data.token);
        //navigation.replace('Home'); // Navigate to home screen

        router.push({
              pathname: "/login/validateOTP",
          params: {  mobile: mobile,email:email }
          });
       }else if(code === 'E'){
        setError(response.message)
        setModalVisible(true)
       }

      } else {
        setError(response.message || 'Login failed. Please try again.');
         setModalVisible(true)
      }
    }
    }
     catch (err) {
      setError('An error occurred. Please check your internet connection.');
    }
  
  };

  return (
    <KeyboardAvoidingView style = {LoginSignUpStyle.centeredContainer}  
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
              >
    <Text style={{ fontFamily: 'Inter-Black-Header',color:'#f3f3f3d7',fontSize:50 }}>SignUp</Text>
    <View
      style={LoginSignUpStyle.flexboxcontainer}>
       
         <Ionicons name="person-circle" size={24} color="black"></Ionicons>

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
   
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText} onPress={handleSignup}>SignUp</Text>
                  </TouchableOpacity>
    
      {/* Add a "Forgot Password" link or similar */}
    
    </View>
     <View>
        {error ? <AuthCommonModal modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} errorMessage={error}/> : null}
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
   
    </KeyboardAvoidingView>
  );
}

