import React, { useState, useRef , useEffect} from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom/client';
 import CircularProgress from '@mui/material/CircularProgress';
import '../../styles/loginsignup.css';
import email_icon from '../Assets/input/email.png';
import password_icon from '../Assets/input/password.png';
import user_icon from '../Assets/input/username.png';
import mobile_icon from '../Assets/input/mobile.png';
import Loading from "../Utilities/Loading/Loading.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {signupUser,loginUser,getAuthAccessToken} from '../admin/admin';


import {
    TextField,  
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Modal,
    Box,
    Snackbar,
  } from "@mui/material";

import {jwtDecode} from "jwt-decode"
import { useGoogleLogin } from '@react-oauth/google';


const LoginSignup =() => {

        const [action,setAction] = useState("Sign Up");
        const[name,setName] = useState('');
        const[email,setEmail] = useState('');
        const[mobile,setMobile] = useState('');
        const [childContent, setChildContent] = useState('');
        const [signUp,setSignUp] = useState('');
        const[user,setUser] = useState([]);
        const [ profile, setProfile ] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [buttonclick, setButtonclick] = useState(false);
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
        const signup = async() =>{

        // const googlesignup = useGoogleLogin ({
        //     client_id:process.env.REACT_APP_CLIENT_ID,
        //     onSuccess: async(codeResponse) => {
                
        //         setAction("Sign Up");
        //         const req_data = {
        //             name:name,
        //             email:email,
        //             mobile:mobile,
        //             access_token:codeResponse.access_token
        //         };
                try{
                    setAction("Sign Up")
                     let codeResponse = await getAuthAccessToken();
                     if(codeResponse)
                    {
                        console.log('codeResponse token for signup...',codeResponse.access_token)
                      const req_data = {
                           name:name,
                     email:email,
                     mobile:mobile,
                     access_token:codeResponse.access_token
                 }
                    setButtonclick(true);
               
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
                }else{
                   
                    setErrorMessage('Sign Up attempt failed, please try again')
                }
            }catch(error){
                console.log(error);
                
            }finally {
                setButtonclick(false); // Hide spinner after fetch (success or error)
             }
        //     }, 
            
        //     onError: (error) => console.log('Login Failed:', error)
        // });
            
    }
    
        //LOGIN USER
        const loginUsertoApp = async() =>{
        // const googleLogin =  useGoogleLogin({
        //     client_id:process.env.REACT_APP_CLIENT_ID,
        //     onSuccess: async(codeResponse) => {
                console.log('Trying google auth...')
                setAction("Send Otp");
                // navigate('sendotp', { replace: true });
               // setAction("Login");
                
                
                try{
                     setAction("Send Otp")
                     let codeResponse = await getAuthAccessToken();
                    if(codeResponse)
                    {

                            setButtonclick(true);
                            console.log('codeResponse token for login...',codeResponse.access_token)
                            const req_data = {
                            email:email,
                            mobile:mobile,
                            access_token:codeResponse.access_token
                        };

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
            }
            }catch(err){
                 console.log(err);
            }
            finally{
                  setButtonclick(false); // Hide spinner after fetch (success or error)
            }
        //     },
        //     onError: (error) => console.log('Login Failed:', error)
        // });
        }          
         useEffect(()=>
           {

               if(buttonclick && errorMessage === '')
                {
                    setIsLoading(true);
                }else{
                    setIsLoading(false);
                }
               
                if(action === 'Login' && errorMessage != '')
                {
                    setErrorMessage('');
                }
                

           },[buttonclick,errorMessage,action]);

           
        
        
        // onClick handler function of the button should use window.open instead 
        // of axios or fetch

            return (
              <div className="center-container">
      
                {isLoading ? (
                  <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Optional: Centers vertically within the viewport
      }}
    >
                     <CircularProgress />
                     </Box>
                ):(
                   
               <div className = "container">
               
                        <div className='header'>
                            <div className='text'>{action}</div>
                            
                            <div className='underline'></div>

                        </div>
                         {errorMessage ? 
                         (<div className='error-div-at-top'>{errorMessage}</div>):
                        (<div></div>)
                    }
                        <div className='inputs'>
                        
                        {
                        action === 'Sign Up'?

                        
                        <div>
                            <div className='input'>
                            <img src={user_icon} alt=""/>
                            <TextField label="Name" value = {name} onChange = {handleNameChange} 
                            variant="outlined"/>
                        </div>
                        <div className='input'>
                            <img src={mobile_icon} alt=""/>
                            <TextField label="Mobile" value = {mobile} onChange = {handleMobileChange} 
                            variant="outlined"/>
                        </div>
                        <div className='input' >
                            <img src={email_icon} alt=""/>
                            <TextField label="Email" value = {email} onChange = {handleEmailChange} 
                            variant="outlined"/>
                        </div>
                    </div>:
                        <div>
                            <div className='input'>
                            <img src={mobile_icon} alt=""/>
                            <TextField label="Mobile" value = {mobile} onChange = {handleMobileChange} 
                            variant="outlined"/>
                        </div>
                        <br/>
                        <div ALIGN = "center">OR</div>
                        <br/>
                        <div className='input' >
                            <img src={email_icon} alt=""/>
                            <TextField label="Email" value = {email} onChange = {handleEmailChange} 
                            variant="outlined"/>
                        </div>
                        </div>
                        }
                        </div>
                        {action === 'Sign Up'?
                            <div className='forgot-password'>Lost Password? <span>Click Here!</span></div>:<br/>
                        }
                        {action === 'Sign Up'?  
                        <div className='submit-container'>
                    
                        <div className={action==="Login"?"submit gray":"submit"} 
                        onClick={signup}>Sign Up</div>
                    
                            <div className={action==='Sign Up'?'submit gray':'submit'} 
                            onClick={()=>{setAction("Login");}}>Login</div>
                        </div>:<br/>
                        }

                        {action === 'Login'?
                        <div className='submit-container'>
                    <div className="submit" onClick={loginUsertoApp}>Send Otp</div>
                    <div className={action==="Login"?"submit gray":"submit"} 
                        onClick={()=>{setAction("Sign Up");
                        navigate('-1');
                    }}>Cancel</div>
                    </div>:<div></div>
                        }
                    </div>
                    )}
                    </div>
                
            );
};
export default LoginSignup