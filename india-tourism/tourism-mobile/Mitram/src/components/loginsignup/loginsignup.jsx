import React, { useState, useRef , useEffect} from 'react';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'
import '../../styles/loginsignup.css';
import email_icon from '../Assets/input/email.png';

import user_icon from '../Assets/input/username.png';
import mobile_icon from '../Assets/input/mobile.png';
import { useNavigate } from 'react-router-dom';
import {signupUser,loginUser} from '../admin/admin';
import { View } from 'react-native';

import {
    TextField,  
    Box,
   
  } from "@mui/material";


import { useGoogleLogin } from '@react-oauth/google';


const LoginSignup =() => {

        const [action,setAction] = useState("Sign Up");
        const[name,setName] = useState('');
        const[email,setEmail] = useState('');
        const[mobile,setMobile] = useState('');
        
        const [isLoading, setIsLoading] = useState(false);
        const [buttonPress, setButtonPress] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
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
        const navigate = useNavigate();
        

  
        //SIGNUP A NEW USER
        const googlesignup = useGoogleLogin ({
            client_id:process.env.REACT_APP_CLIENT_ID,
            onSuccess: async(codeResponse) => {
                
                setAction("Sign Up");
                const req_data = {
                    name:name,
                    email:email,
                    mobile:mobile,
                    access_token:codeResponse.access_token
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
                        navigate('/sendotp',{state:{
                             "name":name,
                            "mobile":mobile,
                            "email":email,
                            "access_token":access_token}});
                        }
                    }
                }
            }catch(error){
                console.log(error);
                
            }finally {
                setButtonPress(false); // Hide spinner after fetch (success or error)
             }
            }, 
            
            onError: (error) => console.log('Login Failed:', error)
        });
    
        //LOGIN USER
        const googleLogin =  useGoogleLogin({
            client_id:process.env.REACT_APP_CLIENT_ID,
            onSuccess: async(codeResponse) => {
                console.log('Trying google auth...')
                setAction("Send Otp");
                       // navigate('sendotp', { replace: true });
               // setAction("Login");
                
                const req_data = {
                    email:email,
                    mobile:mobile,
                    access_token:codeResponse.access_token
                };
                try{
                    setButtonPress(true);
                    let resdata = await loginUser(req_data);
                
                if(resdata)
                {
                      console.log('resdata access token...',resdata.access_token);
                    console.log('resdata code...',resdata.code);
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
            finally{
                  setButtonPress(false); // Hide spinner after fetch (success or error)
            }
            },
            onError: (error) => console.log('Login Failed:', error)
        });          
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

           
        
        
        // onPress handler function of the button should use window.open instead 
        // of axios or fetch

            return (
              <View className="center-container">
      
                {isLoading ? (
                  <View
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Optional: Centers vertically within the viewport
      }}
    >
                     <ProgressBar />
                     </View>
                ):(
                   
               <View className = "container">
               
                        <View className='header'>
                            <View className='text'>{action}</View>
                            
                            <View className='underline'></View>

                        </View>
                         {errorMessage ? 
                         (<View className='error-div-at-top'>{errorMessage}</View>):
                        (<View></View>)
                    }
                        <View className='inputs'>
                        
                        {
                        action === 'Sign Up'?

                        
                        <View>
                            <View className='input'>
                            <img src={user_icon} alt=""/>
                            <TextField label="Name" value = {name} onChangeText = {handleNameChange} 
                            variant="outlined"/>
                        </View>
                        <View className='input'>
                            <img src={mobile_icon} alt=""/>
                            <TextField label="Mobile" value = {mobile} onChangeText = {handleMobileChange} 
                            variant="outlined"/>
                        </View>
                        <View className='input' >
                            <img src={email_icon} alt=""/>
                            <TextField label="Email" value = {email} onChangeText = {handleEmailChange} 
                            variant="outlined"/>
                        </View>
                    </View>:
                        <View>
                            <View className='input'>
                            <img src={mobile_icon} alt=""/>
                            <TextField label="Mobile" value = {mobile} onChangeText = {handleMobileChange} 
                            variant="outlined"/>
                        </View>
                        <br/>
                        <View ALIGN = "center">OR</View>
                        <br/>
                        <View className='input' >
                            <img src={email_icon} alt=""/>
                            <TextField label="Email" value = {email} onChangeText = {handleEmailChange} 
                            variant="outlined"/>
                        </View>
                        </View>
                        }
                        </View>
                        {action === 'Sign Up'?
                            <View className='forgot-password'>Lost Password? <span>Click Here!</span></View>:<br/>
                        }
                        {action === 'Sign Up'?  
                        <View className='submit-container'>
                    
                        <View className={action==="Login"?"submit gray":"submit"} 
                        onPress={()=>googlesignup()}>Sign Up</View>
                    
                            <View className={action==='Sign Up'?'submit gray':'submit'} 
                            onPress={()=>{setAction("Login");}}>Login</View>
                        </View>:<br/>
                        }

                        {action === 'Login'?
                        <View className='submit-container'>
                    <View className="submit" onPress={()=>{googleLogin();}}>Send Otp</View> 
                    <View className={action==="Login"?"submit gray":"submit"} 
                        onPress={()=>{setAction("Sign Up");
                        navigate('-1');
                    }}>Cancel</View> 
                    </View> :<View></View> 
                        }
                    </View> 
                    )}
                    </View> 
                
            );
};
export default LoginSignup