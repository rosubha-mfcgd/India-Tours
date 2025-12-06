import  { useEffect, useState } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, ActivityIndicator,
    TouchableOpacity,Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For storing tokens
import LoginSignUpStyle from '../../styles/loginsignup.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black,Inter_900Black_Italic } from '@expo-google-fonts/inter'; 
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import {Link,useRouter} from 'expo-router';
import {loginUser,getApiAccessToken,persistDataInCache,getDataFromCache} from '../../admin/admin.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthCommonModal from '../../admin/authCommonModal.js'
import 'react-native-get-random-values'; // This must precede `uuid`
import { v4 as uuidv4 } from 'uuid';
export default function LoginUser(){

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
   const[modalVisible,setModalVisible] = useState(false);
   const [userProfile,setUserProfile] = useState('');
   const[isLoggedIn,setLoggedIn] = useState(false)
   const router = useRouter();
   
  const [fontsLoaded] = useFonts({
      'Inter-Black': Inter_900Black, // Assign a name to the loaded font
      'Poppins-Regular': Poppins_400Regular,
      'Poppins-SemiBold': Poppins_600SemiBold,
      'Inter-Black-Header': Inter_900Black_Italic
    });
  


const handleLogin = async () => {
    setError(''); // Clear previous errors

    // Basic validation
    if (!email && !mobile) 
    {
      setError('Please enter both email and mobile.');
      setModalVisible(true);
      return;
    }else{
      setModalVisible(false);
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
        let data = response;
        console.log('data...',data);
        if(response.code === 'NF'|| response.code === 'N')
        {
              setError(response.message);
              setModalVisible(true);
        }else{
            let deviceID = await SecureStore.getItemAsync('appDeviceID');
            if(deviceID){
                  console.log('deviceID is ...',deviceID)
                  // Assuming your API returns a token on success
                await SecureStore.setItemAsync(deviceID,  
                  JSON.stringify(data));

                // await SecureStore.setItemAsync('userToken', data.token);
                  //await persistDataInCache(deviceID,token);
                  router.push({
                        pathname: "/login/profile",
                    params: {  mobile: mobile,email:email}
                    });
            }
      }
      } else {
        setError('Login failed. Please try again.');
        setModalVisible(true);
      }
    }else{
      console.log('No device id found')
       setError('Invalid device detected, please try from an android or ios platform');
        setModalVisible(true);
    }
    
    } catch (err) {
      setError('An error occurred. Please check your internet connection.');
    }
  
  }

   useEffect(()=>{
     let mounted = true;
      
       console.log('useEffect invoked....');
    const timer = setTimeout( () =>{
                
                    const checkIfUserLoggedIn = async () =>{
                    
                       let deviceID = await SecureStore.getItemAsync('appDeviceID');
                       if(!deviceID)
                       {
                            deviceID = uuidv4();
                            await SecureStore.setItemAsync('appDeviceID', deviceID);
                          
                       }
                       
                          console.log('deviceID is ...',deviceID)
                         let result = await SecureStore.getItemAsync(deviceID);
                      
                         if(result)
                         {
                            setUserProfile(result);
                           setLoggedIn(true)
                            router.push({
                         pathname: "/login/profile",
                         params: { 
                              profile: JSON.stringify(userProfile)
                           }})
                         }
                         else{
                            setLoggedIn(false)
                         }
                       
                        
                    };
                   if(mounted)
                   {
                     
                      checkIfUserLoggedIn();
                       
                    }
                   }
                  ,100);

                   return () => {
                        mounted = false; // Set flag to false on cleanup
                        clearTimeout(timer); // Clean up the timer
                  };

                  
  },
  []);


  return (
    fontsLoaded?
    <KeyboardAvoidingView style = {LoginSignUpStyle.centeredContainer}
     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
    
    >
   <Text style={{ fontFamily: 'Inter-Black-Header',
      color:'#f3f3f3d7',fontSize:50 }}>Login</Text>
    <View
      style={LoginSignUpStyle.flexboxcontainer}>
       
       

       <Ionicons name="mail-open" size={24} color="#fcf1f1ff"></Ionicons>


      <TextInput
        style={LoginSignUpStyle.textfieldunderlinedInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
</View>
<View>
        {error ?  <AuthCommonModal modalVisible={modalVisible} 
            setModalVisible={setModalVisible} errorMessage={error}/>
        
        : null}
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
                    onPress={handleLogin} >Login</Text>
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
    
          
    </View>
    </View>
    
    </KeyboardAvoidingView>:
    <View style={TourCommonStyle.centeredContainer}>
            <ActivityIndicator 
            size="large" color="#3c3ca7ff"/>
            </View>
    
  );

}

