import { Text, View } from 'react-native';
import CategoryStyle from '../../styles/categoryStyle.js'; 
import { useEffect, useState } from "react";


import Ionicons from '@expo/vector-icons/Ionicons';

import { Link } from 'expo-router';

const TourismCommonHeader=()=>
{
     const [activeNotification,setActiveNotification] = useState(false)
    return () =>{
         return (
             <View style={CategoryStyle.headercontainer} >

                
                 <Link href="/tourism/viewTourOperators">
            
              <Text style={CategoryStyle.headerTitles}>Operators</Text>
              
                     
            </Link>
             <Link href="/tourism/viewTourOperators">
            
              <Text style={CategoryStyle.headerTitles}>Gallery</Text>
              
                     
            </Link>
            <Link href="/tourism/viewTourOperators">
            
              <Text style={CategoryStyle.headerTitles}>Reviews</Text>
              
                     
            </Link>
            <Link href="/tourism/viewTourOperators">
            {!activeNotification?
               <Ionicons name="notifications" size={32} color="white" />:
                <Ionicons name="notifications" size={32} color="red" />
            }
                     
            </Link>
            </View>
        )
    }
}

export default TourismCommonHeader;