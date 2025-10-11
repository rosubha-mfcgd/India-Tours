import React, {useEffect, useState } from "react";
import styled from "styled-components";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
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
     Snackbar,
     CssBaseline,
     Drawer,
     Box,List,
     AppBar,
     Toolbar,
     IconButton,
     Typography,
     InputLabel,
     MenuItem   
  } from "@mui/material";

 import NativeSelect from '@mui/material/NativeSelect';
import {ListItem, ListItemButton, ListItemText} 
   from '@mui/material';
  import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import '../../styles/sidebarForSorting.css';
 const SideBarFilter=({selectedValue,setSelectedValue,priceValue, 
  setPriceValue,
    triplengthValue, setTriplengthValue,cityList,cityvalue,setCityvalue})=> {
     const[cityFilterList, setCityFilterList] = useState('')
   const [open, setOpen] = useState(true);
    
     // Handle changes to the slider's value
  const handlePriceSliderChange = (event) => {
    setPriceValue(event.target.value);
  };
  const handleTripLengthSliderChange = (event) => {
    setTriplengthValue(event.target.value);
  };
  const handleCityValueChange = (event) => {

    console.log('here....')
    setCityvalue(event.target.value);
  };
 const handleDrawerClose = () => {
            setOpen(false);
        };
    const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: "#01130ad5" // Set your desired background color here
     },
    }));

const handleChange = (event) => {
      setSelectedValue(event.target.value);
   }; 

  
  return (
            <Box sx={{ display: 'flex' }}>
            
                <StyledDrawer
                    variant="persistent" // Or "temporary", "permanent"
                    anchor="right"
                    open={open}
                    sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { // Target the Paper component within the Drawer
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: 'lightblue', // Example background color
          borderRadius: '0 16px 16px 0', // Example rounded corners
        },
      }} 
                >
                    <Box sx={{ display: 'flex', 
                      alignItems: 'center', justifyContent: 'flex-end', 
                      padding: 1 }}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronRightIcon onClick={handleDrawerClose}/>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', 
                      alignItems: 'center', justifyContent: 'flex-end', 
                      padding: 1 }}>
                        <Typography variant="body2" color="common.white">Filter </Typography>
                    </Box>
                    <List>
                      <ListItem>
                         
                        <FormControl fullWidth>
                           <Typography variant="body2" color="common.black">
                               Tour Operator Location
                            </Typography>

  <NativeSelect
    defaultValue={cityvalue}
    inputProps={{
      name: 'cities',
      id: 'uncontrolled-native',
    }} onChange={handleCityValueChange}
   >
{
 cityList && cityList.length>0?
cityList.map((city) =>(

<option value={city.citycode}>{city.cityname}</option>

))
:<option  aria-label="None"  value="0">All</option>
}
</NativeSelect>
</FormControl>
                      </ListItem>
                        {
                        ['Price', 'TripLength','DomesticOrInternational'] .
                         map((text, index) => ( (
                            <ListItem>
                              {
                               text == 'Price'?
                              <div>
                            <Typography variant="body2" color="common.black">
                                {text} - {priceValue}
                            </Typography>
                                                   
                                <input type="range" 
                                value= {priceValue} 
                                onChange={handlePriceSliderChange} list="pricelist" 
                                min="10000" max="100000"
                                />  
                                 <datalist id="pricelist">
                        <option value="10000" label="10k"></option>
                       <option value="50000" label="50k"></option>
                        <option value="100000" label="100k"></option>
                       <option value="500000" label="500k"></option>
                        <option value="1000000" label=">=1000k"></option>
                        </datalist>
                                </div>:
                                text == 'TripLength'?
                              <div>
                            <Typography variant="body2" color="common.black">
                                {text} - {triplengthValue}
                            </Typography>
                                                   
                                <input type="range"
                                
                                value= {triplengthValue} 
                                onChange={handleTripLengthSliderChange} 
                                list="triplengthlist" min="1" max="30"/>  
                        <datalist id="triplengthlist">
                        <option value="1" label="1"></option>
                        <option value="7" label="7"></option>
                        <option value="14" label="14"></option>
                        <option value="21" label="21"></option>
                        <option value="30" label=">=30"></option>
                        </datalist>
                                </div>:
                            text === 'DomesticOrInternational'?
                                <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                               <Typography variant="body2" color="common.black">Type of Tour?
                                </Typography>
                               </FormLabel>
      <RadioGroup
        aria-label="options"
        name="my-radio-group"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel value="I" control={<Radio/>} label="International" />
        <FormControlLabel value="D" control={<Radio/>} label="Domestic" />
         <FormControlLabel value="B" control={<Radio/>} label="Both" />
     </RadioGroup>
     </FormControl>

     </div>:<div></div>
     }  
     </ListItem>
    )))}
                    </List> 
                </StyledDrawer>
                {/* Main content of your application */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* Your application's main content goes here */}
                </Box>
            </Box>
  );

  

}

export default SideBarFilter
