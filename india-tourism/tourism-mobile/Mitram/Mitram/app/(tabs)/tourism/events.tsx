import { Text, View,ScrollView ,ActivityIndicator} from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js'
import { TouchableOpacity, Image} from 'react-native';
import { Table, THead, TH, TBody, TR, TD } from '@expo/html-elements';
import { useLocalSearchParams,Link,router } from 'expo-router';
import { useEffect, useState } from 'react';
import {getUpcomingEvents} from '../../admin/admin.js'

export default function  upcomingEvents()
{
    
           const nextMonth = new Date().getMonth() + 1;
         const year = new Date().getFullYear();
       

 
const [events,setEvents] = useState([]);
       
useEffect(()=>{
            let mounted = true;

            const timer = setTimeout(() =>{
            const getNextEvents = async()=>{ 
            
           let req_data = {
                prompt:"What are the upcoming major state-wise festivals in india in "+nextMonth+"/"+year,
                modelname:"gemini-2.0-flash"
                
           };
           let result = await getUpcomingEvents(req_data);
           if(result){
                console.log('result is....',result);
                setEvents(result);
                mounted = false;
           }
        };
         if(events.length === 0 && mounted)
                {
                   getNextEvents();
                   mounted = false;
                }
    },2000);
        return () => 
            {
                 mounted = false; // Set flag to false on cleanup
                 clearTimeout(timer); // Clean up the timer
            };
        },[])
    return(

        <ScrollView style={{backgroundColor:'#ebe9ee7e'}}>
             {
           events.length>0 ?
        <View style={{backgroundColor:'#ebe9ee7e'}}>
            <Text style={TextStyle.body}> Upcoming Events for {nextMonth}/{year}</Text>
                       
           
               <View style={{backgroundColor:'#ebe9ee7e'}}>
            
            <Table>
               
          
                {/* <TR>
             <TD style={TourCommonStyle.cell}>
                <Image source={tripListImages[itemObject.locationName]}  style={{flex: 1, 
                width: 350, height: 350 }}/>  
                </TD>    
               </TR> */}
            <TR>
              <TD style={TourCommonStyle.cell}>
                <Text style={TextStyle.body}>{events}</Text>
              </TD>
             
            </TR></Table></View>
             <View style = {TourCommonStyle.buttonWrapper}>
              <TouchableOpacity 
                    style={TourCommonStyle.bookingbutton} onPress={() => router.back()}>
                    <Text style={TourCommonStyle.buttonText}>Back</Text>
                  </TouchableOpacity>
            </View> 
            </View>
            :<View style={TourCommonStyle.centeredContainer}><ActivityIndicator 
            size="large" color="#3c3ca7ff"/></View>
            }
        </ScrollView>



    )
    
}