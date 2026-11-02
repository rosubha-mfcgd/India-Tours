import { NavLink , useLocation,useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/searchbar.css';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useEffect, useState, useContext } from "react";
import {
    FormLabel,
    TextField,
     FormControl, 
     Autocomplete,
     InputLabel, 
     MenuItem,
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

import Select from 'react-select';
import { useDeviceType } from '../admin/checkDeviceType';
import { NavContext } from '../navigationContext/navigationContext';
import SideBarNotification from './sideBarNotification'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
const SearchBar = ({access_token, dataList}) =>{

     // 1. Define state to manage the selected value
  const [selectedDest, setSelectedDest] = useState(31);
     // Managing state using Day.js
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

   // 3. Handle change event when an option is selected
  const handleChange = (selectedOption) => {
      if (selectedOption) {
         console.log("Selected City ID:", selectedOption.value);
        console.log("Selected City Name:", selectedOption.label);
    }
    setSelectedDest(selectedOption);
  
  };

  // 1. Define your custom styles object
const customStyles = {
  // Styles for the text that shows inside the select input box
  singleValue: (provided) => ({
    ...provided,
    color: '#333333',     // Change font color
    fontSize: '16px',     // Change font size
  }),
  // Styles for the individual items inside the dropdown menu
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#ffffff' : '#555555', // Change font color (handles active/selected states)
    fontSize: '14px',                                // Change font size
  }),
  // Optional: Styles for the placeholder text
  placeholder: (provided) => ({
    ...provided,
    color: '#999999',
    fontSize: '16px',
  })
};
        return (<div className="searchbar">
                 {/* Field 1: Text Input */}
 <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
    {/* <TextField 
        id="search-input" 
        label="Enter the city/town you want to visit..." 
        variant="outlined" // Options: "outlined", "filled", "standard"
        placeholder="Enter the city/town you want to visit..."
        style={{ padding: '8px', flex: '1', minWidth: '150px' }}
      /> */}
      <FormLabel 
        htmlFor="destination-choice"
        sx={{ 
          color: 'purple', 
           
        }}
      >
        Choose your travel destination:
      </FormLabel>

      {/* Native Input linked to the Datalist */}
   <Select
           id="from-city-select"
           options={dataList}
           value={selectedDest}
           onChange={handleChange}
           isClearable
           isSearchable={true} // Enables type assist
           placeholder="Type to search..."
           noOptionsMessage={() => "Source city not found"}
           styles={customStyles}
         />

      {/* The Datalist carrying the options */}
      
      
    </div>
      <div>  
       
     <DatePicker
        label="Check-in Date"
        value={startDate}
        onChange={(startDate) => setStartDate(startDate)}
        // Control the open state programmatically
        open={startDateOpen}
        onOpen={() => setStartDateOpen(true)}
        onClose={() => setStartDateOpen(false)}
        // Pass the onClick listener to the underlying TextField slot
        slotProps={{
          textField: {
            onClick: () => setStartDateOpen(true),
            // Optional: prevents mobile keyboard from fighting with the picker
            readOnly: true, 
          },
        }}
        // Style the input element itself
      className="custom-input-style" 
      // Style the calendar container wrapper
      calendarClassName="custom-calendar-style"
      />
    </div>
    <div>
      <DatePicker
        label="Check-out Date"
        value={endDate}
        onChange={(endDate) => setEndDate(endDate)}
        // Control the open state programmatically
        open={endDateOpen}
        onOpen={() => setEndDateOpen(true)}
        onClose={() => setEndDateOpen(false)}
        // Pass the onClick listener to the underlying TextField slot
        slotProps={{
          textField: {
            onClick: () => setEndDateOpen(true),
            // Optional: prevents mobile keyboard from fighting with the picker
            readOnly: true, 
          },
        }}
           // Style the input element itself
      className="custom-input-style" 
      // Style the calendar container wrapper
      calendarClassName="custom-calendar-style"
      />
      </div>
      <div>
           <button type="submit" 
                       class="button" 
                       >Search Hotel</button>
      </div>

       <div>
           <button type="submit" 
                       class="button" 
                       >My Transit Options</button>
      </div>
      </div>
    </LocalizationProvider>

            </div>)
    }

    export default SearchBar