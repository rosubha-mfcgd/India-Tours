import { KeyboardAvoidingView,Platform,Text, Button,TextInput, View,
    TouchableOpacity ,FlatList,Pressable } 
from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets,SafeAreaView } from 'react-native-safe-area-context'
import {CustomFirstDialog} from '../../admin/customModals'
import PreviewBookingStyle from '../../styles/previewbookingStyle.js';
import TourCommonStyle from '../../styles/tourCommonStyle';
import { AlertStyles } from '../../styles/AlertButtonStyle';
import { useEffect, useState,useRef  } from "react";
import { useLocalSearchParams,Link } from 'expo-router';
import { Table,  TBody, TR, TD } from '@expo/html-elements';
 import { MaterialIcons } from '@expo/vector-icons'; // For the arrow icon
import {formatINR} from "../../admin/utility";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function PreviewBooking()
{
    const {bookingdata} = useLocalSearchParams();
    const bookingDataObj = JSON.parse(bookingdata);
     const[email,setEmail] = useState('');
     const[specialRequest,setSpecialRequest] = useState('');
     const [deletemodalVisible, setDeletemodalVisible] = useState(false);
      const [updatemodalVisible, setUpdatemodalVisible] = useState(false);
     const[editable,setEditable] = useState(false)
     const[items,setItems] = useState([]);
     const [totalAmountPayable,setTotalAmountPayable] = useState(0);
       const inputRef = useRef(null);

      const getFocus = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
      const handleDelete = (index)=>{
        setDeletemodalVisible(true)
      }

       const handleUpdate = ()=>{
        setEditable(true)
      }

        const handleOk = () => {
    // Perform actions when "OK" is pressed
    console.log('OK pressed');
    setDeletemodalVisible(false);
  };

  const handleCancel = () => {
    // Perform actions when "Cancel" is pressed
    console.log('Cancel pressed');
    setDeletemodalVisible(false);
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

                <Text style={PreviewBookingStyle.h2}>Trip to  {bookingDataObj.location}</Text>
                   <Text style={PreviewBookingStyle.h2}>Total package cost {formatINR(totalAmountPayable)}</Text>
                 <Link href="/next-page" asChild>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', padding: 10, 
                backgroundColor: '#ff00c8ff', borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 18, marginRight: 5 }}>Make Payment</Text>
              <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
            </Pressable>
            </Link>
                 
                 
             
                 
                 {/* <Text style={PreviewBookingStyle.h2}>Enter an email for better communication with us:</Text>
                  <TextInput value={email} onChangeText={setEmail} 
                ref={inputRef}
                onPress={getFocus}
                placeholder="Enter Email..." 
                style={PreviewBookingStyle.TextInput}></TextInput> */}

                {/* <Text style={PreviewBookingStyle.h3}>If you have any special request for your trip, please let us know. 
                    We'll try our best to assist you.
                </Text>
                  <TextInput value={specialRequest} onChangeText={setSpecialRequest} 
                ref={inputRef}
                onPress={getFocus}
                placeholder="Special request (if any)" 
                style={PreviewBookingStyle.TextInput}></TextInput> */}
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
                                         
                                         <Ionicons name='remove-circle' size={24} color="green" 
                                         onPress={()=>handleDelete(item.index)}/>   
                                         

                                      
                                         <Ionicons name='pencil-sharp' size={24} color="black" 
                                         onPress={handleUpdate}/> 
                                        
                                         <Ionicons name='save' size={24} color="black" 
                                         onPress={handleUpdate}/> 
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
            ListHeaderComponent={RenderHeader} 
             nestedScrollEnabled={true}
             />
    }
   
        {/* Step 3 & 4: The Cross Button */}
      <CustomFirstDialog visible={deletemodalVisible} onClose={() => setDeletemodalVisible(false)}>
        <Text style={AlertStyles.modalText}>Do you want to delete this booking?</Text>
         <View style={AlertStyles.modalbuttonContainer}>
              <Pressable
                style={[AlertStyles.modalbutton, AlertStyles.modalbuttonCancel]}
                onPress={handleCancel}
              >
                <Text style={AlertStyles.modaltextStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[AlertStyles.modalbutton, AlertStyles.modalbuttonOk]}
                onPress={handleOk}
              >
                <Text style={AlertStyles.modaltextStyle}>OK</Text>
              </Pressable>
            </View>
      </CustomFirstDialog>

    <CustomFirstDialog visible={updatemodalVisible} onClose={() => setUpdatemodalVisible(false)}>
        <Text style={AlertStyles.modalText}>Do you want to update your booking?</Text>
         <View style={AlertStyles.modalbuttonContainer}>
              <Pressable
                style={[AlertStyles.modalbutton, AlertStyles.modalbuttonCancel]}
                onPress={handleCancel}
              >
                <Text style={AlertStyles.modaltextStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[AlertStyles.modalbutton, AlertStyles.modalbuttonOk]}
                onPress={handleOk}
              >
                <Text style={AlertStyles.modaltextStyle}>OK</Text>
              </Pressable>
            </View>
      </CustomFirstDialog>

 
               
        
      
            </SafeAreaView>
            </SafeAreaProvider>
             

    )
    
}