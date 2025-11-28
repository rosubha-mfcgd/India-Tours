import { StyleSheet, Text, View } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup'
import React, { useState, useRef , useEffect} from 'react';
export default function ValidateOTP()
{
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
return(
<View style={LoginSignUpStyle.centeredContainer}>
<Text>This is login page !!</Text>

</View>
);


}