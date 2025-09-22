import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import { useEffect, useState, useContext } from "react";
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
    Typography,
    CardMedia,
    CardContent
  } from "@mui/material";

import { getCategories } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ClassNames } from "@emotion/react";

const BookingForm = ({access_token,tourDetails,triggerDisplayTripsByCatId}) =>{
    console.log('toudetails.....',tourDetails);
    const [startBooking,setStartBooking] = useState(false);
    const [touristCount, setTouristCount] = useState('');
    const initBooking = async() =>{
        setStartBooking(true);
    }
  


    return(
        
            <div className = "center-container">
                    <div className="original-content">
                       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        maxWidth: 400,
        margin: 'auto',
        bgcolor: 'hsla(155, 50%, 39%, 1.00)',
        cursor: 'pointer'
      }}
      noValidate
      autoComplete="off" onClick={()=>initBooking() }
     >
         <Typography variant="body2" style={{ color: 'rgba(17, 17, 17, 1)' }}>
                    Book your trip to {tourDetails.locationName} with {tourDetails.tourManagerName}    
        </Typography> 
           </Box>

        {startBooking ?
           <Box  component="form">
              <TableContainer sx={{boxShadow: 'none'}}>
                <Table>
                    <TableBody>
                        <TableCell>
                            How many people will be travelling ?   
                        </TableCell>
                        <TableCell>
                          <TextField id="standard-basic" label="Enter number of travellers" 
                          variant="standard" />    
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
           </Box>:<div></div>
        }
      </div>
    
            </div>
    );
}
export default BookingForm