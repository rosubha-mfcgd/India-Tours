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



const PreviewForm = ({access_token,bookings,tourDetailsParam}) =>{

    const[disable,setDisable] = useState(true);
    const[touristkey,setTouristkey] = useState(0);
    console.log('bookings...',bookings)
    var sum = 0;

function increment () {
     sum += 1;
   //setTouristkey(sum);
    return sum;
}
 const updateBooking = async(name,index,event) =>{
        bookings[index-1][name]= event.target.value;
        console.log('bookingdata....',bookings);
    }
const triggerEditable = () =>{
    setDisable(!disable);
}
  
    return(<div className = "center-container">
            <div style={{border: "2px solid black;" }}>
                 <Box  component="form" >
                              <TableContainer>
                                <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>
                                    
                                    <Typography variant="h5" style={{ color: 'hsla(0, 32%, 92%, 1.00)' }}>
                                    Booking details for {tourDetailsParam.locationName} tour by {tourDetailsParam.tourManagerName}
                                    </Typography>
                                   
                                        </TableCell>
                                        <TableCell>
                                         <button type="button" onClick={()=>{
                        triggerEditable()}}
                       class="button" 
                        >Edit </button>

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
                                                <Input id="name" name="name" value = {booking.name} 
                                                disabled={disable} onChange={(event)=>updateBooking("name",sum,event)}
                                                
                                                />
                                                 </FormControl>
                                                  <FormControl style={{ marginLeft: 5 }}>
                                                    
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Email</InputLabel>
                                                <Input id="email" name="email" value = {booking.email} 
                                                disabled={disable} onChange={(event)=>updateBooking("email",sum,event)}/>
                                                </FormControl>
                                                     
                                                   <FormControl style={{ marginLeft: 5 }}>
                                                   
                                                <InputLabel 
                                                style={{ color: '#0c0000ff' }}
                                                variant="outlined" fullWidth>Mobile</InputLabel>
                                                <Input id="mobile" name="mobile" value = {booking.mobile} disabled={disable}
                                                onChange={(event)=>updateBooking("mobile",sum,event)}/>
                                                    </FormControl>
                                                    <FormControl style={{ marginLeft: 5 }}> 
                                                      
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Age</InputLabel>
                                                 <Input id="age" name="age" value = {booking.age} disabled={disable} 
                                                 onChange={(event)=>updateBooking("age",sum,event)}/>  
                                                </FormControl>
                                                  <FormControl style={{ marginLeft: 5 }}> 
                                                     
                                                  <InputLabel 
                                                  style={{ color: '#080000ff' }}
                                                  variant="outlined" fullWidth>Any Special request?</InputLabel>
                                                 <Input id="specialRequest" name="specialRequest" 
                                                value = {booking.specialRequest} disabled={disable} 
                                                onChange={(event)=>updateBooking("specialRequest",sum,event)}/>  
                                                </FormControl>
                                              </div>
                           
                            )
                        ):<div></div>
                   }
                    </Paper>
                   
                   <div className="button-container">
         <div className='submit-container'>
                    <button type="submit" 
                        class="button"
                        >Go Back</button>

                            <button type="submit" 
                       class="button">Confirm Booking</button>
                       
        </div>
      </div>
                   
                   
                   
                   
                   

                           
              
            </div>
    </div>)
}

export default PreviewForm;