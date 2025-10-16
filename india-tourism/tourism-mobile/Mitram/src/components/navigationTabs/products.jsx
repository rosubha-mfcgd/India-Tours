import CategoryStyle from '../stylecomp/navbar'; 
import CardStyle from '../stylecomp/cards'; 
import { useEffect, useState, useContext } from "react";
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

  import { View ,TouchableOpacity} from 'react-native';

import {updateAsFavorite,getProducts } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import SideBarNotification from './sideBarNotification.jsx'
 import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const Products = ({access_token,triggerDisplayTripsByProductId}) =>{

    
     const { notification} = useContext(NavContext);
     const [items, setItems] = useState('')
    
    
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
                
                    const fetchProducts = async () =>{
                   
                    let products = await getProducts();

                    if(products)
                    {
                        console.log('products...',products);
                        setItems(products);
                    }
                };
                if(items==='')
                {
                   fetchProducts();
                }},100);
        
    return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };

          },[]);


    return (
        <View style={CategoryStyle.navbargrid} >
        <View style={CategoryStyle.navbar} >
            <View container spacing={10} justify="center" width="70%">
             {items && items.length>0 ?

                items.map((item) => (
               <View>
                 
                <View item xs = {12} sm={4}  key={item.productID}>

                    <Card style={CardStyle.card}
                     >
                    
                    <Card.Cover  height="100"
                    source = {item.image} alt={item.productDesc} 
                    onPress={()=>triggerDisplayTripsByProductId(item.productID)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <Card.CardContent>
                        <Text gutterBottom variant="body1" component="div">
                {item.productName}
              </Text>
              <Text variant="body2" color="text.secondary" style={{ whiteSpace: 'pre-wrap' }}>
                {item.productDesc}
              </Text>
              {(item.favorite === 'Y') ?
                <MaterialIcons name="favorite" color= '#f04646ff' 
                size={30}
                onPress = {(event) => updateFavorites(
                    item.productID,'N',event)} 
                    style={{ cursor: 'pointer' }}/>:
                <MaterialIcons name="favorite"  
                size={30}
                onPress = {(event) => updateFavorites(
                    item.productID,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </Card.CardContent>
              <TouchableOpacity type="submit" class="button"  onPress={()=>triggerDisplayTripsByProductId(item.productID)} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                        Click to View</TouchableOpacity>
                    </Card>
                </View>
                
                </View>
                )
                ):<View >Cannot load products</View>
                
             }
            
            </View>
          {notification ?
               <View  style={{position: 'fixed', top:70,right:0}} >    
               <SideBarNotification/> 
            </View> 
            :<View ></View>
             }
            </View>
        </View>

    )
}
export default Products;
