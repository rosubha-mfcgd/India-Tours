import { KeyboardAvoidingView, Platform,ScrollView, Text,TextInput,View } from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js' ;
import BookingStyle from '../../styles/bookingStyle.js';
import { useEffect, useState } from "react";
import { TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { Table,  TBody, TR, TD } from '@expo/html-elements';
import {updateBooking,validateBookingData} from  '../../admin/utility';
 import TourismCommonModal from '../../admin/tourismCommonModal.js'

import { useRouter } from 'expo-router';


export default function BookMyTrip()
{
    const {location,tourmanagerName,cityname,startdate,enddate,
        tourManagerId,domesticOrInternational,packageCost} = useLocalSearchParams();
    const [count,setCount] = useState('')
    const[items, setItems] = useState([]);
    const[nameOfTourist,setNameOfTourist] = useState([]);
    const router = useRouter();
    const[age,setAge] = useState([]);
    const[mobile,setMobile] = useState([]);
    const[modalVisible,setModalVisible] = useState(false);
    const[streetaddress,setStreetaddress] = useState([]);
    const[pincode,setPincode] = useState([]);
    const[openBookingForm, setOpenBookingForm] = useState(false);
    const[jsonStr,setJsonStr] = useState(null);
    const[errorMessage,setErrorMessage] = useState(null)
    //This is the final result tourist info payload
    const [booking,setBooking] = useState({
        tourManagerId:tourManagerId,
        location:location,
        startdate:startdate,
        enddate:enddate,
        domesticOrInternational:domesticOrInternational,
        package_cost:packageCost,
        bookingData: []
    })
     
    const handleSubmit = async(bookingData) =>{
      
      let booking = JSON.parse(bookingData);
      console.log('bookingData for validation....',booking)
       let errorMessage = await validateBookingData(booking.bookingData);
       
       if(errorMessage)
       {
        console.log('errorMessage....',errorMessage);
       setErrorMessage(errorMessage);
       setModalVisible(true);           
       }else{
        setModalVisible(false)
        router.push({
              pathname: "/tourism/previewbooking",
          params: {  bookingdata: jsonStr }
          });
       }
    }
    
    const handleValueOnBlur = (data,field) =>{
    
      console.log('bookingData for validation....',data)
     let errMesage = '';
     if("name" === field)
      {
       if(!(/^[a-zA-Z\s]+$/).test(data))
       {
           errMesage =  'Name can only contain letters and spaces'
           setErrorMessage(errMesage)
       }
      } 
      else if("mobile" === field)
      {
       if(!(/^[0-9]{10}$/).test(data))
       {
           errMesage =  'Mobile number is not valid'
           setErrorMessage(errMesage)
       }
      } 

     else if("age" === field)
      {
       if(data<0 || data>92)
       {
           errMesage =  'You must be younger than 92 years old'
           setErrorMessage(errMesage)
       }
      } 
      else if("pincode" === field)
      {
       if(!(/^[0-9]{6}$/).test(data))
       {
           errMesage =  'Pincode must be exactly 6 digits'
           setErrorMessage(errMesage)
       }
      } 
       else if("streetname" === field)
      {
       if(!(/^[a-zA-Z0-9\s.,#-]+$/).test(data))
       {
           errMesage =  'Invalid street name'
           setErrorMessage(errMesage)
       }
      } 
      
      if(errorMessage)
      {
        setModalVisible(true)
      }else{
        setModalVisible(false)
      }
    }

    const changeTouristCount=(action) =>{
       
        let currentVal = +count;
       
        if(action === 'add'){
             currentVal = currentVal+1;
             console.log('currentVal....',currentVal)
         setCount(currentVal.toString());
        }
        else if(action === 'remove')
        {
            if(currentVal>0){
             currentVal = currentVal-1;
             setCount(currentVal.toString());
            }else{
                setCount('');
            }
        }
       // createForms(currentVal);
        }

   
    const updateTourBooking = (key,name,value) =>{
             updateBooking(key,name,value, booking,setBooking);
             setJsonStr(JSON.stringify(booking));
        }
      
      useEffect(()=>{
      
          let result = [];
          console.log('value is....',count)
          if(parseInt(count)>0)
          {
              for(let idx=0;idx<parseInt(count);idx++)
              {
                  let data = {"key":(idx+1),"value":(idx+1)}

                  result.push(data);
              }
          console.log('result...',result);
         // setTouristCount(result);
        setItems(result);
          
           booking.bookingData[+count-1] = {};
          setOpenBookingForm(true);
          }

    },[count]);

    
    return(
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' works best for iOS, 'height' or 'padding' for Android
      style={{ flex: 1 }}
    >

    
        <ScrollView contentContainerStyle = {BookingStyle.contentContainer} 
           showsVerticalScrollIndicator={true} // Ensures vertical scroll indicator is visible
      showsHorizontalScrollIndicator={false} // Ensures horizontal scroll indicator is hidden (if not needed)
        >
            <Text style={TextStyle.h2}> This page books your trip for {location} with {tourmanagerName} {cityname}</Text>
          {
            modalVisible ? 
            <TourismCommonModal modalVisible={modalVisible} 
            setModalVisible={setModalVisible} errorMessage={errorMessage}/>:<View/>
          }

          <View style={BookingStyle.flexboxcontainer}>
            
              <View style= {BookingStyle.column}>
             <TextInput
              placeholder="Enter No. of Travellers"
        value={count}
        
      />
        </View>
        <View>
             <Ionicons name="add-circle" size={32} color="blue" onPress={()=>changeTouristCount('add')}/>
        </View>
        <View>
             <Ionicons name="remove-circle" size={32} color="red" onPress={()=>changeTouristCount('remove')}/>
        </View>
                
        </View>
        
        {openBookingForm ?
       
            
                items && items.length>0 ?
                     items.map((item)=>(
             
        
        
                       <View key={`"view"-${item.key}`} style={BookingStyle.tableContainer}>
                         <Text  key={`"header"-${item.key}`}>Tourist #: {item.key}</Text>
                            <Table key={`"table"-${item.key}`} >

                                <TBody>
                        <TR>
                       <TD style={BookingStyle.tableCell}> 
                        <Text  key={`"namelabel"-${item.key}`}>Name:</Text></TD>
                       </TR>
                        <TR>
                      <TD key={`"cell"-${item.key}`}>  
                          
                <TextInput 
              placeholder="Name" key={`"name"-${item.key}`}  
              style={BookingStyle.textfieldunderlinedInput}
        value={nameOfTourist[`${item.key}-1`]} onChangeText={text=>
        {
            nameOfTourist[`${item.key}-1`]=text
            updateTourBooking(item.key,"name",text)
        }}
        onBlur={() =>{
          handleValueOnBlur(nameOfTourist[`${item.key}-1`],'name')
        }}
      /> 
        </TD></TR>
            <TR>
              <TD style={BookingStyle.tableCell}> 
                <Text  key={`"mobilelabel"-${item.key}`}>Mobile#:</Text></TD> 
            </TR>
            <TR>
                <TD> 
        <TextInput 
              placeholder="Mobile #" key={`"mobile"-${item.key}`}  style={BookingStyle.textfieldunderlinedInput}
        value={mobile[`${item.key}-1`]} onChangeText={text=>
        {
          
            mobile[`${item.key}-1`]=text
            updateTourBooking(item.key,"mobile",text)}} 
             onBlur={() =>{
          handleValueOnBlur(mobile[`${item.key}-1`],'mobile')
        }}
            />
         
          </TD>
           </TR>
             <TR>
              <TD style={BookingStyle.tableCell}> <Text  key={`"agelabel"-${item.key}`}>Age:</Text></TD>
             </TR>
                <TR>                    
                 <TD>  
         <TextInput 
              placeholder="Age" key={`"age"-${item.key}`} style={BookingStyle.textfieldunderlinedInput}
        value={age[`${item.key}-1`]} onChangeText={text=>
        {
             age[`${item.key}-1`] = text
            updateTourBooking(item.key,"age",text)}}
            onBlur={() =>{
          handleValueOnBlur(age[`${item.key}-1`],'age')
        }}
            />
           
        </TD>           
     </TR> 
      <TR>
        <TD style={BookingStyle.tableCell}> <Text  key={`"streetaddresslabel"-${item.key}`}>Street Name</Text></TD>
      </TR>
       <TR>                    
        <TD>  
         <TextInput 
              placeholder="Street Name" key={`"streetname"-${item.key}`} 
              style={BookingStyle.textfieldunderlinedInput}
        value={streetaddress[`${item.key}-1`]} onChangeText={text=>
        {
            streetaddress[`${item.key}-1`] = text
            updateTourBooking(item.key,"streetname",text)}}
            onBlur={() =>{
          handleValueOnBlur(streetaddress[`${item.key}-1`],'streetname')
        }} 
            />
          
        </TD>           
     </TR>
    <TR>
        <TD style={BookingStyle.tableCell}> <Text  key={`"pincodelabel"-${item.key}`}>Pin code</Text></TD>
      </TR>
       <TR>                    
        <TD>  
         <TextInput 
              placeholder="Pin Code" key={`"pincode"-${item.key}`} style={BookingStyle.textfieldunderlinedInput}
        value={pincode[`${item.key}-1`]} onChangeText={text=>
        {
            pincode[`${item.key}-1`] = text
            updateTourBooking(item.key,"pincode",text)}}
              onBlur={() =>{
          handleValueOnBlur(pincode[`${item.key}-1`],'pincode')
        }} 
          />
          
        </TD>           
     </TR>

     </TBody> 
       </Table>
       </View>
       
        
    )):<View></View>
            
            
        :<View></View>
        }
       {jsonStr && openBookingForm ? 
 
                <TouchableOpacity 
                    style={TourCommonStyle.bookingbutton}>
                    <Text style={TourCommonStyle.buttonText} onPress={()=>
                      handleSubmit(jsonStr)}>Submit</Text>
                  </TouchableOpacity>
           :<View></View>
}
        </ScrollView>
</KeyboardAvoidingView>

    )
    
}