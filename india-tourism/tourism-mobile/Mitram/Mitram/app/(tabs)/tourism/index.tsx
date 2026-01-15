import { Text, View } from 'react-native';
import CategoryStyle from '../../styles/categoryStyle'; 
import TourCommonStyle from '../../styles/tourCommonStyle'; 
import ModalStyle from '../../styles/modalStyle'
import TextStyle from '../../styles/textStyles';
import {updateAsFavorite,getCategories,getCities,getImageById,
    persistDataInCache,getDataFromCache,removeDataFromCache,
    validateTokenWithSession} from "../../admin/admin";
import { useEffect, useState } from "react";

import { FlatList, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@rneui/themed';
import {tripCategoryImages,tripCategoryBackImages} from "../../admin/imageManager.js";
import { Link,useLocalSearchParams } from 'expo-router';
import CustomSidebar from '../../navigation/drawerModal'; 
export default function Categories()
{
    

    const {productID} = useLocalSearchParams();
    const [items, setItems] = useState('');
    const[cityList,setCityList] = useState([]);
    const [showFlipImage,setShowFlipImage] = useState(false)
    const [images, setImages] = useState([]);
    const [activeNotification,setActiveNotification] = useState(false)
    const [favorite,setFavorite] = useState(new Map())
    const [changeFav,setChangeFav] = useState(true)
     
     const menuList = [
    { id: '1', name: 'Upcoming Events' },
    { id: '2', name: 'Exciting Offers' },
    { id: '3', name: 'Recommendations' },
    { id: '4', name: 'My Past Trips' },
     { id: '5', name: 'Reviews' },
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
            
              <Text style={CategoryStyle.headerTitles}>Apply for Visa</Text>
              
                     
            </Link>
            </View>
             <View style={ModalStyle.headerCompStyle}>
          <CustomSidebar data={menuList}/>
            </View>
            </View>
        )
    }


    const getCategoryImageFromFileId = async(imageid,bucketname) =>{
                   if(imageid != null){
                    
                       let imageData = await getImageById(imageid,bucketname);
                       if(imageData)
                        {
                        //console.log('imageData...',imageData);
                           return imageData;
                       }
                   }
           }

 const getItemFromFavoriteMap = (key) => {
    console.log('favorite...',favorite)
    let color = favorite.get(key) === 'Y'?'#f04646ff':'#635f5fff';
    console.log('color..',color);
    return color;
  };
const updateFavorites = async(categoryid) =>{
        setChangeFav(false)
        let status = favorite.get(categoryid)
        let changedFavStatus = status === 'Y'?'N':'Y'
         console.log('status....index...',status,categoryid)
       
        favorite.set(categoryid,changedFavStatus);
        persistDataInCache('favoriteCategory',favorite);
                  
        //console.log('favorite....',favorite);
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
                    removeDataFromCache(productID);
           setChangeFav(true)          
       }

      const RenderTripCategories = ({item}) =>{

            return(

                <View style={CategoryStyle.row}>
                  <Card>
              
            <TouchableOpacity style={CategoryStyle.touchableOpacity} onPress={toggleImage}>
                {!showFlipImage?
             <Image source={tripCategoryImages[item.name]} style=
             {CategoryStyle.image}/> :
             <Image source={tripCategoryBackImages[item.name]} style=
             {CategoryStyle.image}/>
                }
             </TouchableOpacity>
          <Card.Title>
            <Text style={CategoryStyle.categoryscreenText}>{item.name}{"\n"}</Text>
                    <Text style={CategoryStyle.categoryscreenText}>{item.description}</Text>
                     
        </Card.Title>
        <Card.Divider/>
                
              
              {changeFav?
                    <View style={{flexDirection:'row'}}>
                    <Ionicons name = "heart" color={getItemFromFavoriteMap(item._id)} 
                    size={45} onPress={()=>
                        updateFavorites(item._id)}/>
                        {favorite.get(item._id) === 'Y'?
                            <Text style={TextStyle.h2}>My Favorite</Text>:
                            <View/>
                        }
                        </View>
                        :<View/>
                    }
              <Link href={{pathname:"/tourism/tripList",
                             params: { productID: item.productID, categoryId:item._id,
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
                   //Fetch categories from cache
                    let categories = await getDataFromCache(productID);
                    //if not found in cache, lookup the DB
                    if(!categories){
                       categories = await getCategories(productID);
                        if(categories)
                        {
                            persistDataInCache(productID,categories);
                        }
                    }
                       
                 //If list of categories is found, prepare the image list and favoriteMap
                    if(categories)
                    {
        
                        const favoriteMap = new Map(favorite); 
                            for(let category of categories)
                            {
                               console.log('category...',category._id)
                                favoriteMap.set(category._id, 
                                    category.favorite === 'Y'?'Y':'N');
                                
                                   let imageData = getCategoryImageFromFileId(category.image,
                                    'categoryImages');
                                    if(imageData)
                                    {
                                        images[category._id] = imageData;
                                    }
                                
                            }
                            setFavorite(favoriteMap);
                            persistDataInCache('favoriteCategory',favoriteMap);

                       
                        setItems(categories);
                        
                    }
                
                   
                };
                 const getCityList = async () =>{
                   
                    let cities = await getDataFromCache('cities');
                     if(cities)
                    {
                        console.log('cities...',cities);
                        setCityList(cities);
                    }
                    if(!cityList || cityList.length === 0)
                    {
                      cities = await getCities();
                    
                    }
                    if(cities)
                    {
                        persistDataInCache('cities',cities);
                        console.log('cities...',cities);
                        setCityList(cities);
                    }
                   
                };
                if(!items)
                {
                    getTripCategories(productID);
                    
                if(!cityList || cityList.length === 0)
                {
                    getCityList();
                    mounted = false;
                  
                }

                }},100);
        
    return () => {
      
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };

      },[favorite]);
 
    return(
        <View style={TourCommonStyle.centeredContainer}>
    {
        items && images.length>0?
        <FlatList
          data={items}
          renderItem={({item})=> <RenderTripCategories item = {item}/>}
          ListHeaderComponent={showHeaderInformation}
          keyExtractor={item => item._id+'_'+item.name+'_'+item.description+'_'+item.image}
        />:<View/>
    }
    </View>
    )
    
}