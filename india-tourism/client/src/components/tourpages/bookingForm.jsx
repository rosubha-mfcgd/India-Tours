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

const BookingForm = ({access_token,tourDetails,triggerDisplayTripsByCatId}) =>{
    console.log('tourdetails.....',tourDetails);
    const [startBooking,setStartBooking] = useState(false);
    const [touristCount, setTouristCount] = useState('');
    const[openBookingForm,setOpenBookingForm] = useState(false);
    const initBooking = async() =>{
        setStartBooking(true);
    }
  
    const createForms = async(event) =>
    {
      let result = [];
      console.log('value is....',event.target.value)
      if(parseInt(event.target.value)>0)
      {
        setOpenBookingForm(true);
      }
      for(let count=1;count<=parseInt(event.target.value);count++)
      {
        let data = {"key":count,"value":count}
        result.push(data);
      }
      console.log('result...',result)
      setTouristCount(result);
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
        bgcolor: 'hsla(0, 73%, 50%, 1.00)',
        cursor: 'pointer',
         animation: 'blink-animation 5s linear infinite;'
      }}
      noValidate
      autoComplete="off" onClick={()=>initBooking() }
     >
         <Typography variant="body2" style={{ color: 'rgba(17, 17, 17, 1)' }}>
                  Click me to book your trip to {tourDetails.locationName} with {tourDetails.tourManagerName}    
        </Typography> 
           </Box>

        {startBooking ?
           <Box  component="form">
              <TableContainer sx={{boxShadow: 'none'}}>
                <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                           <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                            How many people will be travelling ?
                            </Typography>
                        </TableCell>
                        <TableCell>
                          <TextField id="standard-basic" 
                          sx={{ color: '#FFFFFF' }}
                          label="Enter number of travellers" 
                          variant="standard"
                          
                          onBlur={(event)=>createForms(event)} />    
                        </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
           </Box>:<div></div>
        }
     {
        openBookingForm ?
        <div style={{border: "2px solid black;" /* 2px width, solid style, black color */}}>
          
          {
            touristCount && touristCount.length >0 ?
            touristCount.map((tourist)=>(
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
             <Typography variant="body2" style={{ color: '#FFFFFF' }}> 
              <strong>Tourist #{tourist.key}</strong>

               </Typography>
                </h2>
                <FormControl>
             
                <InputLabel variant="outlined" 
                style={{ color: '#FFFFFF' }}
                fullWidth>Name:</InputLabel>
                <Input id="name" />
                 </FormControl>
                  <FormControl style={{ marginLeft: 5 }}>
                <InputLabel 
                style={{ color: '#FFFFFF' }}
                variant="outlined" fullWidth>Email:</InputLabel>
                <Input id="email" />
                </FormControl>
                     
                   <FormControl style={{ marginLeft: 5 }}>
                <InputLabel 
                style={{ color: '#FFFFFF' }}
                variant="outlined" fullWidth>Mobile:</InputLabel>
                <Input id="mobile" />
                    </FormControl>
                    <FormControl style={{ marginLeft: 5 }}> 
                  <InputLabel 
                  style={{ color: '#FFFFFF' }}
                  variant="outlined" fullWidth>Age:</InputLabel>
                 <Input id="age" />  
                </FormControl>
              </div>
            )):<div></div>
          }</div>:<div></div>
        }
        { openBookingForm ? 
         <div className = "center-container" style={{
                    width: "fit-content",
                    margin: "auto",
                  }}>
        <Box  component="form">
             <Typography variant="body2" style={{ color: '#FFFFFF' }}>
               Any special preferences?
              </Typography>
          </Box>
           <Box  component="form">
            <TextareaAutosize
  aria-label="minimum height"
  minRows={3}
  placeholder="Enter your preferences?"
  style={{ width: 500 }}
/>
          </Box>
          
        <div className="button-container">
         <div className='submit-container'>
                    <button type="submit" 
                        class="button"
                        >Go Back</button>

                            <button type="submit" 
                       class="button" 
                        >Make Payment</button>
        </div>
      </div>
        </div>:<div></div>
    }
         </div>
         </div> 
          
    );
  }
export default BookingForm