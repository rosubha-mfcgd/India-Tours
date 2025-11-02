import { KeyboardAvoidingView, Platform,ScrollView, Text,TextInput,View } from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js' ;
import BookingStyle from '../../styles/bookingStyle.js';
import { useEffect, useState } from "react";
import { TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams,Link } from 'expo-router';
import { Table,  TBody, TR, TD } from '@expo/html-elements';

export default function BookMyTrip()
{
    const {location,tourmanagerName,cityname,startdate,enddate,
        tourManagerId,domesticOrInternational,packageCost} = useLocalSearchParams();
    const [count,setCount] = useState('')
    const[items, setItems] = useState([]);
    const[nameOfTourist,setNameOfTourist] = useState([]);
   
    const[age,setAge] = useState([]);
    const[mobile,setMobile] = useState([]);
    
      const[address,setAddress] = useState([]);
    const[openBookingForm, setOpenBookingForm] = useState(false);
    const[jsonStr,setJsonStr] = useState(null);
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

   
    const updateBooking = (key,name,value) =>{
            console.log('booking...',booking)
            console.log('VALUE...',value)
            booking.bookingData[key-1][name] = value;
            booking.bookingData[key-1]["index"] = key-1;
            setBooking(booking);
            console.log('final booking....',booking)
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
              placeholder="Name" key={`"name"-${item.key}`}  style={BookingStyle.TextInput}
        value={nameOfTourist[`${item.key}-1`]} onChangeText={text=>
        {
            nameOfTourist[`${item.key}-1`]=text
            updateBooking(item.key,"name",text)
        }}/>  </TD></TR>
            <TR>
              <TD style={BookingStyle.tableCell}> 
                <Text  key={`"mobilelabel"-${item.key}`}>Mobile#:</Text></TD> 
            </TR>
            <TR>
                <TD> 
        <TextInput 
              placeholder="Mobile #" key={`"mobile"-${item.key}`}  style={BookingStyle.TextInput}
        value={mobile[`${item.key}-1`]} onChangeText={text=>
        {
            mobile[`${item.key}-1`]=text
            updateBooking(item.key,"mobile",text)}} />
        
          </TD>
           </TR>
             <TR>
              <TD style={BookingStyle.tableCell}> <Text  key={`"agelabel"-${item.key}`}>Age:</Text></TD>
             </TR>
                <TR>                    
                 <TD>  
         <TextInput 
              placeholder="Age" key={`"age"-${item.key}`} style={BookingStyle.TextInput}
        value={age[`${item.key}-1`]} onChangeText={text=>
        {
            age[`${item.key}-1`] = text
            updateBooking(item.key,"age",text)}}/>
        </TD>           
     </TR> 
      <TR>
        <TD style={BookingStyle.tableCell}> <Text  key={`"addresslabel"-${item.key}`}>Address:</Text></TD>
      </TR>
       <TR>                    
                 <TD>  
         <TextInput 
              placeholder="Address" key={`"address"-${item.key}`} style={BookingStyle.TextInput}
        value={address[`${item.key}-1`]} onChangeText={text=>
        {
            address[`${item.key}-1`] = text
            updateBooking(item.key,"address",text)}}/>
        </TD>           
     </TR>
     </TBody> 
       </Table>
       </View>
        
    )):<View></View>
            
            
        :<View></View>
        }
       {jsonStr && openBookingForm ? 
  <Link href={{pathname:"/tourism/previewbooking",
                                             params: { 
                                                bookingdata: jsonStr
                                             }
                                          }} asChild>
                <TouchableOpacity 
                    style={TourCommonStyle.bookingbutton}>
                    <Text style={TourCommonStyle.buttonText}>Submit</Text>
                  </TouchableOpacity>
            </Link>:<View></View>
}
        </ScrollView>
</KeyboardAvoidingView>

    )
    
}