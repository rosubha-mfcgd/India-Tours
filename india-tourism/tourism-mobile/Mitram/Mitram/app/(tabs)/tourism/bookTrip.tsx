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

import RadioButton from '../../admin/RadioButton';
export default function BookMyTrip()
{
    const {location,tourmanagerName,cityname,startdate,enddate,
        tourManagerId,domesticOrInternational,packageCost} = useLocalSearchParams();
    const [count,setCount] = useState(0)
    const[items, setItems] = useState([]);
    const[nameOfTourist,setNameOfTourist] = useState([]);
    const router = useRouter();
    const[age,setAge] = useState([]);
    const[mobile,setMobile] = useState([]);
    const[modalVisible,setModalVisible] = useState(false);
    const[streetaddress,setStreetaddress] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
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
       
       if(errorMessage && errorMessage != '')
       {
        console.log('errorMessage....',errorMessage);
       setErrorMessage(errorMessage);
       setModalVisible(true);           
       }else{
         setErrorMessage(null);
        setModalVisible(false)
        router.push({
              pathname: "/tourism/previewbooking",
          params: {  bookingdata: jsonStr,tourmanagerName:tourmanagerName }
          });
       }
    }
    
    const handleValueOnBlur = (data,field,index) =>{
    
      console.log('bookingData for validation....',data)
     let errMesage = '';
     setErrorMessage(null)
     if("name" === field)
      {
       if(!(/^[a-zA-Z\s]+$/).test(data))
       {
           errMesage =  'Name can only contain letters and spaces'
           setErrorMessage(errMesage)
           nameOfTourist[index] = ''; 
           
       }
      } 
      else if("mobile" === field)
      {
       if(!(/^[0-9]{10}$/).test(data))
       {
           errMesage =  'Mobile number is not valid'
           setErrorMessage(errMesage)
           mobile[index] = '';
       }
      } 

     else if("age" === field)
      {
       if(data<0 || data>92)
       {
           errMesage =  'You must be younger than 92 years old'
           setErrorMessage(errMesage)
           age[index] = '';
       }
      } 
      else if("pincode" === field)
      {
       if(!(/^[0-9]{6}$/).test(data))
       {
           errMesage =  'Pincode must be exactly 6 digits'
           setErrorMessage(errMesage)
           pincode[index] = ''
       }
      } 
       else if("streetname" === field)
      {
       if(!(/^[a-zA-Z0-9\s.,#-]+$/).test(data))
       {
           errMesage =  'Invalid street name'
           setErrorMessage(errMesage)
           streetaddress[index] = '';
       }
      } 
      
      if(errorMessage && errorMessage != '')
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
         setCount(currentVal);
        }
        else if(action === 'remove')
        {
            if(currentVal>0){
             currentVal = currentVal-1;
             setCount(currentVal);
            }else{
                setCount(0);
            }
        }
       }

   
    const updateTourBooking = (key,name,value) =>{
             updateBooking(key,name,value, booking,setBooking);
             setJsonStr(JSON.stringify(booking));
        }
      
      useEffect(()=>{
      
          let result = [];
          //console.log('value is....',count)
          if(count>0)
          {
              for(let idx=0;idx<count;idx++)
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
            <Text style={TextStyle.h2}> Add your details to book your trip to {location} with {tourmanagerName} {cityname}</Text>
          {
            modalVisible ? 
            <TourismCommonModal modalVisible={modalVisible} 
            setModalVisible={setModalVisible} errorMessage={errorMessage}/>:<View/>
          }

          <View style={BookingStyle.flexboxcontainer}>
            
              <View style= {BookingStyle.column}>
             <TextInput
              placeholder="No. of Travellers"
        value={count.toString()}
        
      />
        </View>
        <View>
             <Ionicons name="add-circle" size={32} color="blue" onPress={()=>changeTouristCount('add')}/>
        </View>
        {/* <View>
             <Ionicons name="remove-circle" size={32} color="red" onPress={()=>changeTouristCount('remove')}/>
        </View> */}
                
        </View>
        
        {openBookingForm ?
       
            
                count>0 ?(
                   //  items.map((item)=>(
             
        
                      
                       <View key={`"view"-${count}`} style={BookingStyle.tableContainer}>
                         <Text  key={`"header"-${count}`} style={TextStyle.bookingtext}>Tourist #: {count}</Text>
                            <Table key={`"table"-${count}`} >

                                <TBody>
                        <TR>
                       <TD style={BookingStyle.tableCell}> 
                        <Text  key={`"namelabel"-${count}`} style={TextStyle.bookingtext}>Name</Text></TD>
                       </TR>
                        <TR>
                      <TD key={`"cell"-${count}`}>  
                          
                <TextInput 
              placeholder="Name" key={`"name"-${count}`}  
              style={BookingStyle.textfieldunderlinedInput}
        value={nameOfTourist[`${count}-1`]} onChangeText={text=>
        {
            nameOfTourist[`${count}-1`]=text
            updateTourBooking(count,"name",text)
        }}
        onBlur={() =>{
          handleValueOnBlur(nameOfTourist[`${count}-1`],'name',`${count}-1`)
        }}
      /> 
        </TD></TR>
            <TR>
              <TD style={BookingStyle.tableCell}> 
                <Text  key={`"mobilelabel"-${count}`} style={TextStyle.bookingtext}>Mobile#</Text>
              </TD> 
              <TD style={BookingStyle.tableCell}> 
                <Text  key={`"genderlabel"-${count}`} style={TextStyle.bookingtext}>Gender</Text>
              </TD>
            </TR>
            <TR>
                <TD> 
        <TextInput 
              placeholder="Mobile #" key={`"mobile"-${count}`}  style={BookingStyle.textfieldunderlinedInput}
        value={mobile[`${count}-1`]} onChangeText={text=>
        {
          
            mobile[`${count}-1`]=text
            updateTourBooking(count,"mobile",text)}} 
             onBlur={() =>{
          handleValueOnBlur(mobile[`${count}-1`],'mobile',`${count}-1`)
        }}
            />
         
          </TD>
          <TD>
        <RadioButton
            label="Male"
            selected={selectedValue === 'Male'}
            onPress={() => 
            {
              setSelectedValue('Male')
              
                updateTourBooking(count,"gender",'Male')
              
            }}
          />
          <RadioButton
            label="Female"
            selected={selectedValue === 'Female'}
            onPress={() => 
            {
              setSelectedValue('Female');
               if(selectedValue)
              {
              updateTourBooking(count,"gender",'Female')
              }
            }
            
          }
          />
          </TD>
           </TR>
             <TR>
              <TD style={BookingStyle.tableCell}> 
                <Text  key={`"agelabel"-${count}`} style={TextStyle.bookingtext}>Age:</Text>
                </TD>
            <TD style={BookingStyle.tableCell}> 
              <Text  key={`"pincodelabel"-${count}`} style={TextStyle.bookingtext}>Pin code</Text>
            </TD>
                
             </TR>
                <TR>                    
                 <TD>  
         <TextInput 
              placeholder="Age" key={`"age"-${count}`} style={BookingStyle.textfieldunderlinedInput}
        value={age[`${count}-1`]} onChangeText={text=>
        {
             age[`${count}-1`] = text
            updateTourBooking(count,"age",text)}}
            onBlur={() =>{
          handleValueOnBlur(age[`${count}-1`],'age',`${count}-1`)
        }}
            />
           
        </TD>  
         <TD>  
         <TextInput 
              placeholder="Pin Code" key={`"pincode"-${count}`} 
              style={BookingStyle.textfieldunderlinedInput}
        value={pincode[`${count}-1`]} onChangeText={text=>
        {
            pincode[`${count}-1`] = text
            updateTourBooking(count,"pincode",text)}}
              onBlur={() =>{
          handleValueOnBlur(pincode[`${count}-1`],'pincode',`${count}-1`)
        }} 
          />
          
        </TD>           
     </TR> 
      <TR>
        <TD style={BookingStyle.tableCell}> <Text  key={`"streetaddresslabel"-${count}`} 
        style={TextStyle.bookingtext}>Street Name</Text></TD>
      </TR>
       <TR>                    
        <TD>  
         <TextInput 
              placeholder="Street Name" key={`"streetname"-${count}`} 
              style={BookingStyle.textfieldunderlinedInput}
        value={streetaddress[`${count}-1`]} onChangeText={text=>
        {
            streetaddress[`${count}-1`] = text
            updateTourBooking(count,"streetname",text)}}
            onBlur={() =>{
          handleValueOnBlur(streetaddress[`${count}-1`],'streetname',`${count}-1`)
        }} 
            />
          
        </TD>           
     </TR>
     </TBody> 
       </Table>
       </View>
       
        
    //)
  ):<View></View>
      
            
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