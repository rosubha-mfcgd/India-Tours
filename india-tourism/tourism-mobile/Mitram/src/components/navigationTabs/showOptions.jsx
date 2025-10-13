
import CategoryStyle from '../stylecomp/navbar'; 
import CardStyle from '../stylecomp/cards'; 
import SidebarStyle from '../stylecomp/sidebar'; 
import BookingFormStyle from '../stylecomp/bookingForm'; 
import { TouchableOpacity } from 'react-native';
import { useEffect, useState, useContext} from "react";
  import { useNavigation, useLocation } from '@react-navigation/native'; 
 import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import {getOptions,updateAsFavorite} from "../admin/admin.js";
import SideBarNotification from './sideBarNotification.jsx';
import { NavContext } from '../navigationContext/navigationContext.jsx';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'


  const DisplayOptions = ({access_token,triggerDisplayTasksByOptionID,productID,categoryID}) =>{

 const navigate = useNavigation();
     const location = useLocation();
    const { notification} = useContext(NavContext);
     const [items, setItems] = useState('')

      const updateOptionsAsFavorites = async(optionid, status,event) =>{

        if(status === 'Y') {
             event.target.style.color='#f04646ff';
        }else{
           event.target.style.color='#140202ff'; 
        }
        let data = {
                    "optionId":optionid,
                    "status" : status
                    }
                
                    console.log('Option updates coming soon');
       }

     useEffect(()=>{
                 let mounted = true;
     
                 const timer = setTimeout(() =>{
                     
                         const getOptionsByProductAndCategory = async (productID,categoryID) =>{
                        
                         let options = await getOptions(productID,categoryID);
                         
                         if(options)
                         {
                             console.log('options...',options);
                             setItems(options);
                         }
                        
                     };
     
                     
                     if(items==='')
                     {
                         getOptionsByProductAndCategory(productID,categoryID);
                     }},100);
             
         return () => {
             mounted = false; // Set flag to false on cleanup
             clearTimeout(timer); // Clean up the timer
         };
     
               },[]);
    return ( 
    <View  style={CategoryStyle.navbargrid}>
        <div style={CategoryStyle.navbar}>
            <View container spacing={10} justify="center" width="70%">
             {items && items.length>0 ?

                items.map((item) => (
               <View>
                 
                <View item xs = {12} sm={4}  key={item.optionID}>

                    <Card style={CardStyle.card}>
                    
                    <Card.Cover 
                    source = {item.image} 
                    height="100"
                    onPress={()=>triggerDisplayTasksByOptionID(item.optionID)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <Card.Content>
                        <Text gutterBottom variant="body1" component="div" sx={{whiteSpace: 'pre-wrap'}}>
                {item.optionName}
              </Text>
              <Text variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                {item.optionDesc}
              </Text>
              {(item.favorite === 'Y') ?
                <MaterialIcons  color= '#f04646ff' onPress = {(event) => updateOptionsAsFavorites(
                    item.optionID,'N',event)} style={{ cursor: 'pointer' }}/>:
                <MaterialIcons onPress = {(event) => updateOptionsAsFavorites(
                    item.optionID,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </Card.Content>
              <TouchableOpacity type="submit" class="button"  
              onPress={()=>triggerDisplayTasksByOptionID(item.optionID)} 
            style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                        Click to View</TouchableOpacity>
                    </Card>
                </View>
                
                </View>
                )
                ):<View>Cannot load options</View>
                
             }
            
            </View>
          {notification ?
               <View style={{position: 'fixed', top:70,right:0}} >    
               <SideBarNotification/> 
            </View> 
            :<View></View>
             }
            </div>
        </View>

  )}

  export default DisplayOptions;
