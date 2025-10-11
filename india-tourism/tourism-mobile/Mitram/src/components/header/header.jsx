import React, { useState, useRef , useEffect, useContext} from 'react';
import '../../styles/loginsignup.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
     Link,
     CssBaseline,
  } from "@mui/material";
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
        <div>
             <div>
                <CssBaseline/>
         <AppBar position="static" sx={{ backgroundColor: '#19857b' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              India Tours
            </Typography>
            <Box>
              <Typography variant="body1">
                Welcome, Guest !!
              </Typography>
              {/* Add other right-aligned elements here */}
             
            </Box>
          <Box> <p>{dateTime.toLocaleTimeString()}</p></Box>
       

 {/* <Typography variant="body2">
               About us
              </Typography> */}

            <Box>
               <p>{dateTime.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}</p>

              <Link href="signup" sx={{ color: 'white' }}>Sign In</Link>
            </Box>

          
    </Toolbar>
     </AppBar>
     </View>
     </View>
    );
  };

export default Header;