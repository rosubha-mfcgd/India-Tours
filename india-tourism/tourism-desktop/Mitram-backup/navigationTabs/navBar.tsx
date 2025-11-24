import CategoryStyle from '../stylecomp/navbar'; 
import CardStyle from '../stylecomp/cards'; 
import { TouchableOpacity } from 'react-native';
import { useEffect, useState, useContext } from "react";
 import { View,Text } from 'react-native';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

import { getCategories,updateAsFavorite } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import SideBarNotification from './sideBarNotification.jsx'
 import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const NavBar = ({access_token,triggerDisplayOptionsByCatId,
    productID}) =>{

    
    
       
    const { notification} = useContext(NavContext);
     const [items, setItems] = useState('');
    
    const navLinkStyles = ({isActive})=>{
            return {
                fontWeight:isActive?'bold':'normal',
                textDecoration:isActive?'none':'underline',
            }
        }

        const activeState = ({ isActive, isPending }) => {
            return {
            color: isPending ? "rgb(253 230 138)" : "",
            backgroundColor: isActive ? "rgb(69 26 3)" : "",
            fontWeight: isActive ? "bold" : ""
            };
          };

       const updateFavorites = async(categoryid, status,event) =>{

        if(status === 'Y') {
             event.target.style.color='#f04646ff';
        }else{
           event.target.style.color='#140202ff'; 
        }
        let data = {
                    "categoryId":categoryid,
                    "status" : status
                    }
                    let result = await updateAsFavorite(data);
                    if(result)
                    {
                       console.log('favorite result...',result)
                    }else{
                        console.log('could not update favorite')
                    }
       }
         
       
          useEffect(()=>{
            let mounted = true;

            const timer = setTimeout(() =>{
                
                    const getTripCategories = async (productID) =>{
                   
                    let categories = await getCategories(productID);
                    
                    if(categories)
                    {
                        console.log('categories...',categories);
                        setItems(categories);
                    }
                   
                };

                
                if(items==='')
                {
                    getTripCategories(productID);
                }},100);
        
    return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };
},[]);


    return (
        <View style = {CategoryStyle.navbargrid}>
        <View style={CategoryStyle.navbar}>
           <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
             {items && items.length>0 ?

                items.map((item) => (
               <View>
                 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}  xs = {12} sm={4}
                  key={item.categoryID}>
               
                    <Card style = {CardStyle.card}
                     >
                    
                    <Card.Cover  
                    Image = {item.image}  height={100} alt={item.categoryDesc} 
                    onPress={()=>triggerDisplayOptionsByCatId(item.categoryID)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <CardContent>
                        <Text gutterBottom variant="body1" component="div" style={{whiteSpace: 'pre-wrap'}}>
                {item.categoryName}
              </Text>
              <Text variant="body2" color="text.secondary" style={{whiteSpace: 'pre-wrap'}}>
                {item.categoryDesc}
              </Text>
              {(item.favorite === 'Y') ?
                <MaterialIcons name="favorite" 
                color = '#f04646ff' size={30} onPress = {(event) => updateFavorites(
                    item.categoryID,'N',event)} style={{ cursor: 'pointer' }}/>:
                <MaterialIcons name="favorite" size={30} 
                onPress = {(event) => updateFavorites(
                    item.categoryID,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </CardContent>
              <TouchableOpacity type="submit" class="button"  
              onPress={()=>triggerDisplayOptionsByCatId(item.categoryID)} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                      <Text>Click to View</Text></TouchableOpacity>
                    </Card>
                </View>
                
                </View>
                )
                ):<View> <Text>Cannot load categories</Text></View>
                
             }
            
            </View>
          {notification ?
               <View style={{position: 'fixed', top:70,right:0}} >    
               <SideBarNotification/> 
            </View> 
            :<View></View>
             }
            </View>
        </View>

    )
}
export default NavBar;