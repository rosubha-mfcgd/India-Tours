import React, { useState,useCallback, useEffect } from 'react';
import { View, Text, TextInput, 
    TouchableOpacity,KeyboardAvoidingView,ActivityIndicator,Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For storing tokens
import LoginSignUpStyle from '../../styles/loginsignup.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js';

import { useFonts } from 'expo-font';
import { Inter_900Black,Inter_900Black_Italic } from '@expo-google-fonts/inter'; 
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import { useLocalSearchParams } from 'expo-router';
import {validateOTPForLogin,resendOTPForLogin,getAuthAccessToken,exchangeAuthToken} from '../../admin/admin'
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthCommonModal from '../../admin/authCommonModal.js'
import PleaseWaitScreen from '../../admin/waitscreen.js'

import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest,makeRedirectUri } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import 'react-native-get-random-values'; // Import this at the very top of your application entry file
import { v4 as uuidv4 } from 'uuid';
import {getPKCE} from '../../admin/generateCodeChallenge';

export default function ValidateOTP(){

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
   const[modalVisible,setModalVisible] = useState(false);
   const [isloading,setIsloading] = useState(false)

  //  const[nooncetoken,setNooncetoken] = useState(null)
  //  const[uuidToken,setUuidToken] = useState(null)
  // const [codeChallenge,setCodeChallenge] = useState(null)
  // const [tokenEndPoint,setTokenEndPoint] = useState(null)
   const [fontsLoaded] = useFonts({
      'Inter-Black': Inter_900Black, // Assign a name to the loaded font
      'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Inter-Black-Header': Inter_900Black_Italic
    });
 

     // Make sure to dismiss the web browser popup when the flow completes
//WebBrowser.maybeCompleteAuthSession();

//  const redirectUri = makeRedirectUri({
//       scheme: 'mitram' // Matches the scheme in app.json
//  });

// const generateNonce = () => {
//   const randomBytes = new Uint8Array(16); // 16 bytes for a 128-bit nonce
//   crypto.getRandomValues(randomBytes);

//   // Convert to Base64 and make it URL-safe (similar to the expo-crypto method)
//   const nonce = btoa(String.fromCharCode(...randomBytes))
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_')
//     .replace(/=/g, ''); // Ensure no padding is used

//  setNooncetoken(nonce)
// };

// const generateNewId = () => {
//   const id = uuidv4();
//   console.log('Generated UUID:', id);
//   setUuidToken(id)
//   // Use the generated ID in your logic (e.g., adding an item to a list)
// };

 
// const config = {
//   clientId: 'mitram-expo-client',
//   redirectUri,
//   scopes: ['openid', 'profile', 'email', 'offline_access'], // offline_access is often needed for refresh tokens
//   extraParams: {
//     // Optional: add any additional parameters your auth provider requires
//     // audience: 'YOUR_API_AUDIENCE', 
//   },
//   // AuthSession handles PKCE generation automatically if your provider supports it
//   // and expects the 'code' response type.
//   responseType: 'code', 
//   codeChallengeMethod: AuthSession.CodeChallengeMethod.S256, // S256 is the standard
// };

  
//console.log(`Redirect URL: ${redirectUri}`);

// const [request, result, promptAsync] = AuthSession.useAuthRequest(config, {
//     // The authorization endpoint URL of your OAuth provider (e.g., Auth0, Keycloak)
    
//     authorizationEndpoint: 'http://localhost:8080/realms/mitram-dev/protocol/openid-connect/authorize',
//   });

//    const exchangeCodeForToken = async (code,codeVerifier) => {
//     try {
//       // AuthSession.exchangeCodeAsync handles the secure token exchange
//       const responseToken = await exchangeAuthToken(code,codeVerifier,tokenEndPoint)
//       if(responseToken){
       
      
//       // Store tokens securely (e.g., using expo-secure-store)
//       console.log('Access Token:', responseToken);

//       // You would typically store the token (e.g., in expo-secure-store) and update app state
//       //  SecureStore.setItemAsync('token', refreshToken).then(
//       //               response =>{
//       //                   router.push( { pathname: "/login/profile",
//       //                 params: {mobile: mobile,email:email,access_token:accessToken} 
//       //           });
//       //         });
//             }       

//     } catch (error) {
//       console.error('Token exchange error:', error);
//     }
//   };




    const {email,mobile,access_token} = useLocalSearchParams();
    const router = useRouter();

  const validateOTP = async () => {
    setError(''); // Clear previous errors
    setModalVisible(false)
   
    // Basic validation
    if (!otp) {
      setError('Please enter the OTP');
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
              
              // generateNonce();
              // generateNewId();

              let response = await getAuthAccessToken();
              if(response)
              {
                  //setCodeChallenge(response.codeChallenge);
                  //let tokenUrl =  'http://localhost:8080/realms/mitram-dev/protocol/openid-connect/token'                  setTokenEndPoint(tokenUrl)
                  console.log('response...',response);
                router.push({
                         pathname: "/login/profile",
                         params: { 
                              email: email,
                              mobile: mobile,
                              access_token: response.access_token                         
                           }
                 // promptAsync();
              //  let result = await getTokenFromSession(data);
              }
            }
            else{
              setIsloading(false)
               setError('OTP validation failed , Please try again'); 
               setModalVisible(true)
            }
        // Assuming your API returns a token on success
       //navigation.replace('Home'); // Navigate to home screen
      } else {
        setError('Login failed. Please try again.');
         setModalVisible(true)
        setIsloading(false)
      }
    } catch (err) {
      setError('An error occurred. Please check your internet connection.');
      setIsloading(false)
       setModalVisible(true)
    }
  };


  const resendOTP = async () => {
    setError(''); // Clear previous errors
    setModalVisible(false)
    // Basic validation
    if (!otp) {
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
        setError('Login failed. Please try again.');
         setModalVisible(true)
      }
    } catch (err) {
      setError('An error occurred. Please check your internet connection.');
    }
  };

//   useEffect(() => {
//     console.log('in useEffect...')
//      if (result?.type === 'success') {
//       const { code } = result.params;
//       // Use the 'code' and the 'request.codeVerifier' to fetch the access token
//       exchangeCodeForToken(code, request.codeVerifier);
//     }
//   }, [result]
//  );
  

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

