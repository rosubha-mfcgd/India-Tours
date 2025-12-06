import { Text, View,FlatList, TouchableOpacity, ImageBackground,Platform } from 'react-native';
import TripListStyle from '../../styles/tripListStyle.js'; 
import FilterModalStyle from '../../styles/filtermodalStyle.js'; 
import {formatINR} from "../../admin/utility.js";
import {updateAsFavorite,getTourManagers,getTripList,getDataFromCache,persistDataInCache} 
from "../../admin/admin.js";
import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@rneui/themed';
import {tripListImages} from "../../admin/imageManager.js";
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import FilterSidebar from '../../navigation/filterModal';
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function TripList()
{

    const {productID,categoryId,cityList} = useLocalSearchParams();
    const [tripstartdate, setTripstartdate] = useState(new Date());
    const [tripenddate, setTripenddate] = useState(new Date());
    const [show, setShow] = useState(false); // To control picker visibility
    const [mode, setMode] = useState('date'); // 'date' or 'time'
    const [showFilterDateOptions,setShowFilterDateOptions] = useState(false)

    const getSixMonthsAhead = (startDate = new Date()) => {
  const futureDate = new Date(startDate); // Clone the date to avoid mutation
  // setMonth handles year overflow automatically
  futureDate.setMonth(futureDate.getMonth() + 6); 
  return futureDate;
};

    const onTripstartChange = () => {
       
      const currentDate = tripstartdate;
 console.log('selectedDate....',currentDate)
      setShow(Platform.OS === 'ios'); // Hide picker on iOS after selection
      //setTripstartdate(currentDate);
    };
const onTripendChange = () => {
    
      const currentDate = tripenddate;
      console.log('selectedDate....',currentDate)
      setShow(Platform.OS === 'ios'); // Hide picker on iOS after selection
      //setTripenddate(currentDate);
    };
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatePicker = () => showMode('date');

     const filterList = [
    { id: '1', name: 'Price (low-high)' },
    { id: '2', name: 'Price (high-low)' }
    ];
   
    const listOfCities = JSON.parse(cityList);
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
   
    const[tours,setTours] = useState('');
    const[alltours,setAlltours] = useState('');
    //combined state variable holding info from tours and tour managers
   const [ tourManagers, setTourManagers] = useState('');
   
    
    const[isOpen,setOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   


   const [tourMgrMap, setTourMgrMap] = useState({}); 
    const [selectedValue, setSelectedValue] = useState('B');
    const[priceValue, setPriceValue] = useState('100000');
    const [triplengthValue, setTriplengthValue] = useState('30');
    const [cityvalue, setCityvalue] = useState('0'); 
    const updateTourMgrMap = (key,value) => {
       
      
    setTourMgrMap(prevData =>(
    {
      ...prevData,// Keep existing data
      [key]:value// Add or update the new key-value pair
    }
    ));
    }
    const toggleFilterOptions = (data) =>{
        setShowFilterDateOptions(data)
    }

     const showTripListHeaderInformation = () =>{

        
        return (
            
             <View style={FilterModalStyle.headercontainer} >
                {showFilterDateOptions?
                <View style={FilterModalStyle.headersubcontainer} >
                <View style={FilterModalStyle.headerCompStyle}>
             <Text style={FilterModalStyle.headerTitles}>From</Text>  
             </View>
            <View style={FilterModalStyle.headerCompStyle}>     
         <DateTimePicker
          testID="startdateTimePicker"
          value={tripstartdate}
          mode={'date'}
          is24Hour={true} // For 24-hour time format
         display="default"
            style={{ width: 200, backgroundColor: 'white' }}
          onChange={onTripstartChange}
        />
             
            </View>
             </View>
            
            :<View/>
     }
     {showFilterDateOptions ?
                   <View style={FilterModalStyle.headersubcontainer} >
              <View style={FilterModalStyle.headerCompStyle}>
                <Text style={FilterModalStyle.headerTitles}>To</Text>
                </View>
                <View style={FilterModalStyle.headerCompStyle}>
               <DateTimePicker
          testID="enddateTimePicker"
          value={tripenddate} 
          mode="date"
          is24Hour={true} // For 24-hour time format
          display="default"
          style={{ width: 200, backgroundColor: 'white' }}
          onChange={onTripendChange}
        />
               
         
            </View>
            </View>:<View/>
            
     }

            <View style={FilterModalStyle.headersubcontainer} >
        <View style={FilterModalStyle.headerCompStyle}>
          <FilterSidebar data={filterList} showFilterDateOptions={showFilterDateOptions}
          toggleFilterOptions={toggleFilterOptions}
          />
            </View>
            </View>
          
             </View>
            )
        }
    function getCityOfTourOperator (citycode){
        console.log('city code...',citycode)
        console.log('city List...',cityList)
       
        for(let count = 0;count<listOfCities.length;count++)
            {
            console.log(' searching city...',listOfCities[count]);
            if(listOfCities[count].citycode === citycode)
            {
                return listOfCities[count].cityname;
            }
        }
        return "";
    }
   const getTripListByCategoryId = async (categoryId) =>{
                       console.log('categoryId...',categoryId);
                       
                       let tourOps = '';
                     
                        if(!tourManagers)
                        {
                             tourOps = await getDataFromCache('touroperators');
                             if(!tourOps)
                             {
                               tourOps =  await getTourManagers();
                               persistDataInCache('touroperators',tourOps);
                             }
                             setTourManagers(tourOps);
                        }
                            if(tourOps)
                            {
                                console.log('tour Operators...',tourOps);
                                tourOps.map(tourManager =>{
                                    let tourOpLocation = getCityOfTourOperator(tourManager.citycode);
                                    console.log('tourOpLocation...',tourOpLocation);
                                    updateTourMgrMap(tourManager.tourManagerId,
                                        {"tourManagerId":tourManager.tourManagerId,
                                        "tourManagerName":tourManager.tourManagerName,
                                          "contact" : tourManager.contact,
                                          "secondarycontact":tourManager.backupcontact,
                                          "citycode":tourManager.citycode,
                                          "tourOpLocation": tourOpLocation,
                                          "desc": tourManager.desc,
                                          "website":tourManager.website,
                                          "categoryId":categoryId
                                        });
                                }
                            );
                            console.log('tourMgrMap....',tourMgrMap)
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
                                tourMgrMap[tour.tourManagerId] && 
                                ((tourMgrMap[tour.tourManagerId]).citycode == cityvalue)||
                        (tourMgrMap[tour.tourManagerId].citycode == '0')
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
                            Number(tripLength)<=Number(triplengthValue) && 
                            (tourMgrMap[tour.tourManagerId] && 
                            (tourMgrMap[tour.tourManagerId]).citycode == cityvalue)||
                        (tourMgrMap[tour.tourManagerId].citycode == '0'))
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

           useEffect(() => {
    setTripenddate(getSixMonthsAhead(new Date()));
  }, [tripstartdate]);

 const RenderTripList = ({item}) =>{

   // console.log('item....',JSON.stringify(item));
    let nightsStay = item.lengthOfTour-1;
    let tourmanagerName = tourMgrMap[item.tourManagerId].tourManagerName;
    let tourOpLocation = tourMgrMap[item.tourManagerId].tourOpLocation;
           return(
                <View style={TourCommonStyle.row}>
                  <Card>
              
            
             <ImageBackground source={tripListImages[item.locationName]} 
             style={TripListStyle.image}>
                 <Text
          style={TripListStyle.cardText}
        >
          {item.lengthOfTour} days/{nightsStay} nights {"\n"}
          {tourmanagerName}{"\n"}{tourOpLocation}
        </Text>
                
                
                </ImageBackground>
          <Card.Title>
            <Text style={TripListStyle.screenText}>{item.locationName}{"\n"}</Text>
            <Text style={TripListStyle.screenText}>{item.customStartDate}</Text>
            <Text style={TripListStyle.screenText}>-</Text>
            <Text style={TripListStyle.screenText}>{item. customEndDate}{"\n"}</Text>
            <Text style={TripListStyle.screenText}>{formatINR(item.package_cost)}{"\n"}</Text>
                     
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
                                item:  JSON.stringify(item),
                                tourmanagerName:tourMgrMap[item.tourManagerId].tourManagerName,
                                cityname: tourMgrMap[item.tourManagerId].tourOpLocation,
                                categoryId:categoryId
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

    return(
        <View style={TourCommonStyle.centeredContainer}>
            {
           tours && tours.length>0 ?
              <FlatList
          data={tours}
          renderItem={({item})=> <RenderTripList item = {item}/>}
          keyExtractor={item =>`${item._id}`}
           ListHeaderComponent={showTripListHeaderInformation}
        />:<View/>
            }
        </View>



    )
    
}