import React, { useState,  useEffect, useContext} from 'react';

import {getPoints} from '../admin/admin';
import {View,Text} from 'react-native'
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

import { NavContext } from '../navigationContext/navigationContext.jsx';
const UserProfile = ({name,email,mobile,access_token}) =>{
const [anchorEl, setAnchorEl] = useState(null);
const [dateTime, setDateTime] = useState(new Date());
const [points,setPoints] = useState(0);
const[isOpen,setOpen] = useState(false);
const open = Boolean(anchorEl);
const {triggerNotification} = useContext(NavContext);
function toggleSideBar()
{
  console.log('isOpen',isOpen)
  setOpen(!isOpen);
  triggerNotification(!isOpen);
}
useEffect(()=>{

  const fetchPoints = async()=>{
   const req_data = {
                    name:name,
                    email:email,
                    mobile:mobile,
                    access_token:access_token
                };
  let userPoint = await getPoints(req_data);
  
  if(userPoint)
  {
    console.log('userPoint....',userPoint);
    setPoints(userPoint.points);
  }else{
    setPoints("NF");
  }
};
fetchPoints();
},[]);

useEffect(()=>{
const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second for a live clock
return () => clearInterval(timer); // Clean up the interval on unmount
});


return (
        <View>
             <View>
               
         <Appbar position="static" style={{ backgroundColor: '#19857b' }}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
            <Text variant="h5" component="div">
              India Tours
            </Text>
            <Box>
              <Text variant="body1">
                Welcome, {name} 
              </Text>
              {/* Add other right-aligned elements here */}
            </Box>
            <Box>
               <Text variant="body2">
                {email}  
              </Text> 
               <Text variant="body2">
                {mobile}  
              </Text> 
            </Box>

            <Box>
                <Text variant="body2"  gutterBottom>Points {points}</Text>
            </Box>
              
              <Text>{dateTime.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})} {dateTime.toLocaleTimeString()}</Text>
               
            <Box>
              
            </Box>
            <Box>
                 <IconButton
      aria-label="menu"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onPress={(event) => {
        setAnchorEl(event.currentTarget)
        
      }}
    >
     
      <MenuIcon onPress={toggleSideBar} />

    </IconButton>
   
            </Box>
          </Toolbar>
         </Appbar>
          </View>
        </View>
    );
  };

export default UserProfile;
