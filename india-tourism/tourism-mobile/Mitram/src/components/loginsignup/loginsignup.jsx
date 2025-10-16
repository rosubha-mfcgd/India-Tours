import React, { useState, useRef , useEffect} from 'react';
 import { Image } from 'react-native';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

import {signupUser,loginUser} from '../admin/admin';
import { View,TouchableOpacity } from 'react-native';

import LoginSignUpStyle from '../stylecomp/loginsignup'; 


import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


const LoginSignup =({navigation}) => {

        const [action,setAction] = useState("Sign Up");
        const[name,setName] = useState('');
        const[email,setEmail] = useState('');
        const[mobile,setMobile] = useState('');
        
        const [isLoading, setIsLoading] = useState(false);
        const [buttonPress, setButtonPress] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [loginOrsignup,setLoginOrSignup] = useState('signup');
        const clientId = process.env.REACT_APP_CLIENT_ID;
        
     const handleNameChange  = (event) =>{
            setName(event.target.value);
            }
        const handleEmailChange = (event) =>{
                setEmail(event.target.value);
                }
        const handleMobileChange  = (event) =>{
                    setMobile(event.target.value);
            }
       const [request, response, promptAsync] = Google.useAuthRequest({
   // expoClientId: 'YOUR_EXPO_CLIENT_ID', // Optional, but recommended for better UX
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.REACT_APP_CLIENT_ID,
    scopes: ['profile', 'email'], // Request necessary scopes
  });
  
        //SIGNUP A NEW USER
        const googlesignup = async() =>{
            try{
          
             setLoginOrSignup('signup');
             await promptAsync();
          
        }catch(err){
                 
          // user cancelled the login flow
          console.log('Login Failed for error code:', error.code)
        } 
        }

    
        //LOGIN USER
        const googleLogin =  async() =>{

             try{
     
                 setLoginOrSignup('login');
                 promptAsync();
         
        }catch(err)
        {
           // user cancelled the login flow
          console.log('Login Failed for error code:', error.code)  
        }
        };          
         useEffect(()=>
           {

               if(buttonPress && errorMessage === '')
                {
                    setIsLoading(true);
                }else{
                    setIsLoading(false);
                }
               
                if(action === 'Login' && errorMessage != '')
                {
                    setErrorMessage('');
                }
                

           },[buttonPress,errorMessage,action]);

           //This useEffect is triggered when user signup or login
    useEffect(() => {
        async function onGoogleAuthSuccess(){
        console.log('response....',response);
           if(response?.type === 'success'){

                const {authentication} = response;

                console.log('access_token....',authentication.accessToken)
                if(loginOrsignup === 'signup')
                {
                    setAction("Sign Up");

                    const req_data = {
                    name:name,
                    email:email,
                    mobile:mobile,
                    access_token:authentication.accessToken
                };
                try{
                    setButtonPress(true);
               
                    let resdata = await signupUser(req_data);
               
                    if(resdata){
                        console.log('resdata access token...',resdata.access_token);
                        console.log('resdata code...',resdata.code);
                  
                        let access_token = resdata.access_token;
                      if(access_token){
                            if( resdata.status != 200 && resdata.code != 'Y')
                            {
                                setErrorMessage(resdata.message);
                            }
                        else{
                        navigation.navigate('/sendotp',{
                             "name":name,
                            "mobile":mobile,
                            "email":email,
                            "access_token":access_token});
                        }
                    }
                }
            }catch(error){
                console.log(error);
                
            }
             }
                else if(loginOrsignup === 'login')
                {
                   setAction("Send Otp"); 

                   const req_data = {
                    email:email,
                    mobile:mobile,
                    access_token:authentication.accessToken
                };
                try{
                    setButtonPress(true);
                    let resdata = await loginUser(req_data);
                
                if(resdata)
                {
                   console.log('resdata access token in login flow...',resdata.access_token);
                   console.log('resdata code ...',resdata.code);
                   let access_token = resdata.access_token;
                    if(access_token){
                        if(resdata.status != 200 && resdata.code != 'Y')
                        {
                            setErrorMessage(resdata.message);
                        }
                        else{
                        navigate('/sendotp',{state:{
                             "mobile":mobile,
                            "email":email,
                            "access_token":access_token}});
                        }
                    }
                }
            }catch(error){
                 console.log(error);
            }
            }
              setButtonPress(false);  // Hide spinner after fetch (success or error)
            }else{
                console.log('invalid response received...')
            }
        }
        if(response){
            onGoogleAuthSuccess();
        }
      }, [response]);
           
        
        
        // onPress handler function of the button should use window.open instead 
        // of axios or fetch

            return (
              <View style={LoginSignUpStyle.centeredContainer}>
      
                {isLoading ? (
                  <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh' }}
        >
                     <ProgressBar />
                     </View>
                ):(
                   
               <View style={LoginSignUpStyle.container}>
               
                        <View style={LoginSignUpStyle.header}>
                            <View style={LoginSignUpStyle.centeredText}><Text>{action}</Text></View>
                            
                            <View className='underline'></View>

                        </View>
                         {errorMessage ? 
                         (<View style={LoginSignUpStyle.errordivattop}><Text>{errorMessage}</Text></View>):
                        (<View></View>)
                    }
                        <View style={LoginSignUpStyle.inputs}>
                        
                        {
                        action === 'Sign Up'?

                        
                        <View>
                            <View style={LoginSignUpStyle.input}>
                            <Image source ={require('../Assets/input/username.png')} alt=""/>
                            <TextInput label="Name" value = {name} onChangeText = {handleNameChange} 
                            variant="outlined"/>
                        </View>
                        <View style={LoginSignUpStyle.input}>
                            <Image source={require('../Assets/input/mobile.png')} alt=""/>
                            <TextInput label="Mobile" value = {mobile} onChangeText = {handleMobileChange} 
                            variant="outlined"/>
                        </View>
                        <View style={LoginSignUpStyle.input} >
                            <Image source={require('../Assets/input/email.png')} alt=""/>
                            <TextInput label="Email" value = {email} onChangeText = {handleEmailChange} 
                            variant="outlined"/>
                        </View>
                    </View>:
                        <View>
                            <View style={LoginSignUpStyle.input}>
                            <Image source={require('../Assets/input/mobile.png')} alt=""/>
                            <TextInput label="Mobile" value = {mobile} onChangeText = {handleMobileChange} 
                            variant="outlined"/>
                        </View>
                        <br/>
                        <View style={LoginSignUpStyle.input}><Text>OR</Text></View>
                        <br/>
                        <View style={LoginSignUpStyle.input} >
                            <Image source={require('../Assets/input/email.png')} alt=""/>
                            <TextInput label="Email" value = {email} onChangeText = {handleEmailChange} 
                            variant="outlined"/>
                        </View>
                        </View>
                        }
                        </View>
                        {action === 'Sign Up'?
                            <View style={LoginSignUpStyle.forgotpassword}><Text>Lost Password? <Text>Click Here!</Text></Text></View>:<br/>
                        }
                        {action === 'Sign Up'?  
                        <View style={LoginSignUpStyle.submitcontainer}>
                    
                        <TouchableOpacity 
                          style={LoginSignUpStyle.submit}
                          onPress={googlesignup}><Text>Sign Up</Text></TouchableOpacity>
                    
                            <TouchableOpacity 
                           onPress={()=>{setAction("Login");}}><Text>Login</Text></TouchableOpacity>
                        </View>:<br/>
                        }

                        {action === 'Login'?
                        <View className='submit-container'>
                    <TouchableOpacity 
                      style={{ width: 192, height: 48 }}
                           
                    onPress={googleLogin}><Text>Send Otp</Text></TouchableOpacity> 
                    <TouchableOpacity 
                      
                        onPress={()=>{setAction("Sign Up");
                        navigate('-1');
                    }}>Cancel</TouchableOpacity> 
                    </View> :<View></View> 
                        }
                    </View> 
                    )}
                    </View> 
                
            );
        }
export default LoginSignup
