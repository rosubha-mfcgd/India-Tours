import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons.jsx'
import { useEffect, useState, useContext} from "react";
import { styled } from '@mui/material/styles';
import {getBookingsByBookingId} from "../admin/admin";
import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
import close_button from '../Assets/images/close-button.png';
import failure_animation from '../Assets/images/failure_animation.gif';
import { NavContext } from '../navigationContext/navigationContext.jsx';
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
    TextareaAutosize,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
  } from "@mui/material";


const CustomBookingForm = ({access_token,cityList,triggerDisplayOptionsByCatId}) =>{
   // console.log('tourdetails.....',tourDetails);
    const [startBooking,setStartBooking] = useState(false);
    const [touristCount, setTouristCount] = useState(0);
    const[openBookingForm,setOpenBookingForm] = useState(true);
    const [noOfTourist,setNoOfTourist] = useState(0);
    const [bookingPageMessage,setBookingPageMessage] = useState('');
    const [bookingid,setBookingid] = useState('');
     const [bookingData,setBookingData] = useState('');
     const[currentBooking,setCurrentBooking] = useState('');
     const[displayErrorDialog,setDisplayErrorDialog] = useState(false);
     const[errorMessage,setErrorMessage] = useState('');
         const [dialogOpen, setDialogOpen] = useState(false);
         const[showBookingBtn,setShowBookingBtn] = useState(true);
  const { notification} = useContext(NavContext);
    const CssTextField = styled(TextField)({
      '& label': {
        color: '#FFFF', // Default label color
       }  
  });

    const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Thank you for your message!');
  };
 return(
        <div className = "center-container">
              
                    <div className="original-content">
             <div className="form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Book My Trip</h2>
        
        <div className="form-group">
          <label htmlFor="username">Full Name</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </div>

         <div className="form-group">
          <label htmlFor="mobile">Mobile #</label>
          <input type="mobile" id="mobile" name="mobile" required />
        </div>


        <div className="form-group">
          <label htmlFor="source">Travelling from:</label>
          <input type="text" id="source" name="source" required />
        </div>


         <div className="form-group">
          <label htmlFor="destination">Travelling to:</label>
          <input type="text" id="destination" name="destination" required />
        </div>

       <div className="form-group">
          <label htmlFor="startdate">From:</label>
          <input type="date" id="startdate" name="startdate" required />
        </div>

          <div className="form-group">
          <label htmlFor="enddate">To:</label>
          <input type="date" id="todate" name="todate" required />
        </div>

      

        <div className="form-group">
          <label htmlFor="message">Travelling from:</label>
          <textarea id="source" name="source" rows="4"></textarea>
        </div>

        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
    </div>
    </div>
    </div>
          
    );
  }
export default CustomBookingForm  