import { Text, View } from 'react-native';
import CategoryStyle from '../../styles/categoryStyle.js'; 
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import ModalStyle from '../../styles/modalStyle.js'
import {updateAsFavorite,getCategories,getCities,
    persistDataInCache,getDataFromCache} from "../../admin/admin";
import { useEffect, useState } from "react";

import { FlatList, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@rneui/themed';
import {tripCategoryImages,tripCategoryBackImages} from "../../admin/imageManager";
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import CustomSidebar from '../../navigation/drawerModal'; 
export default function Categories()
{
    

    const {productID} = useLocalSearchParams();
    const [items, setItems] = useState('');
    const[cityList,setCityList] = useState('');
    const [showFlipImage,setShowFlipImage] = useState(false)
    const [activeNotification,setActiveNotification] = useState(false)
    const [favorite,setFavorite] = useState([])
     const menuList = [
    { id: '1', name: 'Upcoming Events' },
    { id: '2', name: 'Exciting Offers' },
    { id: '3', name: 'Recommendations' },
    { id: '4', name: 'My Past Trips' },
  ];
    const toggleImage = () =>{
         setShowFlipImage(!showFlipImage)
      }
       const showHeaderInformation = () =>{
        return (
            
             <View style={CategoryStyle.headercontainer} >
            
            <View style={ModalStyle.headerCompStyle}>
          <Link href="/tourism/viewTourOperators">
            
              <Text style={CategoryStyle.headerTitles}>Operators</Text>
                   
            </Link>
            </View>
           <View style={ModalStyle.headerCompStyle}>
            <Link href="/tourism/viewTourOperators">
            
              <Text style={CategoryStyle.headerTitles}>Reviews</Text>
              
                     
            </Link>
            </View>
             <View style={ModalStyle.headerCompStyle}>
          <CustomSidebar data={menuList}/>
            </View>
            </View>
        )
    }


const updateFavorites = async(categoryid, status,index) =>{

         console.log('status....index...',status,index)
        favorite[index].favorite = status;
        setFavorite(favorite);
        console.log('favorite....',favorite);
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
              
            <TouchableOpacity style={CategoryStyle.touchableOpacity} onPress={toggleImage}>
                {!showFlipImage?
             <Image source={tripCategoryImages[item.categoryName]} style=
             {CategoryStyle.image}/> :
             <Image source={tripCategoryBackImages[item.categoryName]} style=
             {CategoryStyle.image}/>
                }
             </TouchableOpacity>
          <Card.Title>
            <Text style={CategoryStyle.categoryscreenText}>{item.categoryName}{"\n"}</Text>
                    <Text style={CategoryStyle.categoryscreenText}>{item.categoryDesc}</Text>
                     
        </Card.Title>
        <Card.Divider/>
                
              
              {(item.favorite === 'Y'|| favorite[item.categoryID-1] && 
              favorite[item.categoryID-1].favorite== 'Y')   ? 
                    
                    <Ionicons name = "heart" color='#f04646ff' size={45} onPress={()=>
                        updateFavorites(item.categoryID,'N',item.categoryID-1)}/>:

                    <Ionicons name = "heart" color='#635f5fff' size={45} onPress={()=>
                        updateFavorites(item.categoryID,'Y',item.categoryID-1)}/>
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
                   
                    let categories = await getDataFromCache(productID);
                    
                    if(!categories){
                       categories = await getCategories(productID);
                       if(categories)
                       {
                            persistDataInCache(productID,categories);
                       }
                    }
                    
                    if(categories)
                    {
                        console.log('categories...',categories);
                        setItems(categories);
                        for(let category of categories)
                        {
                           let catObj = {"id":category.categoryID,"favorite":category.favorite};
                            favorite.push(catObj);
                        }
                        console.log('category in favorite map....',favorite);
                    }
                   
                };
                if(!items)
                {
                    getTripCategories(productID);

                }},100);
        
    return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };

      },[favorite]);

      useEffect(()=>{
         let mounted = true;
             const timer = setTimeout(() =>{
                
                    const getCityList = async () =>{
                   
                    let cities = getDataFromCache('cities');
                    if(!cities)
                    {
                      cities = await  getCities();
                      persistDataInCache('cities',cities);
                    }
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
        <View style={TourCommonStyle.centeredContainer}>
    {
        <FlatList
          data={items}
          renderItem={({item})=> <RenderTripCategories item = {item}/>}
          ListHeaderComponent={showHeaderInformation}
          keyExtractor={item => item.categoryID}
        />
    }
    </View>
    )
    
}