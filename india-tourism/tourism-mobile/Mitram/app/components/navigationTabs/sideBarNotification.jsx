import React, { useState } from "react";

import {Appbar,Avatar,Button,Card,Checkbox,
Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,
SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,
Tooltip,TouchableRipple} from 
'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialIcons';

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
            <View style={{ display: 'flex' }}>
            
                <StyledDrawer
                    variant="persistent" // Or "temporary", "permanent"
                    anchor="right"
                    open={open} 
                >
                    <View style={{ display: 'flex', 
                      alignItems: 'center', justifyContent: 'flex-end', 
                      padding: 1 }}>
                        <IconButton onPress={handleDrawerClose}>
                           

                            <Icon name="chevron-right" size={30} color="#900"/>
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
                <View component="main" style={{ flexGrow: 1, p: 3 }}>
                    {/* Your application's main content goes here */}
                </View>
            </View>
  );

  

}

export default SideBarNotification
