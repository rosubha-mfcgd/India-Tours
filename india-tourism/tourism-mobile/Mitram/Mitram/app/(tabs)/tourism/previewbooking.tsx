import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets,SafeAreaView } from 'react-native-safe-area-context'
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js' ;
import PreviewBookingStyle from '../../styles/previewbookingStyle.js';

import { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router';
import { Table,  TBody, TR, TD } from '@expo/html-elements';
import { FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {formatINR} from "../../admin/utility";
export default function PreviewBooking()
{
    const {bookingdata} = useLocalSearchParams();
    const bookingDataObj = JSON.parse(bookingdata);
     const[email,setEmail] = useState('');
     const[specialRequest,setSpecialRequest] = useState('');
     const[editable,setEditable] = useState(false)
     const[items,setItems] = useState([]);
     const [totalAmountPayable,setTotalAmountPayable] = useState(0);
     const insets = useSafeAreaInsets();

    useEffect(()=>{
        console.log('bookingData....',bookingdata)
        setItems(bookingDataObj.bookingData);
        console.log('items...',items);
        let totaltourists = bookingDataObj.bookingData.length;
        setTotalAmountPayable((+bookingDataObj.package_cost)*(totaltourists));
    },[]);

    const navigation = useNavigation();
     useEffect(() => {
    // Hide the tab bar when this screen is focused
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });

    // Reset the tab bar style when the screen is unfocused
    return () => {
      navigation.setOptions({
        tabBarStyle: { display: 'flex' }, // or your default style
      });
    };
  }, [navigation]);
    const RenderHeader = () =>{
        return (
             <View style={PreviewBookingStyle.contentContainer}>
                <Text style={PreviewBookingStyle.h2}>Review your booking for your trip to  {bookingDataObj.location}</Text>
                <Text style={PreviewBookingStyle.h2}>Your total package cost is {formatINR(totalAmountPayable)}</Text>
            </View>
        )
    }

    const RenderFooter = () =>{
        return (
             <View>
                <Text style={PreviewBookingStyle.h2}>Enter an email for better communication:</Text>
                <TextInput value={email} onChangeText={setEmail} 
                placeholder="Email" 
                style={PreviewBookingStyle.TextInput}></TextInput>
                
            </View>
        )
    }

    const RenderBookingList = ({item}) =>{
        return(
            
             <View style={PreviewBookingStyle.tableContainer} key={`"view"-${item.index}`}>
                         <Table key={`"table"-${item.index}`} style={PreviewBookingStyle.previewtable}>
                             <TBody>
                                <TR>
                                    <TD style={PreviewBookingStyle.tdlabelcell}>
                                        <Text>Name:</Text>
                                    </TD>
                                     <TD style={PreviewBookingStyle.tdcell}>
                                        <TextInput value={item.name} key={`"name"-${item.index}`}
                                        style={PreviewBookingStyle.TextInput} editable={editable}/>
                                    </TD>
                                    </TR>
                                    <TR>
                                     <TD style={PreviewBookingStyle.tdlabelcell}>
                                        <Text>Mobile#:</Text>
                                    </TD>
                                     <TD style={PreviewBookingStyle.tdcell}>
                                        <TextInput value={item.mobile} key={`"mobile"-${item.index}`}
                                        style={PreviewBookingStyle.TextInput} editable={editable}/>
                                    </TD>
                                </TR>
                                <TR>
                                   <TD style={PreviewBookingStyle.tdlabelcell}>
                                        <Text>Age:</Text>
                                    </TD>
                                     <TD style={PreviewBookingStyle.tdcell}>
                                        <TextInput value={item.age} key={`"age"-${item.index}`}
                                        style={PreviewBookingStyle.TextInput} editable={editable}/>
                                    </TD>
                                    </TR>
                                    <TR>
                                     <TD style={PreviewBookingStyle.tdlabelcell}>
                                        <Text>Address:</Text>
                                    </TD>
                                     <TD style={PreviewBookingStyle.tdcell}>
                                        <TextInput value={item.address} key={`"address"-${item.index}`}
                                        style={PreviewBookingStyle.TextInput} editable={editable}/>
                                    </TD>  
                                </TR>
                             </TBody>
                         </Table>
                         </View>
        )  
    }

    return(
            <SafeAreaProvider> 
  <SafeAreaView style={PreviewBookingStyle.safeAreaContainer} edges={['top', 'bottom']}>
   
           
          
            {
          <FlatList
            data={items}
            renderItem={({item})=> <RenderBookingList item = {item}/>}
            keyExtractor={item =>`${item.index}` }
            ListHeaderComponent={RenderHeader} ListFooterComponent={RenderFooter}
            />
            }
            </SafeAreaView>
            </SafeAreaProvider>

    )
    
}