import { KeyboardAvoidingView,Platform,Text, TextInput, View,TouchableOpacity ,FlatList } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets,SafeAreaView } from 'react-native-safe-area-context'

import PreviewBookingStyle from '../../styles/previewbookingStyle.js';

import { useEffect, useState,useRef  } from "react";
import { useLocalSearchParams,Link } from 'expo-router';
import { Table,  TBody, TR, TD } from '@expo/html-elements';

import {formatINR} from "../../admin/utility";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function PreviewBooking()
{
    const {bookingdata} = useLocalSearchParams();
    const bookingDataObj = JSON.parse(bookingdata);
     const[email,setEmail] = useState('');
     const[specialRequest,setSpecialRequest] = useState('');
     const[editable,setEditable] = useState(false)
     const[items,setItems] = useState([]);
     const [totalAmountPayable,setTotalAmountPayable] = useState(0);
       const inputRef = useRef(null);

      const getFocus = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
     const insets = useSafeAreaInsets();

    useEffect(()=>{
        console.log('bookingData....',bookingdata)
        setItems(bookingDataObj.bookingData);
        console.log('items...',items);
        let totaltourists = bookingDataObj.bookingData.length;
        setTotalAmountPayable((+bookingDataObj.package_cost)*(totaltourists));
    },[]);

   
    const RenderHeader = () =>{
        return (
             <View style={PreviewBookingStyle.contentContainer}>

                <Text style={PreviewBookingStyle.h2}>Review your booking for your trip to  {bookingDataObj.location}</Text>
                
                 <Text style={PreviewBookingStyle.h2}>Enter an email for better communication with us:</Text>
                  <TextInput value={email} onChangeText={setEmail} 
                ref={inputRef}
                onPress={getFocus}
                placeholder="Enter Email..." 
                style={PreviewBookingStyle.TextInput}></TextInput>
               
            </View>
        )
    }

    const RenderFooter = () =>{
        return (
             <View>
               
                             <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? 'position' : 'height'} // Adjust behavior for iOS
      style={{flex:1}}
    >
         <Text style={PreviewBookingStyle.h2}>Your total package cost is {formatINR(totalAmountPayable)}</Text>        
              
       </KeyboardAvoidingView>         
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
                                        style={PreviewBookingStyle.TextInput} editable={editable}>
                                         <Ionicons name='trash-sharp' size={24} color="tomato" />   
                                         <Ionicons name='save' size={24} color="tomato" /> 
                                            </TextInput>
                                        
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
                                        <TextInput value={item.age} 
                                        key={`"age"-${item.index}`}
                                        style={PreviewBookingStyle.TextInput} 
                                        editable={editable}/>
                                    </TD>
                                    </TR>
                                    <TR>
                                     <TD style={PreviewBookingStyle.tdlabelcell}>
                                        <Text>Street Name:</Text>
                                    </TD>
                                     <TD style={PreviewBookingStyle.tdcell}>
                                        <TextInput value={item.streetname} 
                                        key={`"streetaddress"-${item.index}`}
                                        style={PreviewBookingStyle.TextInput} 
                                        editable={editable}/>
                                    </TD>  
                                </TR>

                                <TR>
                                     <TD style={PreviewBookingStyle.tdlabelcell}>
                                        <Text>Pin Code:</Text>
                                    </TD>
                                     <TD style={PreviewBookingStyle.tdcell}>
                                        <TextInput value={item.pincode} 
                                        key={`"pincode"-${item.index}`}
                                        style={PreviewBookingStyle.TextInput} 
                                        editable={editable}/>
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
             nestedScrollEnabled={true}
             />
    }
   
        {/* Step 3 & 4: The Cross Button */}
      <TouchableOpacity 
        style={PreviewBookingStyle.closeButton} 
        onPress={() => console.log('Close button pressed!')}
      >
        
      </TouchableOpacity>
            </SafeAreaView>
            </SafeAreaProvider>
             

    )
    
}