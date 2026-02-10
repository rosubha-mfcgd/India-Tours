// Import the UPI QR library
import QRCode from 'react-qr-code';
import '../../styles/bookingForm.css';
import { useEffect, useState} from "react";
import {validateBookingData} from "../admin/utility";
import failure_animation from '../Assets/images/failure_animation.gif';
import { styled } from '@mui/material/styles';
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
    DialogActions,
    MenuItem
  } from "@mui/material";

  
const EditBooking = ({ isOpen, onClose,updateBookingData,editingItem,index
}) => {
const [touristData, setTouristData] = useState({
    name: editingItem.name,
    email: editingItem.email,
    mobile: editingItem.mobile,
    ageGroup: editingItem.ageGroup,
    gender:  editingItem.gender
  });

  const updateBooking = async(event) =>{
     const { name, value, type, checked } = event.target;
        console.log('field name....',name)
      setTouristData(prevData=>({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
      
      console.log('updated tourist data....',touristData);
  }

  
  
 const[displayErrorDialog,setDisplayErrorDialog] = useState(false);
 const[errorMessage,setErrorMessage] = useState('');
 const [dialogOpen, setDialogOpen] = useState(false);

if (!isOpen) return null;
  return (
    <div  className="modal-overlay">
      <div className="modal-content">
         <TableContainer sx={{boxShadow: 'none'}}>
                
                <Table>
                  <TableBody>
                     <TableRow>
                        <TableCell>
                            <Typography variant="body2" color="text.secondary" 
                        sx={{whiteSpace: 'pre-wrap'}}>
                        Edit Details for {editingItem.name}
                        </Typography>
                        </TableCell>
                        </TableRow>
                     <TableRow>
                        <TableCell>
                            <FormControl variant="outlined">
                         
                            <InputLabel htmlFor="component-outlined"
                            >Name</InputLabel>
                            <OutlinedInput id="name" name="name" 
                            defaultValue={touristData.name} 
                            inputProps={{
                                maxLength: 20,
                            }}
                             sx={{
                              backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                             borderRadius: 50, // Fully rounded (pill shape)
                             width: '500px',
                            }} onChange = {updateBooking}
                            /> 
                            </FormControl>
                             </TableCell>
                             </TableRow>
                             <TableRow>
                             <TableCell>
                              <FormControl>
                                
                            <InputLabel 
                            style={{ color: '#0c0000ff', }} 
                            variant="outlined">Email</InputLabel>
                            <OutlinedInput id="email" name="email" 
                             defaultValue={touristData.email}  inputProps={{
                                  maxLength: 50,
                                }}
                              sx={{
                             backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                             borderRadius: 50, // Fully rounded (pill shape)
                             width: '500px' 
                              }} onChange = {updateBooking} 
                              />
                            </FormControl>
                                 </TableCell>
                                 </TableRow>
                                 <TableRow> 
                                   <TableCell>
                               <FormControl style={{ marginLeft: 5 }}>
                               
                            <InputLabel 
                            style={{ color: '#0c0000ff' }} 
                            variant="outlined">Mobile</InputLabel>
                            <OutlinedInput id="mobile" name="mobile" 
                            defaultValue={editingItem.mobile}  inputProps={{
                             maxLength: 10,
                               }}  sx={{
                              backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                             borderRadius: 50, // Fully rounded (pill shape)
                             width: '500px'
                              }} onChange = {updateBooking}
                              />
                                </FormControl>
                                </TableCell>
                                 </TableRow>
                                 <TableRow>
                                    <TableCell>
                  <FormControl  variant="outlined" sx={{ borderRadius: '20px' }} fullWidth> 
                       <InputLabel 
                            style={{ color: '#0c0000ff' }} 
                            variant="outlined" >Age Group</InputLabel>               
                    <Select
                      labelId="select-label"
                      id="ageGroup" name="ageGroup"
                      label="ageGroup"
                       defaultValue={touristData.ageGroup} sx={{ borderRadius: 'inherit',
                        backgroundColor: 'rgba(109, 101, 101, 0.53)', width:'100%'
                        }}  onChange = {updateBooking}
                         fullWidth
                       >
                      <MenuItem value={"Minor"}>Minor</MenuItem>
                      <MenuItem value={"Adult"}>Adult</MenuItem>
                      <MenuItem value={"SeniorCitizen"}>Senior Citizen</MenuItem>
                    </Select>
                  </FormControl>
                 </TableCell>
                 </TableRow>
                 <TableRow>
                 <TableCell>
                  <FormControl  variant="outlined" sx={{ borderRadius: '20px' }} fullWidth> 
                        <InputLabel 
                            style={{ color: '#0c0000ff' }} 
                            variant="outlined" >Gender</InputLabel>              
                    <Select  sx={{ borderRadius: 'inherit',
                    backgroundColor: 'rgba(109, 101, 101, 0.53)', width:'100%' }}
                     labelId="select-label"
                      id="gender" name="gender"
                      label="gender"
                       defaultValue={touristData.gender} onChange = {updateBooking}
                       >
                      <MenuItem value={"Select"}>Select</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                  </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                  </TableContainer>
                  <div className="button-container-2">
          <div className='submit-container'>
        <button onClick={()=>updateBookingData(touristData,index)} class="button">Edit Tourist</button>
        </div>
        <div className='submit-container'>
        <button onClick={onClose} class="button">Close</button>
        
        </div>
        
        </div>
        </div>
        </div>
)
};

export default EditBooking;
