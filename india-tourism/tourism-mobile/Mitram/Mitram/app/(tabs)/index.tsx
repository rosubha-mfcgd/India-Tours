import { StyleSheet, Text, View } from 'react-native';
import LoginSignUpStyle from '../styles/loginsignup.js'; 
import CardStyle from '../styles/cards.js'; 
import ProductStyle from '../styles/productStyle.js'; 
import {updateAsFavorite,getProducts} from "../admin/admin";
import { useEffect, useState, useContext } from "react";
import { FlatList, TouchableOpacity, Image} from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Button, Icon } from '@rneui/themed';
import {productImages} from "../admin/imageManager";

export default function Products()
{ 

    const [items, setItems] = useState('');
   
    let images = [];
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

         const RenderProducts = ({item}) =>{
           
            return(
       <View style={ProductStyle.row}>

           <Card>
              
            
             <Image source={productImages[item.productName]} style={{flex: 1, width: 350, height: 200 }}/>
          <Card.Title>
            <Text style={ProductStyle.productscreenText}>{item.productName}{"\n"}</Text>
                    <Text style={ProductStyle.productscreenText}>{item.productDesc}</Text>
                     
        </Card.Title>
        <Card.Divider/>
                
              
              {(item.favorite === 'Y') ?
               
                    <Ionicons name = "heart" color='#f04646ff' size={32}/>:

                    <Ionicons name = "heart" color='white' size={32}/>
              }
              
            <Link href={{pathname:"/tourism",
               params: { productID: item.productID}
            }} asChild>
               <TouchableOpacity 
                    style={ProductStyle.button}>
                    <Text style={ProductStyle.buttonText}>Click to View</Text></TouchableOpacity> 
              </Link>
                    </Card>
                </View>
            );
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
                         
                       for(let product of products)
                         {
                            let imagePath = product.mobileimage;
                            // let image = require('../../public/products/tourism.png');
                            console.log('imagePath....',imagePath);
                            images.push[imagePath];
                           
                         }
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
            });


return(
<View style={LoginSignUpStyle.centeredContainer}>

{
 <FlatList
          data={items}
          renderItem={({item})=> <RenderProducts item = {item}/>}
          keyExtractor={item => item.productID}
        />
}
</View>
);


}