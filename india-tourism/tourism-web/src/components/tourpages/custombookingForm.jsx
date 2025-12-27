import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import CustomButton from '../Utilities/CustomButtons.jsx'
import { useEffect, useState, useContext} from "react";
import { styled } from '@mui/material/styles';
import {performCustomUserTripBooking} from "../admin/admin";
import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
import close_button from '../Assets/images/close-button.png';
import failure_animation from '../Assets/images/failure_animation.gif';
import { NavContext } from '../navigationContext/navigationContext.jsx';
import { IoAdd} from 'react-icons/io5';
import Select from 'react-select';
import {
    TextField
   } from "@mui/material";
import { green } from '@mui/material/colors';


const CustomBookingForm = ({access_token,cityList,triggerDisplayOptionsByCatId}) =>{
   // console.log('tourdetails.....',tourDetails);
    
    const [selectedTravelType, setSelectedTravelType] = useState('Train');
    const [selectedHotelType, setSelectedHotelType] = useState('');
    const [selectedFromCity, setSelectedFromCity] = useState(null);
    const [selectedToCity, setSelectedToCity] = useState('');

    const [selectedFromDate, setSelectedFromDate] = useState(null);
    const [selectedToDate, setSelectedToDate] = useState(null);

    const [touristCount, setTouristCount] = useState(1);
    
    const [citydropdownList, setCitydropdownList] = useState([]);
    
    const [touristMap, setTouristMap] = useState([{"touristCount": 1}]);
    const[openBookingForm,setOpenBookingForm] = useState(true);
    const [noOfTourist,setNoOfTourist] = useState(0);
    const [bookingPageMessage,setBookingPageMessage] = useState('');
    const [bookingid,setBookingid] = useState('');
    const [bookingData,setBookingData] = useState([]);
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

  //   const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   message: '',
  //   startdate: '',
  //   todate: '',
  // });
  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log('Form Data Submitted:', formData);
   let result = {};
   result.fromLocation = selectedFromCity.value;
   result.destLocation = selectedToCity.value;
   result.startDate = selectedFromDate;
   result.endDate = selectedToDate;
   result.travelMode = selectedTravelType;
   result.hotelType = selectedHotelType;
   result.touristData = bookingData;
    alert('Thank you for your message!');
    console.log('result is...',result);
  };
const handleTravelModeChange = (e)=>{
  const { name, value, type } = e.target||{}; 
 //  const data = e.target.value;
 if(name === 'travelMode' && type === 'radio'){
  console.log('travel mode is..',value);
  setSelectedTravelType(value);
 }
 
}
const handleHotelChange = (e)=>{
   const { name, value, type } = e.target||{}; 
  if(name === 'hotelType' && type === 'radio'){
   console.log('hotel mode is..',value);
  setSelectedHotelType(value)
 }
}
const handleFromDate = (e)=>{
  const { name, value, type } = e.target||{}; 
  if(name === 'startdate' && type === 'date'){
  console.log('from date is..',value);
  setSelectedFromDate(value);
  }
}

const handleToDate = (e)=>{
    const { name, value, type } = e.target||{}; 
      if(name === 'todate' && type === 'date'){
        console.log('to date is..',value);
        setSelectedToDate(value);
      }
}
const addTourist = ()=>{
  
    setTouristCount(touristCount=>touristCount+1);
    
}

 const updateCustomBooking = (index,fieldName,e) =>{
     
  const { value, type } = e.target||{}; 
      if(value && (type === 'text'  ||type === 'email'||type === 'radio'))
      {
        let fieldVal = value;
        console.log('fieldVal....',fieldVal)
        if(fieldVal.trim().length> 0)
        {
          console.log('index....',index)
            bookingData[index-1][fieldName]= fieldVal;
            console.log('bookingdata....',bookingData);
        }
      }
    
    }

    const handleFromCityDropdown = async(option) =>{

        setSelectedFromCity(option);
       // setSelectedToCity(citydropdownList);
    }

     const handleToCityDropdown = async(option) =>{

       // setSelectedFromCity(option);
        setSelectedToCity(option);
    }
