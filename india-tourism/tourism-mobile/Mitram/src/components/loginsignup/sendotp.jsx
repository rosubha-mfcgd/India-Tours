import React, { useState } from 'react';
import mobile_icon from '../Assets/input/mobile.png';
import email_icon from '../Assets/input/email.png';

  import { useNavigation, useLocation } from '@react-navigation/native'; 
import LoginSignUpStyle from '../stylecomp/loginsignup'; 
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

   import { View } from 'react-native';
import {validateOTPForLogin} from '../admin/admin';
const Sendotp = ()=>{
   const navigate = useNavigation();
     const location = useLocation();
    
     const[otp,setOtp] = useState('');
       const [errorMessage, setErrorMessage] = useState('');
     const handleOTPChange  = (event) =>{
                    setOtp(event.target.value);
            }

     const validateOTP = async() =>{
           const req_data = {
                    email:location.state.email,
                    mobile:location.state.mobile,
                    otp:otp,
                    access_token:location.state.access_token
                };

                let res_data = await validateOTPForLogin(req_data);

                if(res_data)
                {
                    console.log('res_data...',res_data);
                    let isValid = res_data.otpValid;

                    if(isValid === 'Y'){
                        navigate('/welcome',{state:{
                            "name":res_data.name,
                           "email":location.state.email,
                          "mobile":location.state.mobile,
                         "access_token":location.state.access_token 
                        }});
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
                         (<View style={LoginSignUpStyle.errordivattop}>{errorMessage}</View>):
                        (<View></View>)
                    }
<View style={LoginSignUpStyle.inputs}>
     <View style={LoginSignUpStyle.input} >
                <img src={mobile_icon} alt=""/>
              
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
                <img src={email_icon} alt=""/>
                 <TextInput  label="Email"
                    variant="outlined"
                    defaultValue=""
                    value={location.state.email}
                    slotProps={{ htmlInput: { maxLength: 100,inputLabel: {
          style: {
            fontWeight: 'bold',
          },
        }  } }} disabled/>
               </View>
     <View style={LoginSignUpStyle.input}>
                <img src={mobile_icon} alt=""/>

                 <TextInput label="OTP" value = {otp} onChangeText = {handleOTPChange} 
                 variant="outlined"/>
                </View>
                    <View style={LoginSignUpStyle.centrediv}>
                    <View style={LoginSignUpStyle.submitcontainer}>
                        <View style={LoginSignUpStyle.submit} 
                        onPress={()=>{validateOTP()}}>Validate OTP</View>
                        </View>
                    </View>
    </View>
</View>
</View>
);
};

export default Sendotp 