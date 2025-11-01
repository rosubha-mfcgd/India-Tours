import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js' ;
import BookingStyle from '../../styles/bookingStyle.js';
import {updateAsFavorite,getProducts} from "../../admin/admin.js";
import { useEffect, useState, useContext } from "react";
import { FlatList, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Button, Icon } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import { Table,  TBody, TR, TD } from '@expo/html-elements';
export default function PreviewBooking()
{
    const {bookingdata} = useLocalSearchParams();
    const bookingDataObj = JSON.parse(bookingdata);
     const[email,setEmail] = useState('');
     const[specialRequest,setSpecialRequest] = useState('');
     const[editable,setEditable] = useState(false)
     const[items,setItems] = useState([]);
    useEffect(()=>{
        setItems(bookingDataObj.bookingData);
    },[]);
    return(
        <View>
         <View>
            <Text>Location: {bookingDataObj.location}</Text>
            <Text>Package Cost: {bookingDataObj.packageCost}</Text>
           </View>
        <ScrollView contentContainerStyle={BookingStyle.flexboxcontainer}>
          
            {
                items && items.length>0 ?
                    items.map((item)=>(

                    <View style={BookingStyle.tableContainer} key={`"view"-${item.key}`}>
                         <Table key={`"table"-${item.key}`}>
                             <TBody>
                                <TR>
                                    <TD>
                                        <Text>Name:</Text>
                                    </TD>
                                     <TD>
                                        <TextInput value={item.name} key={`"name"-${item.key}`}
                                        style={BookingStyle.TextInput} editable={editable}/>
                                    </TD>
                                     <TD>
                                        <Text>Mobile#:</Text>
                                    </TD>
                                     <TD>
                                        <TextInput value={item.mobile} key={`"mobile"-${item.key}`}
                                        style={BookingStyle.TextInput} editable={editable}/>
                                    </TD>
                                </TR>
                                <TR>
                                   <TD>
                                        <Text>Age:</Text>
                                    </TD>
                                     <TD>
                                        <TextInput value={item.age} key={`"age"-${item.key}`}
                                        style={BookingStyle.TextInput} editable={editable}/>
                                    </TD>
                                     <TD>
                                        <Text>Address:</Text>
                                    </TD>
                                     <TD>
                                        <TextInput value={item.address} key={`"address"-${item.key}`}
                                        style={BookingStyle.TextInput} editable={editable}/>
                                    </TD>  
                                </TR>
                             </TBody>
                         </Table>
                   </View> 
                    )):<View></View>
            }
            <View>
                <Text>Enter an email for communication:</Text> 
                <TextInput value={email} onChangeText={setEmail}></TextInput>
            </View>
        </ScrollView>
            </View>


    )
    
}