import React, { useState, useRef , useEffect, useContext} from 'react';
import '../../styles/loginsignup.css';
import { Text, View, StyleSheet } from 'react-native';

import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

import { NavContext } from '../navigationContext/navigationContext.jsx';


const Header = () =>{
const [anchorEl, setAnchorEl] = useState(null);
const [dateTime, setDateTime] = useState(new Date());

const[isOpen,setOpen] = useState(false);
const open = Boolean(anchorEl);
const {triggerNotification} = useContext(NavContext);
function toggleSideBar(event)
{
  console.log('isOpen',isOpen)
  setOpen(!isOpen);
  triggerNotification(!isOpen);
}


useEffect(()=>{
const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second for a live clock
return () => clearInterval(timer); // Clean up the interval on unmount
});


return (
        <View>
             <View>
                <CssBaseline/>
         <AppBar position="static" sx={{ backgroundColor: '#19857b' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Text variant="h6" component="div">
              India Tours
            </Text>
            <View>
              <Text variant="body1">
                Welcome, Guest !!
              </Text>
              {/* Add other right-aligned elements here */}
             
            </View>
          <View> <p>{dateTime.toLocaleTimeString()}</p></View>
       
            <View>
               <p>{dateTime.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}</p>

              <Link href="signup" sx={{ color: 'white' }}>Sign In</Link>
            </View>

          
    </Toolbar>
     </AppBar>
     </View>
     </View>
    );
  };

export default Header;