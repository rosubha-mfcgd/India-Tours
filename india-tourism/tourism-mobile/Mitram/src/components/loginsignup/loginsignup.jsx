import React, { useState, useRef , useEffect} from 'react';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'
import '../../styles/loginsignup.css';
import email_icon from '../Assets/input/email.png';

import user_icon from '../Assets/input/username.png';
import mobile_icon from '../Assets/input/mobile.png';
  import { useNavigation } from '@react-navigation/native'; 
import {signupUser,loginUser} from '../admin/admin';
import { View } from 'react-native';



import { GoogleSignin, GoogleSigninButton, statusCodes } from 
'@react-native-google-signin/google-signin';



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
        const navigate = useNavigation();
        

  
        //SIGNUP A NEW USER
        const googlesignup = async() =>{
            try{
             await GoogleSignin.hasPlayServices();
             const userInfo = await GoogleSignin.signIn();
            if(userInfo){
                console.log('access_token....',userInfo.access_token)
                setAction("Sign Up");
                const req_data = {
                    name:name,
                    email:email,
                    mobile:mobile,
                    access_token:userInfo.access_token
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
            }
        }catch(err){
                 
          // user cancelled the login flow
          console.log('Login Failed for error code:', error.code)
        } 
        }

    
        //LOGIN USER
        const googleLogin =  async() =>{

             try{
             await GoogleSignin.hasPlayServices();
             const userInfo = await GoogleSignin.signIn();

          if(userInfo) {
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
            }
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

    useEffect(() => {
          GoogleSignin.configure({
            webClientId: process.env.REACT_APP_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and get access token)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // other configuration options as needed
      });
    }, []);
           
        
        
        // onPress handler function of the button should use window.open instead 
        // of axios or fetch

            return (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      
                {isLoading ? (
                  <View style={{ display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh' }}
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
                            <TextInput label="Name" value = {name} onChangeText = {handleNameChange} 
                            variant="outlined"/>
                        </View>
                        <View className='input'>
                            <img src={mobile_icon} alt=""/>
                            <TextInput label="Mobile" value = {mobile} onChangeText = {handleMobileChange} 
                            variant="outlined"/>
                        </View>
                        <View className='input' >
                            <img src={email_icon} alt=""/>
                            <TextInput label="Email" value = {email} onChangeText = {handleEmailChange} 
                            variant="outlined"/>
                        </View>
                    </View>:
                        <View>
                            <View className='input'>
                            <img src={mobile_icon} alt=""/>
                            <TextInput label="Mobile" value = {mobile} onChangeText = {handleMobileChange} 
                            variant="outlined"/>
                        </View>
                        <br/>
                        <View ALIGN = "center">OR</View>
                        <br/>
                        <View className='input' >
                            <img src={email_icon} alt=""/>
                            <TextInput label="Email" value = {email} onChangeText = {handleEmailChange} 
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
                    
                        <GoogleSigninButton 
                          style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                    className="submit" onPress={googlesignup}>Sign Up</GoogleSigninButton>
                    
                            <GoogleSigninButton 
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            className={action==='Sign Up'?'submit gray':'submit'} 
                            onPress={()=>{setAction("Login");}}>Login</GoogleSigninButton>
                        </View>:<br/>
                        }

                        {action === 'Login'?
                        <View className='submit-container'>
                    <GoogleSigninButton 
                      style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                    className="submit" onPress={googleLogin}>Send Otp</GoogleSigninButton> 
                    <GoogleSigninButton 
                      style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                    className={action==="Login"?"submit gray":"submit"} 
                        onPress={()=>{setAction("Sign Up");
                        navigate('-1');
                    }}>Cancel</GoogleSigninButton> 
                    </View> :<View></View> 
                        }
                    </View> 
                    )}
                    </View> 
                
            );
        }
export default LoginSignup