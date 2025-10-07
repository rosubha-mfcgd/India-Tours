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
     IconButton
     
  } from "@mui/material";

import {ListItem, ListItemButton, ListItemText} 
   from '@mui/material';
  import ChevronRightIcon from '@mui/icons-material/ChevronRight';


 const SideBarNotification=()=> {
   const [open, setOpen] = useState(true);

        const handleDrawerClose = () => {
            setOpen(false);
        };
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: "#28282B" // Set your desired background color here
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
                    <List>
                        {['My Profile','Share Points', 'My Preferences', 'Tour Operators', 'About Us'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </StyledDrawer>
                {/* Main content of your application */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* Your application's main content goes here */}
                </Box>
            </Box>
  );

  

}

export default SideBarNotification
