import React, { useState, useRef , useEffect, useContext} from 'react';
import { Text, View } from 'react-native';

import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

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
               
         <Appbar position="static" style= {{ backgroundColor: '#19857b' }}>
            <Appbar style= {{ justifyContent: 'space-between' }}>
            <Text variant="h6" component="div">
              India Tours
            </Text>
            <View>
              <Text variant="body1">
                Welcome, Guest !!
              </Text>
              {/* Add other right-aligned elements here */}
             
            </View>
          <View> <Text>{dateTime.toLocaleTimeString()}</Text></View>
       
            <View>
              <Text> {dateTime.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}</Text>

              {/* <Link href="signup" style ={{ color: 'white' }}>Sign In</Link> */}
            </View>

          
    </Appbar>
     </Appbar>
     </View>
     </View>
    );
  };

export default Header;
