import React, { useState } from "react";
import styled from "styled-components";

import {
     Drawer,
     Box,List,
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
            <View sx={{ display: 'flex' }}>
            
                <StyledDrawer
                    variant="persistent" // Or "temporary", "permanent"
                    anchor="right"
                    open={open} 
                >
                    <View sx={{ display: 'flex', 
                      alignItems: 'center', justifyContent: 'flex-end', 
                      padding: 1 }}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronRightIcon onClick={handleDrawerClose}/>
                        </IconButton>
                    </View>
                    <List>
                        {['My Profile','Share Points', 'My Preferences', 
                        'Tour Operators', 'About Us'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </StyledDrawer>
                {/* Main content of your application */}
                <View component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* Your application's main content goes here */}
                </View>
            </View>
  );

  

}

export default SideBarNotification
