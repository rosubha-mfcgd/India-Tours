import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons'
import { useEffect, useState, useContext} from "react";
import { styled } from '@mui/material/styles';
import {getBookingsByBookingId} from "../admin/admin";
import SideBarNotification from '../navigationTabs/sideBarNotification';
import close_button from '../Assets/images/close-button.png';
import failure_animation from '../Assets/images/failure_animation.gif';
import {validateBookingData} from "../admin/utility";
import CreateBooking from "../modal/createBooking"
import { NavContext } from '../navigationContext/navigationContext';
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
    Card,
    Grid,
    OutlinedInput,
    Typography,
    CardMedia,
    CardContent,
    FormGroup,
    FormControl,  
    Input,
    Switch,
    Select,
    InputLabel,
    TextareaAutosize,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
  } from "@mui/material";

import MenuItem from '@mui/material/MenuItem';
import DynamicTable from '../Utilities/DynamicTable';
 import { NavContext } from '../navigationContext/navigationContext';
const CreateBookingDashboard = ({access_token,tourDetails,triggerDisplayBookings,
    triggerEditBookingForm}) =>{

 const [openBookingForm, setOpenBookingForm] = useState(true);       
 const {bookingData} = useContext(NavContext);
 const columns = [
          { field: 'name', headerName: 'Name' },
          { field: 'mobile', headerName: 'Mobile' },
          { field: 'email', headerName: 'Email' },
          { field: 'ageGroup', headerName: 'AgeGroup' },
          { field: 'gender', headerName: 'Gender' }
  ];
  return(
        <div className='navbar-grid'>
            <div className = "center-container">
              
                    <div className="original-content">
                       <div  display="flex"
      justifyContent="center"
      alignItems="center"
      // Example height for visualization
      width="100%">
          {/* <Typography variant="body2" style={{ color: '#FFFFFF' }}>{bookingPageMessage}</Typography> */}
         <Paper sx={{ 
         backgroundColor:'#F8F9FA',
          backgroundRepeat: 'no-repeat',
          padding: 2, // theme.spacing(2)
          textAlign: 'center', // Centers the text itself horizontally
          display: 'flex',
          flexDirection: 'column', // Ensures children stack vertically
          justifyContent: 'center', // Centers children vertically
          alignItems: 'center', // Centers children horizontally
          height: '100%',
          width: '100%', // Example width for demonstration 
          }}>
          {
          bookingData && bookingData.length >0 ?
           (
              <DynamicTable columns={columns} data={bookingData}/>  
             
       ):<div/>
          }</Paper></div> 
{
    openBookingForm ? 
    <CreateBooking isOpen={openBookingForm} onClose={() => setOpenBookingForm(false)}/>:<div/>
}
                    </div>
                    </div>
                    </div>
  )}
export default CreateBookingDashboard