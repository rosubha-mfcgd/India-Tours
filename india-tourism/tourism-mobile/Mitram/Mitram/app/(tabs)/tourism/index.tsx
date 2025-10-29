import { Text, View } from 'react-native';
import CardStyle from '../../styles/cards.js'; 
import CategoryStyle from '../../styles/productStyle.js'; 
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import {updateAsFavorite,getCategories,getCities} from "../../admin/admin";
import { useEffect, useState, useContext } from "react";
import { FlatList, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@rneui/themed';
import {tripCategoryImages} from "../../admin/imageManager";
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
export default function Categories()
{

    const {productID} = useLocalSearchParams();
    const [items, setItems] = useState('');
    const[cityList,setCityList] = useState('');

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

      const RenderTripCategories = ({item}) =>{

            return(
                <View style={CategoryStyle.row}>
                  <Card>
              
            
             <Image source={tripCategoryImages[item.categoryName]} style={{flex: 1, 
                width: 350, height: 200 }}/>
          <Card.Title>
            <Text style={CategoryStyle.categoryscreenText}>{item.categoryName}{"\n"}</Text>
                    <Text style={CategoryStyle.categoryscreenText}>{item.categoryDesc}</Text>
                     
        </Card.Title>
        <Card.Divider/>
                
              
              {(item.favorite === 'Y') ?
               
                    <Ionicons name = "heart" color='#f04646ff' size={45} onPress={()=>
                        updateFavorites(item.categoryID,'N',event)}/>:

                    <Ionicons name = "heart" color='#635f5fff' size={45} onPress={()=>
                        updateFavorites(item.categoryID,'Y',event)}/>
              }
              <Link href={{pathname:"/tourism/tripList",
                             params: { productID: item.productID, categoryId:item.categoryID,
                                cityList:JSON.stringify(cityList)
                             }
                          }} asChild>
            
               <TouchableOpacity 
                    style={CategoryStyle.button}>
                    <Text style={CategoryStyle.buttonText}>Click to View</Text>
                    </TouchableOpacity>
                    </Link> 
                    </Card>    
                </View>

            );
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

      useEffect(()=>{
         let mounted = true;
             const timer = setTimeout(() =>{
                
                    const getCityList = async () =>{
                   
                    let cities = await getCities();
                    
                    if(cities)
                    {
                        console.log('cities...',cities);
                        setCityList(cities);
                    }
                   
                };
                if(cityList==='' && mounted)
                {
                    getCityList();
                    mounted = false;
                  
                }},100);
        
    return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };
    },[] )

    return(
        <View style={LoginSignUpStyle.centeredContainer}>
    {
        <FlatList
          data={items}
          renderItem={({item})=> <RenderTripCategories item = {item}/>}
          keyExtractor={item => item.categoryID}
        />
    }
    </View>
    )
    
}