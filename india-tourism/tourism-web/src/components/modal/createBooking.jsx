// Import the UPI QR library
import QRCode from 'react-qr-code';
import '../../styles/bookingForm.css';
import { useEffect, useState, useContext} from "react";
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

  
const CreateBooking = ({ isOpen, onClose,prepareBookingData,bookingData }) => {
  
 //const {prepareBookingData,bookingData} = useContext(NavContext);
 const [touristData, setTouristData] = useState({
    name: '',
    email: '',
    mobile: '',
    ageGroup: '',
    gender: ''
  });
   const[displayErrorDialog,setDisplayErrorDialog] = useState(false);
     const[errorMessage,setErrorMessage] = useState('');
      const [dialogOpen, setDialogOpen] = useState(false);
 const touristNo = bookingData.length+1;
 //Update the booking payload with fields for each tourist
    const updateBooking = async(event) =>{
      
    const { name, value, type, checked } = event.target;
        
      setTouristData(prevData=>({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
      if(touristData)
      {
        console.log('tourist data....',touristData)
        
      }
    }

    //Opens or close the dialog box for error message validations
   const handleClickOpenOrClose = () => {
        
        setDialogOpen(!dialogOpen);
        if(!dialogOpen)
        {
           // setBookingId('');
            //setBookingUpdateId('');
            //setDisable(true)
             setDisplayErrorDialog(false);
         // setDialogOpen(false);
        }
    };

     //Validate the booking data
    const validateFields= async() =>{
       let errMsg = null;
       
                 console.log('booking to be validated....',touristData)
              errMsg =  await validateBookingData(touristData);
              if(errMsg)
                {
                  return errMsg;
                }else{
                  return null;
                }            
    }

const addTourist = async() =>{
    console.log('tourist data in addtourist...',touristData)
    if(touristData)
    {
         let errMsg =  await validateFields();
         if(errMsg)
          {
            setErrorMessage(errMsg);
            setDisplayErrorDialog(true)
            setDialogOpen(true);
            
          }
        prepareBookingData(touristData);
        if(touristData && touristData.length>0)
        {
            
            console.log('bookingdata...',touristData);
            
        }
    }
}
useEffect(()=>{
setTouristData({ name: '', email: '', mobile: '', ageGroup: '',gender: ''})
},[touristNo])

  if (!isOpen) return null;
  return (
    
   <div  className="modal-overlay">
      <div className="modal-content">
        <div>
            {displayErrorDialog?
        <Dialog
        open={dialogOpen}
        onClose={handleClickOpenOrClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Error Message</DialogTitle>
        <DialogContent>
           
          <DialogContentText id="dialog-description">
          
          {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpenOrClose}>Cancel</Button>
          <Button onClick={handleClickOpenOrClose} autoFocus>
           OK
          </Button>
          {dialogOpen?
          <img src={failure_animation} alt="" width="40" height="40"/>:
          <div></div>}
        </DialogActions>
      </Dialog>:<div></div>}
             <TableContainer sx={{boxShadow: 'none'}}>
                
                <Table>
                  <TableBody>
                     <TableRow>
                        <TableCell>
                            <Typography variant="body2" color="text.secondary" 
                        sx={{whiteSpace: 'pre-wrap'}}>
                        Add Details for Tourist# {touristNo}
                        </Typography>
                        </TableCell>
                        </TableRow>
                     <TableRow>
                        <TableCell>
                            <FormControl variant="outlined">
                         
                            <InputLabel htmlFor="component-outlined"
                            >Name</InputLabel>
                            <OutlinedInput id="name" name="name" 
                            value={touristData.name} 
                            inputProps={{
                                maxLength: 20,
                            }}
                             sx={{
                              backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                             borderRadius: 50, // Fully rounded (pill shape)
                             width: '500px',
                            }}
                            onChange = {updateBooking}
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
                             value={touristData.email}  inputProps={{
                                  maxLength: 50,
                                }}
                              sx={{
                             backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                             borderRadius: 50, // Fully rounded (pill shape)
                             width: '500px'
                              }}
                              onChange = {updateBooking}
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
                            value={touristData.mobile}  inputProps={{
                             maxLength: 10,
                               }}  sx={{
                              backgroundColor: 'rgba(109, 101, 101, 0.53)' ,
                             borderRadius: 50, // Fully rounded (pill shape)
                             width: '500px'
                              }}
                              onChange = {updateBooking}
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
                       value={touristData.ageGroup} sx={{ borderRadius: 'inherit',
                        backgroundColor: 'rgba(109, 101, 101, 0.53)', width:'100%'
                        }} onChange = {updateBooking} fullWidth
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
                       value={touristData.gender} onChange = {updateBooking} 
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
        <button onClick={addTourist} class="button">Add Tourist</button>
        </div>
        <div className='submit-container'>
        <button onClick={onClose} class="button">Close</button>
        
        </div>
        
        </div>
       </div>
       
      </div>
    </div>
   
  );
};

export default CreateBooking;