import { StyleSheet, Text, View } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import TripListStyle from '../../styles/tripListStyle.js'; 
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import {updateAsFavorite,getTourManagers,getTripList} from "../../admin/admin";
import { useEffect, useState, useContext } from "react";
import { FlatList, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@rneui/themed';
import {tripListImages} from "../../admin/imageManager";
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
export default function TripList()
{

    const {productID,categoryId,cityList} = useLocalSearchParams();
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
   //console.log('categoryID is...',categoryId); 
    const[tours,setTours] = useState('');
    const[alltours,setAlltours] = useState('');
    //combined state variable holding info from tours and tour managers
   const [ tourManagers, setTourManagers] = useState('');
    // const { name,email,mobile,categoryId} = location.state || {};
    //const[mount,setMount] = useState(false);
    const[isOpen,setOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
//    const {triggerSorting,sortTrip} = useContext(NavContext);
//     const { notification} = useContext(NavContext);
   const open = Boolean(anchorEl);

   function toggleSideBarForSorting()
{
  console.log('isOpen',isOpen)
  setOpen(!isOpen);
  //triggerSorting(!isOpen);
}
  // console.log('categoryId...',categoryId);

    const [tourMgrMap, setTourMgrMap] = useState(new Map());
    const [selectedValue, setSelectedValue] = useState('B');
    const[priceValue, setPriceValue] = useState('100000');
    const [triplengthValue, setTriplengthValue] = useState('30');
    const [cityvalue, setCityvalue] = useState('0'); 
    const tourManagerMap = new Map(tourMgrMap);
   
    const updateTourMgrMap = (key,value) => {
       
        tourManagerMap.set(key,value);
        setTourMgrMap(tourManagerMap);
    }

    
    function getCityOfTourOperator(citycode){
        console.log('city code...',citycode)
        console.log('city List...',cityList)
        for(let city of cityList){
            console.log('citycode...',citycode);
            if(city.citycode === citycode)
            {
                return city.cityname;
            }
        }
        return "";
    }
   
   const RenderTripList = ({item}) =>{
           return(
                <View style={TourCommonStyle.row}>
                  <Card>
              
            
             <Image source={tripListImages[item.locationName]} 
             style={{flex: 1, width: 300, height: 200 }}/>
          <Card.Title>
            <Text style={TripListStyle.screenText}>{item.locationName}{"\n"}</Text>
            <Text style={TripListStyle.screenText}>{item.customStartDate}</Text>
            <Text style={TripListStyle.screenText}>-</Text>
            <Text style={TripListStyle.screenText}>{item. customEndDate}{"\n"}</Text>
            {/* <Text style={TourCommonStyle.screenText}>{item.domesticOrinternational === "D"? "Domestic":"International"}{"\n"}</Text> */}
            <Text style={TripListStyle.screenText}>{tourManagerMap.get(item.tourManagerId).tourManagerName}{"\n"}</Text>
            <Text style={TripListStyle.screenText}>{item.package_cost}{"\n"}</Text>
                     
        </Card.Title>
        <Card.Divider/>
                
              
              {(item.favorite === 'Y') ?
               
                    <Ionicons name = "heart" color='#f04646ff' onPress={
                        (e)=>updateFavorites(categoryId,'N',e)}/>:

                    <Ionicons name = "heart" color='#635f5fff'  onPress={
                        (e)=>updateFavorites(categoryId,'Y',e)}/>
              }
              
              <Link href={{pathname:"/tourism/tripDetails",
                             params: { 
                                item:item,
                                tourmanagerName:tourManagerMap.get(item.tourManagerId).tourManagerName
                             }
                          }} asChild>
               <TouchableOpacity 
                    style={TourCommonStyle.button}>
                    <Text style={TourCommonStyle.buttonText}>See Details</Text>
                    </TouchableOpacity>
                    </Link> 
                    </Card>    
                </View>

            );
    }

   
  
       const getTripListByCategoryId = async (categoryId) =>{
                       console.log('categoryId...',categoryId);
                       let tourOps = '';
                     
                        if(!tourManagers)
                        {
                             tourOps = await getTourManagers();
                        }
                            if(tourOps)
                            {
                                console.log('tourOps...',tourOps);
                                tourOps.map((tourManager) =>{
                                    updateTourMgrMap(tourManager.tourManagerId,
                                        {"tourManagerId":tourManager.tourManagerId,
                                        "tourManagerName":tourManager.tourManagerName,
                                          "contact" : tourManager.contact,
                                          "secondarycontact":tourManager.backupcontact,
                                          "citycode":tourManager.citycode,
                                          "tourOpLocation": getCityOfTourOperator(tourManager.citycode),
                                          "desc": tourManager.desc,
                                          "website":tourManager.website,
                                          "categoryId":categoryId
                                        });
                                }
                            );

                        }else{
                            console.log('Could not find tour managers');
                        }
                      
                          let plannedTours = await getTripList(categoryId);
      
                          if(plannedTours)
                          {
                              console.log('plannedTours...',plannedTours);
                              setTours(plannedTours);
                              setAlltours(plannedTours);
                          }
                }
                
         useEffect(()=>{
            const selectedTours = [];
                // console.log('alltours in useEffect...',alltours)
                
                //console.log('selectedValue in useEffect...',selectedValue)
                    if(tours)
                    {
                        
                        if(selectedValue === 'I' || selectedValue === 'D'){
                        for(let tour of alltours)
                        {
                            let tripLength = (new Date(tour.endDate).getTime() - 
                            new Date(tour.startDate).getTime())/(24*3600*1000);
                                console.log('tripLength....',tripLength);
                            if(tour.domesticOrinternational === selectedValue  && 
                                Number(tour.package_cost)<=(Number(priceValue)) && 
                            Number(tripLength)<=Number(triplengthValue) && (
                                tourManagerMap.get(tour.tourManagerId) && 
                                ((tourManagerMap.get(tour.tourManagerId)).citycode == cityvalue)||
                        (tourManagerMap.get(tour.tourManagerId).citycode == '0')
                        ))
                            {
                                selectedTours.push(tour);
                                
                            }
                           
                        }
                        
                        }else if(selectedValue === 'B'){
                            console.log('selectedTours....',selectedTours)
                             for(let tour of alltours)
                            {
                                 let tripLength = (new Date(tour.endDate).getTime() - 
                            new Date(tour.startDate).getTime())/(24*3600*1000);
                                if(Number(tour.package_cost)<=(Number(priceValue)) && 
                            Number(tripLength)<=Number(triplengthValue) && (tourManagerMap.get(tour.tourManagerId) && 
                            (tourManagerMap.get(tour.tourManagerId)).citycode == cityvalue)||
                        (tourManagerMap.get(tour.tourManagerId).citycode == '0'))
                        {
                                  selectedTours.push(tour);
                        }
                        }
                        }
                         
                         setTours(selectedTours);
                         console.log('tours....',tours)
                    } 
              },
             [selectedValue,priceValue,triplengthValue,cityvalue]); 

             
            useEffect(()=>{
                    let mounted = true;

                    const timer = setTimeout(() =>{
                        
                            const getTourPlans = async () =>{
                        
                            let tourlist = await getTripListByCategoryId(categoryId);

                            if(tourlist)
                            {
                                console.log('tours...',tours);
                                setTours(tours);
                            }
                        };
                        if(tours === '' && mounted) 
                        {
                             getTourPlans(categoryId);
                        }},1000);
                
                        return () => {
                            mounted = false; // Set flag to false on cleanup
                            clearTimeout(timer); // Clean up the timer
                        };
          },[]);

    return(
        <View style={TourCommonStyle.centeredContainer}>
            {
           
              <FlatList
          data={tours}
          renderItem={({item})=> <RenderTripList item = {item}/>}
          keyExtractor={item =>`${item.locationName}-${item.tourManagerId}-${item.ticket_cost}`}
        />
            }
        </View>



    )
    
}