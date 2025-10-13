import React, { useContext, useEffect,useState } from "react";  

import { getTripList,getTourManagers } from "../admin/admin";
 import { View } from 'react-native';
 import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

 

  import SideBarFilter from '../navigationTabs/sideBarFilter.jsx';
  import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
  import { NavContext } from '../navigationContext/navigationContext.jsx';

const TripList = ({access_token,categoryId,cityList,showDetails}) =>{
     
    const[tours,setTours] = useState('');
    const[alltours,setAlltours] = useState('');
    //combined state variable holding info from tours and tour managers
    const [ tourManagers, setTourManagers] = useState('');
    const[isOpen,setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const {triggerSorting,sortTrip} = useContext(NavContext);
    const { notification} = useContext(NavContext);
   
    const open = Boolean(anchorEl);

   function toggleSideBarForSorting()
    {
        console.log('isOpen',isOpen)
        setOpen(!isOpen);
        triggerSorting(!isOpen);
    }
   console.log('categoryId...',categoryId);

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

     function getValuesFromTourManagerMap(key) {
       console.log('tourMgrMap...',tourMgrMap)
        return tourMgrMap.get(key);
        
    }

    function getCityOfTourOperator(citycode)
    {
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
   
    function changeDateToWords(dateObject)
     {
        const date = new Date(dateObject);
        console.log('date....',date)
        // Or 'en-GB' for a different locale
        console.log('formatted date...', date.toLocaleDateString('en-GB')); 
        return date.toLocaleDateString('en-GB');
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
                        }
                        else
                        {
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
                if(tours === '')
                {
                    getTripListByCategoryId(categoryId);
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
                                tourManagerMap.get(tour.tourManagerId) && 
                                ((tourManagerMap.get(tour.tourManagerId)).citycode == cityvalue)||
                            (tourManagerMap.get(tour.tourManagerId).citycode == '0')
                        ))
                            {
                                selectedTours.push(tour);
                                
                            }
                           
                        }
                        
                        }
                        else if(selectedValue === 'B'){
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
    
    return(
    
        <View sx={{ display: 'flex',justifyContent:'flex-end'}}>
            <View className="navbar-grid">
               <nav className="navbar">
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    spacing={10} justify="center" width="70%">
                    {tours && tours.length>0 ?

                        tours.map((tour) => (
                     <View>
                    <View item xs = {12} sm={4}  key={tour.categoryID}>
                    <Card className="card" onPress={()=>showDetails(tour,
                    getValuesFromTourManagerMap(tour.tourManagerId),
                        access_token)} style={{ cursor: 'pointer' }}>
                    
                    <CardMedia component= "img"  height="100"
                    image = {tour.image} alt={tour.desc} 
                                      
                    />
                                     
                    <CardContent>
                        <Text gutterBottom variant="body1" >
                {tour.categoryName}
              </Text>
              <Text variant="body2" color="text.secondary">
                {tour.locationName}
              </Text>

              <Text variant="body2" color="text.secondary">
                {changeDateToWords(tour.startDate)} - {changeDateToWords(tour.endDate)}
              </Text>

               <Text variant="body2" color="text.secondary">
                {getValuesFromTourManagerMap(tour.tourManagerId).tourManagerName}- {getValuesFromTourManagerMap(tour.tourManagerId).tourOpLocation}
              </Text>
                    <Text variant="body2" color="text.secondary">
                 {getValuesFromTourManagerMap(tour.tourManagerId).contact}
              </Text>
             
                    <Text variant="body2" color="text.secondary">
                 {tour.domesticOrinternational === "D"? "Domestic":"International"}
              </Text>
                 <button type="submit" class="button"  onPress={()=>showDetails(tour,getValuesFromTourManagerMap(tour.tourManagerId))} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                       Details</button>
              </CardContent>
                    </Card>
                </View>
                
               
                </View>
                ))
                :<View>Cannot load Tour details</View>
                
             }
             <View  sx={{position: 'fixed', top: '10', right: '0'
             }}>
                 <IconButton
      aria-label="menu"
       aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onPress={(event) => {
        setAnchorEl(event.currentTarget)
        
      }}
        >
     
      <MenuIcon onPress={()=>toggleSideBarForSorting()}/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </IconButton>
   
            </View>
            {
            sortTrip ? 
            <View style={{position: 'fixed', top:70,right:0}} >
                <SideBarFilter selectedValue={selectedValue} setSelectedValue={setSelectedValue} 
                priceValue={priceValue} setPriceValue={setPriceValue} 
                cityList={cityList}
                triplengthValue={triplengthValue} 
                setTriplengthValue={setTriplengthValue} cityvalue={cityvalue} setCityvalue={setCityvalue}/>
            </View>:<View></View>
           }
             </View>
               {notification ?
               <View style={{position: 'fixed', top:70,right:0}} >    
               <SideBarNotification/> 
            </View> 
            :<View></View>
             }
             </nav>
             </View>
             </View>
        )
}
export default TripList;


