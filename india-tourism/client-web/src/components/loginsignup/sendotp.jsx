import React, { useState } from 'react';
import mobile_icon from '../Assets/input/mobile.png';
import email_icon from '../Assets/input/email.png';
import { useNavigate,useLocation } from 'react-router-dom';
import '../../styles/loginsignup.css';
import Box from '@mui/material/Box';
import {
    TextField
   } from "@mui/material";
import {validateOTPForLogin} from '../admin/admin';
const Sendotp = ()=>{
   const navigate = useNavigate();
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
                            "name":location.state.name,
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

    <Box className='centre-div'>
<div className = "container">
   {errorMessage ? 
                         (<div className='error-div-at-top'>{errorMessage}</div>):
                        (<div></div>)
                    }
<div className='inputs'>
     <div className='input'>
                <img src={mobile_icon} alt=""/>
              
        <TextField  label="Mobile Number"
      variant="outlined"
      defaultValue=""
      value={location.state.mobile}
      slotProps={{ htmlInput: { maxLength: 10,inputLabel: {
          style: {
            fontWeight: 'bold',
          },
        }  } }} 
             
      disabled/>


               </div>
                <div className='input'>
                <img src={email_icon} alt=""/>
                 <TextField  label="Email"
                    variant="outlined"
                    defaultValue=""
                    value={location.state.email}
                    slotProps={{ htmlInput: { maxLength: 100,inputLabel: {
          style: {
            fontWeight: 'bold',
          },
        }  } }} disabled/>
               </div>
     <div className='input'>
                <img src={mobile_icon} alt=""/>

                 <TextField label="OTP" value = {otp} onChange = {handleOTPChange} variant="outlined"/>
                </div>
                    <Box className='centre-div'>
                    <div className='submit-container'>
                        <div className={"submit"} onClick={()=>{validateOTP()}}>Validate OTP</div>
                        </div>
                    </Box>
    </div>
</div>
</Box>
);
};

export default Sendotp 