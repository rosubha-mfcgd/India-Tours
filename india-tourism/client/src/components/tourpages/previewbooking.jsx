import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
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
    CardContent,
    FormGroup,
    FormControl,  
    Input,
    Switch,
    InputLabel,
    TextareaAutosize
  } from "@mui/material";

import { getCategories } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ClassNames } from "@emotion/react";

const PreviewForm = ({access_token,bookings,tourDetailsParam}) =>{

    
    console.log('bookings...',bookings)
    var sum = 0;

function increment () {
     sum += 1;
   
    return sum;
}

    
    return(<div className = "center-container">
            <div style={{border: "2px solid black;" }}>
                 <Box  component="form" >
                              <TableContainer>
                                <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>
                                    <Typography variant="body2" style={{ color: 'rgba(17, 17, 17, 1)' }}>

                                    </Typography>
                                    <Typography variant="body2" style={{ color: 'rgba(17, 17, 17, 1)' }}>
                                    Booking details for {tourDetailsParam.locationName} with {tourDetailsParam.tourManagerName}
                                    </Typography>
                                        </TableCell>
                                        </TableRow>
                                        </TableBody>
                                        </Table>
                                        </TableContainer>
                                         </Box>
                            <Paper>
                   {bookings && bookings.length>0 ?
                        bookings.map((booking)=>(
                           
                                  <div className="head"
                                                style={{
                                                    width: "fit-content",
                                                    margin: "auto",
                                                   border: "2px solid black;"
                                                }}>
                                                
                                                <h2
                                                    style={{
                                                        color: "solid white"
                                                    }}
                                                >
                                            Tourist #{increment()}
                                                </h2>
                                                <FormControl>
                                             
                                                <InputLabel variant="outlined" 
                                                style={{ color: '#080000ff' }}
                                                fullWidth>Name</InputLabel>
                                                <Input id="name" name="name" value = {booking.name} disabled/>
                                                 </FormControl>
                                                  <FormControl style={{ marginLeft: 5 }}>
                                                    
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Email</InputLabel>
                                                <Input id="email" name="email" value = {booking.email} disabled/>
                                                </FormControl>
                                                     
                                                   <FormControl style={{ marginLeft: 5 }}>
                                                   
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Mobile</InputLabel>
                                                <Input id="mobile" name="mobile" value = {booking.mobile} disabled/>
                                                    </FormControl>
                                                    <FormControl style={{ marginLeft: 5 }}> 
                                                      
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Age</InputLabel>
                                                 <Input id="age" name="age" value = {booking.age} disabled />  
                                                </FormControl>
                                                  <FormControl style={{ marginLeft: 5 }}> 
                                                     
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Any Special request?</InputLabel>
                                                 <Input id="specialRequest" name="specialRequest" 
                                                value = {booking.specialRequest} disabled />  
                                                </FormControl>
                                              </div>
                           
                            )
                        ):<div></div>
                   }
                    </Paper>
                  
              
            </div>
    </div>)
}

export default PreviewForm;