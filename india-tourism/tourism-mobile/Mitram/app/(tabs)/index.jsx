import CategoryStyle from '../stylecomp/navbar'; 
import CardStyle from '../stylecomp/cards'; 
import { useEffect, useState, useContext } from "react";
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'
import { FlatList, View ,Text,TouchableOpacity, StyleSheet} from 'react-native';
import {updateAsFavorite,getProducts} from '../admin/admin.js';

 import Ionicons from '@expo/vector-icons/Ionicons';

export default function index (access_token) {

    
    
     const [items, setItems] = useState('')
    
     const renderProducts = ({item}) =>{
       <View>

                    <Card style={CardStyle.card} 
                        image={item.image} title={item.productDesc}
                     >
             <Text>
                {item.productName}
              </Text>
              <Text>
                {item.productDesc}
              </Text>
              {(item.favorite === 'Y') ?
               
                    <Ionicons name = "heart" color='#f04646ff'/>:

                    <Ionicons name = "heart" color='white'/>
              }
              
            
               <TouchableOpacity 
                    style={{ cursor: 'pointer',color:'#0c0c0fff'}}>
                    <Text>Click to View</Text></TouchableOpacity> 
                    </Card>
                </View>
     }
    
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
           
             <Text>Cannot load products</Text>    
         
                {/* <FlatList
          data={items}
          renderItem={renderProducts}
          keyExtractor={item => item.productID}
        />
               :<View><Text>Cannot load products</Text></View> */}
             </View>
        </View>

    )
}

