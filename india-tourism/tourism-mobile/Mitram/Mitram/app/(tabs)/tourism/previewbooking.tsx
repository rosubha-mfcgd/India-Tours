import {Text, TextInput, View,
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
import {formatINR,updateBooking} from "../../admin/utility";
export default function PreviewBooking()
{
    const {bookingdata,tourmanagerName} = useLocalSearchParams();
    const [bookingDataObj, setBookingDataObj] = useState(JSON.parse(bookingdata));
    
     const [deletemodalVisible, setDeletemodalVisible] = useState(false);
      const [updatemodalVisible, setUpdatemodalVisible] = useState(false);
     const[editable,setEditable] = useState(false)
     const[items,setItems] = useState([]);
     const [totalAmountPayable,setTotalAmountPayable] = useState(0);
     const [jsonStr,setJsonStr] = useState(JSON.stringify(bookingDataObj));
      const inputRef = useRef([]);

      const getFocus = (index) => {
       
        if (inputRef.current[index]) {
        console.log('input ref index at ',index)
          inputRef.current[index].focus();
          
        }
      };
      const handleDelete = (index)=>{
        setDeletemodalVisible(true)
      }

       const updateTourBooking = (key,name,value) =>{
                    console.log('key increment...',key+1);
                   updateBooking(key+1,name,value, bookingDataObj,setBookingDataObj);
                   setJsonStr(JSON.stringify(bookingDataObj));
              }
      

       const handleUpdate = (index)=>{
        console.log('Update attempted....')
        setEditable(true)
        getFocus(index);
      }

         const handleSave = ()=>{
        console.log('Save attempted....')
        setEditable(false)
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
        bookingDataObj.totalAmountPayable = totalAmountPayable;
         setJsonStr(JSON.stringify(bookingDataObj));
    },[]);

   
    const RenderHeader = () =>{
        return (
             <View style={PreviewBookingStyle.contentContainer}>

                <Text style={PreviewBookingStyle.h2}>Trip to  {bookingDataObj.location}</Text>
                   <Text style={PreviewBookingStyle.h2}>Total package cost {formatINR(totalAmountPayable)}</Text>
                <View style={TourCommonStyle.buttonscontainer}>
                <View style = {TourCommonStyle.buttonWrapper}>
                 <Link href={{pathname:"/tourism/payforTrip" ,
                                             params: { 
                                                bookingdata: jsonStr,
                                                tourmanagerName:tourmanagerName
                                             }
                                          }} asChild>
            <Pressable style={TourCommonStyle.bookingbutton}>
              <Text style={{ color: 'white', fontSize: 18, marginRight: 5 }}>Go to Payment</Text>
              
            </Pressable>
            </Link>
            </View>
            </View>
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
                                         ref={(el) => (inputRef.current[item.index] = el)}
                                        style={PreviewBookingStyle.TextInput} editable={editable}
                                        onChangeText={text=>
                                  {
                                    updateTourBooking(item.index,"name",text)
                                 }}>
                                        
                                    </TextInput>
                                        
                                    </TD>
                                    </TR>
                                    <TR>
                                     <TD style={PreviewBookingStyle.tdlabelcell}>
                                        <Text>Mobile#:</Text>
                                    </TD>
                                     <TD style={PreviewBookingStyle.tdcell}>
                                        <TextInput value={item.mobile} key={`"mobile"-${item.index}`}
                                        style={PreviewBookingStyle.TextInput} editable={editable}
                                         autoFocus={editable} 
                                        onChangeText={text=>
                                     {
                                       updateTourBooking(item.index,"mobile",text)
                                     }}/>
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
                                        editable={editable} onChangeText={text=>
                                     {
                                             updateTourBooking(item.index,"age",text)
                                     }}/>
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
                                        editable={editable} onChangeText={text=>
                                     {
                                             updateTourBooking(item.index,"streetaddress",text)
                                     }}/>
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
                                        editable={editable} onChangeText={text=>
                                     {
                                             updateTourBooking(item.index,"pincode",text)
                                     }}/>
                                    </TD>  
                                </TR>
                             </TBody>
                         </Table>
                           <View style={TourCommonStyle.buttonscontainer}>
            <View style = {TourCommonStyle.buttonWrapper}>
             <TouchableOpacity style={TourCommonStyle.bookingbutton} 
             onPress={()=>handleUpdate(item.index)}>
              <Text style={{ color: 'white', fontSize: 18, marginRight: 5 }}>Edit</Text>
              </TouchableOpacity>
              </View>  
              <View style = {TourCommonStyle.buttonWrapper}>
             <TouchableOpacity style={TourCommonStyle.bookingbutton}  onPress={handleSave}>
              <Text style={{ color: 'white', fontSize: 18, marginRight: 5 }}>Delete</Text>
              </TouchableOpacity>
              </View>  
              </View>
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