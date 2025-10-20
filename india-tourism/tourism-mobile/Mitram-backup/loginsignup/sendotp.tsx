import React, { useState } from 'react';
import mobile_icon from './assets/input/mobile.png';
import email_icon from '../assets/input/email.png';
 import { Image, TouchableOpacity } from 'react-native';
  import { useRoute } from '@react-navigation/native'; 
import LoginSignUpStyle from '../stylecomp/loginsignup'; 
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

   import { View } from 'react-native';
import {validateOTPForLogin} from '../admin/admin';
const Sendotp = ({navigation})=>{
   
     const route = useRoute();
    
     const[otp,setOtp] = useState('');
       const [errorMessage, setErrorMessage] = useState('');
     const handleOTPChange  = (event) =>{
                    setOtp(event.target.value);
            }

     const validateOTP = async() =>{
           const req_data = {
                    email:route.params.email,
                    mobile:route.params.mobile,
                    otp:otp,
                    access_token:route.params.access_token
                };

                let res_data = await validateOTPForLogin(req_data);

                if(res_data)
                {
                    console.log('res_data...',res_data);
                    let isValid = res_data.otpValid;

                    if(isValid === 'Y'){
                        navigation.navigate('/welcome',{
                            "name":res_data.name,
                           "email":location.state.email,
                          "mobile":location.state.mobile,
                         "access_token":location.state.access_token 
                        });
                    }else{
                      setErrorMessage(res_data.message);
                    }
                }else{
                      setErrorMessage('Could not login the user, try again !!');
                    }

     }


return (

    <View style={LoginSignUpStyle.centrediv}>
<View style={LoginSignUpStyle.container}>
   {errorMessage ? 
                         (<View style={LoginSignUpStyle.errordivattop}>
                          <Text>{errorMessage}</Text></View>):
                        (<View></View>)
                    }
<View style={LoginSignUpStyle.inputs}>
     <View style={LoginSignUpStyle.input} >
                <Image source={require('../Assets/input/mobile.png')} alt=""/>
              
        <TextInput  label="Mobile Number"
      variant="outlined"
      defaultValue=""
      value={location.state.mobile}
      slotProps={{ htmlInput: { maxLength: 10,inputLabel: {
          style: {
            fontWeight: 'bold',
          },
        }  } }} 
             
      disabled/>


               </View>
                <View style={LoginSignUpStyle.input}>
                <Image source={require('../assets/input/email.png')} alt=""/>
                 <TextInput  label="Email"
                    defaultValue=""
                    value={location.state.email}
                    slotProps={{ htmlInput: { maxLength: 100,inputLabel: {
          style: {
            fontWeight: 'bold',
          },
        }  } }} disabled/>
               </View>
     <View style={LoginSignUpStyle.input}>
                <Image source={require('../assets/input/mobile.png')} alt=""/>

                 <TextInput label="OTP" value = {otp} onChangeText = {handleOTPChange} 
                />
                </View>
                    <View style={LoginSignUpStyle.centrediv}>
                   
                        <TouchableOpacity style={LoginSignUpStyle.submit} 
                        onPress={validateOTP}><Text>Validate OTP</Text></TouchableOpacity>
                       
                    </View>
    </View>
</View>
</View>
);
};

export default Sendotp 