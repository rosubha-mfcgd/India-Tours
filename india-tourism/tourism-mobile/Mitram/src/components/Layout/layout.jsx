 import React from 'react';
 import '../../styles/loginsignup.css';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'
}
 const Layout = ({ children }) => {

  const theme = createTheme({
           palette: {
             background: {
               paper: 'rgba(110, 43, 41, 0)', // Your desired hex color
             },
           },
         }); 
      return (
        
      
        <div className="original-content">
          
           <main>{children}</main> {/* This is where your page content will be rendered */}
        </div>
       
      );
    };

    export default Layout;