useEffect (()=>{
  let data = [];
  if(touristCount>1){
        let tourist =  {"touristCount": touristCount};
        
          setTouristMap(touristItem =>[...touristItem,tourist]);
          
  }
        if(citydropdownList && citydropdownList.length === 0)
            {
              for(let city of cityList)
              {
                if(city.citycode>0)
                {
                  let data = {value:city.citycode,label:city.cityname};
                  setCitydropdownList(citydropdown =>[...citydropdown,data]);
                }
              }
        }
         for(let index=bookingData.length;index<touristCount;index++)
          {
            bookingData[index] = {};
          }
          console.log("bookingData....",bookingData)
 

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
        options={citydropdownList}
        value={selectedFromCity}
        onChange={handleFromCityDropdown}
        isClearable
        isSearchable={true} // Enables type assist
        placeholder="Type to search..."
        noOptionsMessage={() => "Source city not found"}
      />
        </div>


         <div className="form-group">
          <label htmlFor="destination">Travelling to:</label>
            <Select
        id="to-city-select"
        options={citydropdownList}
        value={selectedToCity}
        onChange={handleToCityDropdown}
        isClearable
        isSearchable={true} // Enables type assist
        placeholder="Type to search..."
        noOptionsMessage={() => "Destination city not found"}
      />
        </div>

       <div className="form-group">
          <label htmlFor="startdate">From:</label>
          <input type="date" id="startdate" name="startdate" 
          onChange={handleFromDate}
          required />
        </div>

          <div className="form-group">
          <label htmlFor="enddate">To:</label>
          <input type="date" id="todate" name="todate" onChange={handleToDate}
           required />
        </div>

          <div className="form-group">
 <fieldset style={{ border: 'none', padding: 0 }}>
      <legend style={{ fontWeight: 'bold' }}>Preferred Travel Mode:</legend>
      
      <label>
        <input 
          type="radio" 
          name="travelMode" 
          value="Flight" 
          checked={selectedTravelType === 'Flight'} 
          onChange={handleTravelModeChange} 
        />
        Flight
      </label>

      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="travelMode" 
          value="Train" 
          checked={selectedTravelType === 'Train'} 
          onChange={handleTravelModeChange} 
        />
        Train
      </label>
      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="travelMode" 
          value="Bus" 
          checked={selectedTravelType === 'Bus'} 
          onChange={handleTravelModeChange} 
        />
        Bus
      </label>
      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="travelMode" 
          value="Car" 
          checked={selectedTravelType === 'Car'} 
          onChange={handleTravelModeChange} 
        />
        Car
      </label>
    </fieldset>

          </div>     
    
   <div className="form-group">
 <fieldset style={{ border: 'none', padding: 0 }}>
      <legend style={{ fontWeight: 'bold' }}>Preferred Hotel Type:</legend>
      
      <label>
        <input 
          type="radio" 
          name="hotelType" 
          value="Luxury" 
          checked={selectedHotelType === 'Luxury'} 
          onChange={handleHotelChange} 
        />
        Luxury (5-Star, 4 -Star)
      </label>

      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="hotelType" 
          value="Budget" 
          checked={selectedHotelType === 'Budget'} 
          onChange={handleHotelChange} 
        />
        Budget (3-Star)
      </label>
      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="hotelType" 
          value="Economy" 
          checked={selectedHotelType === 'Economy'} 
          onChange={handleHotelChange} 
        />
        Economy
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
          onChange={(event)=>updateCustomBooking(tourist.touristCount,"username",event)} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" 
          onChange={(event)=>updateCustomBooking(tourist.touristCount,"email",event)}
          required />
        </div>

         <div className="form-group">
          <label htmlFor="mobile">Mobile #</label>
          <input type="mobile" id="mobile" name="mobile" 
          onChange={(event)=>updateCustomBooking(tourist.touristCount,"mobile",event)}
          required />
        </div>
            <div className="form-group">
        <fieldset style={{ border: 'none', padding: 0 }}>
         
      <label>
        <input 
          type="radio" 
          name="travellerType" 
          value="1" 
          onChange={(event)=>updateCustomBooking(tourist.touristCount,"travellerType",event)} 
        />
        Senior citizen (above 60 years)
      </label>

      <label style={{ marginLeft: '10px' }}>
        <input 
          type="radio" 
          name="travellerType" 
          value="2" 
          onChange={(event)=>updateCustomBooking(tourist.touristCount,"travellerType",event)} 
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