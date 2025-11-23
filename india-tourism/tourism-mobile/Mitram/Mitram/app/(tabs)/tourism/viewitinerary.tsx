import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js'
import {formatINR} from "../../admin/utility";
import { TouchableOpacity, Image} from 'react-native';
import {tripListImages} from "../../admin/imageManager";
import { Table, THead, TH, TBody, TR, TD } from '@expo/html-elements';
import { useLocalSearchParams,Link,router } from 'expo-router';
import { useEffect, useState } from 'react';
import {getIteneraries} from '../../admin/admin'

export default function ViewItinerary()
{
    const {location,tourmanagerName,cityname,categoryId,tourManagerId,
        startdate,enddate} = useLocalSearchParams();
        const customStartDate = new Date(startdate);
         const customEndDate = new Date(enddate);
        const formattedStartDate = customStartDate.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric' // 'numeric' for full year
});

      const formattedEndDate = customEndDate.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric' // 'numeric' for full year
});


        const [itineraries,setIteneraries] = useState([]);
       
        const splitStringByDelimeter = (str, delim) =>{
            console.log('str....',str)
            if(str)
            {
              let strList = str.split(delim);
              let resultStr = '';
              for(let val of strList)
              {
                resultStr = resultStr+val+'\n';
              }
              console.log('resultStr....',resultStr)
              return resultStr
            }
            else
                return '';
        }
        const RenderItenary = ({item}) =>{
            console.log('item received...',item)
          //  let itemObj = JSON.parse(item)
            console.log('item is...',item.day)
            let itineraries = splitStringByDelimeter(item.plan,'|');
            console.log('item is...',itineraries)
            return (
                 <View style={TourCommonStyle.col} key={`"view"-${item.day}`}>
                   <Text style={TextStyle.body} key={`"text-day"-${item.day}`}>Day {item.day}</Text> 
                    <View key={`"view-itr"-${item.day}`}>
                       <Text style={TextStyle.body} 
                        key={`"text-itr"-${item.day}`}>{itineraries}</Text> 
                     </View> 
                 </View>
            )
        }

        useEffect(()=>{
            let mounted = true;

            const timer = setTimeout(() =>{
            const getItinerariesForTrip = async()=>{ 
            console.log('location,tourmanagerName,cityname,categoryId,startdate.enddate...',location,
                tourmanagerName,
                cityname,categoryId,startdate,enddate);
         
           let req_data = {categoryID:categoryId,
                tourmanagerName:tourmanagerName,
                locationName:location,
                tourManagerId:tourManagerId,
                startDate:startdate,
                endDate:enddate
           };
           let result = await getIteneraries(req_data);
           if(result){
                console.log('result is....',result);
                setIteneraries(result.itinerary);
                mounted = false;
           }
        };
         if(itineraries.length ===0 && mounted)
                {
                    getItinerariesForTrip();
                   mounted = false;
                }
    },1000);
        return () => 
            {
                 mounted = false; // Set flag to false on cleanup
                 clearTimeout(timer); // Clean up the timer
            };
        },[])
    return(
        <View style={TourCommonStyle.centeredContainer}>
        <View style={{backgroundColor:'#bb95e77e'}}>
            <Text style={TextStyle.body}> Itinerary details for the trip to {location}</Text>
            <Text style={TextStyle.body}>Tour Operator - {tourmanagerName}, {cityname}</Text>
            <Text style={TextStyle.body}>Tour dates - {formattedStartDate}-{formattedEndDate}</Text>

             
            {
           itineraries && itineraries.length>0?
              <FlatList
          data={itineraries}
          renderItem={({item})=> <RenderItenary item = {item}/>}
          keyExtractor={item =>`${item.day}`}
           horizontal={false} // This enables horizontal scrolling
      showsHorizontalScrollIndicator={false} // Optional: hides the scroll indicator
         />:<View/>
            }
             <View style = {TourCommonStyle.buttonWrapper}>
              <TouchableOpacity 
                    style={TourCommonStyle.bookingbutton} onPress={() => router.back()}>
                    <Text style={TourCommonStyle.buttonText}>Back</Text>
                  </TouchableOpacity>
            </View> 
            </View>
        </View>



    )
    
}