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
import { IoAdd} from 'react-icons/io5';
import Select from 'react-select';
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
import { green } from '@mui/material/colors';


const CustomBookingForm = ({access_token,cityList,triggerDisplayOptionsByCatId}) =>{
   // console.log('tourdetails.....',tourDetails);
    const [startBooking,setStartBooking] = useState(false);
    const [selected, setSelected] = useState('Train');
    
    const [selectedFromCity, setSelectedFromCity] = useState('Kolkata');
    const [selectedToCity, setSelectedToCity] = useState('');
    const [touristCount, setTouristCount] = useState(1);
    const [clickAdd, setClickAdd] = useState(false);
    
    const [touristMap, setTouristMap] = useState([{"touristCount": 1}]);
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
const handleTravelModeChange = ()=>{
  console.log('travel mode is..');
}
const handleTravellerType = ()=>{
  console.log('travel mode is..');
}
const addTourist = ()=>{
  
    setTouristCount(touristCount=>touristCount+1);
    
}

 const updateBooking = async(name,index,id) =>{
      
      if(document.getElementsByName(id)[index-1])
      {
        let fieldVal = document.getElementsByName(id)[index-1].value;
        if(fieldVal.trim().length> 0)
        {
            bookingData[index-1][name]= fieldVal;
            console.log('bookingdata....',bookingData);
        }
      }
    }

useEffect (()=>{
  if(touristCount>1){
        let tourist =  {"touristCount": touristCount};
        
          setTouristMap(touristItem =>[...touristItem,tourist]);
          //setClickAdd(false)
  }
},[touristCount]);
 return(
        <div className = "center-container">
 <div className="original-content">
   <div className="form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
          <label htmlFor="source">Travelling from:</label>
        <Select
        id="from-city-select"
        options={cityList}
        value={selectedFromCity}
        onChange={setSelectedFromCity}
        isSearchable={true} // Enables type assist
        placeholder="Type to search..."
        noOptionsMessage={() => "Source city not found"}
      />
        </div>


         <div className="form-group">
          <label htmlFor="destination">Travelling to:</label>
            <Select
        id="to-city-select"
        options={cityList}
        value={selectedToCity}
        onChange={setSelectedToCity}
        isSearchable={true} // Enables type assist
        placeholder="Type to search..."
        noOptionsMessage={() => "Destination city not found"}
      />
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
 <fieldset style={{ border: 'none', padding: 0 }}>
      <legend style={{ fontWeight: 'bold' }}>Preferred Travel Mode:</legend>
      
      <label>
        <input 
          type="radio" 
          name="travelMode" 
          value="Flight" 
          checked={selected === 'Flight'} 
          onChange={handleTravelModeChange} 
        />
        Flight
      </label>

      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="travelMode" 
          value="Train" 
          checked={selected === 'Train'} 
          onChange={handleTravelModeChange} 
        />
        Train
      </label>
      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="travelMode" 
          value="Bus" 
          checked={selected === 'Bus'} 
          onChange={handleTravelModeChange} 
        />
        Bus
      </label>
      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="travelMode" 
          value="Car" 
          checked={selected === 'Car'} 
          onChange={handleTravelModeChange} 
        />
        Car
      </label>
    </fieldset>

          </div>     
                   
            
        <h2>Book My Trip  <IoAdd size={32} color="green" title='Add new tourist' onClick={addTourist}/></h2>
        
        {touristMap && touristMap.length>0 ?
        touristMap.map((tourist)=>(
          <div key={tourist.touristCount}>
              <h2>TOURIST # {tourist.touristCount}</h2>
        <div className="form-group">
          <label htmlFor="username">Full Name</label>
          <input type="text" id="username" name="username" 
          onChange={updateBooking('name','name',tourist.touristCount)} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" 
          onChange={updateBooking('email','email',tourist.touristCount)}
          required />
        </div>

         <div className="form-group">
          <label htmlFor="mobile">Mobile #</label>
          <input type="mobile" id="mobile" name="mobile" 
          onChange={updateBooking('email','email',tourist.touristCount)}
          required />
        </div>
            <div className="form-group">
        <fieldset style={{ border: 'none', padding: 0 }}>
         
      <label>
        <input 
          type="radio" 
          name="travelerType" 
          value="1" 
          onChange={handleTravellerType} 
        />
        Senior citizen (above 60 years)
      </label>

      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="travelerType" 
          value="2" 
          onChange={handleTravellerType} 
        />
        Minor (below 18 years)
      </label>
        
        </fieldset>
        </div>
        </div>

        )):<div/>
        }
       
      
       
      <button type="submit" className="submit-btn">Submit Request</button>
     </form>
    </div>
    </div>
    </div>
          
    );
  }
export default CustomBookingForm  