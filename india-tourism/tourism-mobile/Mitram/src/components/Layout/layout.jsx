 import React from 'react';
 import { ThemeProvider,  createTheme } from '@rneui/themed';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'
import {View} from 'react-native'
 const Layout = ({ children }) => {

  const theme = createTheme({
           palette: {
             background: {
               paper: 'rgba(110, 43, 41, 0)', // Your desired hex color
             },
           },
         }); 
      return (
        
      
        <View className="original-content">
          
           <main>{children}</main> {/* This is where your page content will be rendered */}
        </View>
       
      );
    };

    export default Layout;
