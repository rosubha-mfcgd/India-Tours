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
import {signupUser,loginUser} from '../admin/admin';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
     Snackbar,
     CssBaseline,
  } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu'; // Or any other icon



const UserProfile = ({name,email,mobile}) =>{
const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
        <div>
             <div>
                <CssBaseline/>
         <AppBar position="static" sx={{ backgroundColor: '#19857b' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h5" component="div">
              India Tours
            </Typography>
            <Box>
              <Typography variant="body1">
                Welcome, {name} 
              </Typography>
              {/* Add other right-aligned elements here */}
            </Box>
            <Box>
               <Typography variant="body2">
                {email}  
              </Typography> 
               <Typography variant="body2">
                {mobile}  
              </Typography> 
            </Box>

            <Box>
                <Typography variant="h4" component="h2" gutterBottom>Points 50</Typography>
            </Box>
            <Box>
                 <IconButton
      aria-label="menu"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={(event) => setAnchorEl(event.currentTarget)}
    >
      <MenuIcon />
    </IconButton>
            </Box>
          </Toolbar>
         </AppBar>
          </div>
        </div>
    );
  };

export default UserProfile;