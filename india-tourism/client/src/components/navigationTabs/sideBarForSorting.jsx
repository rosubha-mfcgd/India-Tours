import React, { useState } from "react";
import styled from "styled-components";
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
     Typography
     
  } from "@mui/material";

import {ListItem, ListItemButton, ListItemText} 
   from '@mui/material';
  import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import '../../styles/sidebarForSorting.css';
 const SideBarforSorting=()=> {
   const [open, setOpen] = useState(true);
   const [priceValue, setPriceValue] = useState(50); // Default value is 50
    const [triplengthValue, setTriplengthValue] = useState(1); // Default value is 3
     // Handle changes to the slider's value
  const handlePriceSliderChange = (event) => {
    setPriceValue(event.target.value);
  };
  const handleTripLengthSliderChange = (event) => {
    setTriplengthValue(event.target.value);
  };
        const handleDrawerClose = () => {
            setOpen(false);
        };
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: "#01130ad5" // Set your desired background color here
  },
}));
        return (
            <Box sx={{ display: 'flex' }}>
            
                <StyledDrawer
                    variant="persistent" // Or "temporary", "permanent"
                    anchor="right"
                    open={open} 
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
                        {
                        ['Price', 'TripLength'] .
                         map((text, index) => ( (
                            <ListItem>
                              
                              {text == 'Price'?
                              <div>
                            <Typography variant="body2" color="common.black">
                                {text}
                            </Typography>
                                                   
                                <input type="range" 
                                value= {priceValue} 
                                onChange={handlePriceSliderChange} list="pricelist"/>  
                                 <datalist id="pricelist">
                        <option value="10k" label="10k"></option>
                       <option value="50k" label="50k"></option>
                        <option value="100k" label="100k"></option>
                       <option value="500k" label="500k"></option>
                        <option value="1000k" label="1000k"></option>
                        </datalist>
                                </div>:
                                text == 'TripLength'?
                              <div>
                            <Typography variant="body2" color="common.black">
                                {text}
                            </Typography>
                                                   
                                <input type="range"
                                
                                value= {triplengthValue} 
                                onChange={handleTripLengthSliderChange} 
                                step='10000'
                                list="triplengthlist"/>  
                        <datalist id="triplengthlist">
                        <option value="1" label="1"></option>
                        <option value="7" label="7"></option>
                        <option value="14" label="14"></option>
                        <option value="21" label="21"></option>
                        <option value="31" label="31"></option>
                        </datalist>
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

export default SideBarforSorting
