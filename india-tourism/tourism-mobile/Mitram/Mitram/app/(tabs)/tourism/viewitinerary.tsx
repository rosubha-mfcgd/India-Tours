import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js'
import {formatINR} from "../../admin/utility";
import { TouchableOpacity, Image} from 'react-native';
import {tripListImages} from "../../admin/imageManager";
import { Table, THead, TH, TBody, TR, TD } from '@expo/html-elements';
import { useLocalSearchParams,Link } from 'expo-router';
import { useEffect } from 'react';


export default function ViewItinerary()
{
    const {location,tourmanagerName,cityname,
        startdate,enddate,itinerary} = useLocalSearchParams();
         const itineraryObj = JSON.parse(itinerary);
        const splitStringByDelimeter = (str, delim) =>{
            console.log('str....',str)
            if(str)
                return str.split(delim);
            else
                return '';
        }
        const RenderItenary = async({item}) =>{
            const itineraries = splitStringByDelimeter(item.plan,'|');
            return (
                 <View style={TourCommonStyle.row}>
                   <Text style={TextStyle.text}>Day {item.day}</Text> 
                   <View>
                   {itineraryObj.map((itinerary,index)=>(
                     
                        <Text style={TextStyle.text} key={itinerary._id}>{itinerary}</Text> 
                   ))
                   }
                   </View>
                 </View>
            )
        }

        useEffect(()=>{
            console.log('location...',location)
            console.log('tourmanagerName...',tourmanagerName)
            console.log('cityname...',cityname)
            console.log('itinerary...',itinerary)
        },[])
    return(
        <View style={{backgroundColor:'#8a41df7e'}}>
            <Text style={TextStyle.h2}> This page shows the itinerary details for the trip to {location}</Text>
            <Text style={TextStyle.h2}>({tourmanagerName}, {cityname}, {startdate},{enddate})</Text>
             <View style={TourCommonStyle.centeredContainer}>
            {
           itineraryObj && itineraryObj.length>0 ?
              <FlatList
          data={itineraryObj}
          renderItem={({item})=> <RenderItenary item = {item}/>}
          keyExtractor={item =>`${item._id}`}
        />:<View/>
            }
            </View> 
        </View>



    )
    
}