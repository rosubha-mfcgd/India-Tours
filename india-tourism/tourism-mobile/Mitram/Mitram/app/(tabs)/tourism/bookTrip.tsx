import { ScrollView, Text,TextInput,View } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import ProductStyle from '../../styles/productStyle.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js' ;
import BookingStyle from '../../styles/bookingStyle.js';
import {getBookingsByBookingId} from "../../admin/admin";
import { useEffect, useState } from "react";
import { TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { Table, THead, TH, TBody, TR, TD } from '@expo/html-elements';
export default function BookMyTrip()
{
    const {location,tourmanagerName,cityname,startdate,enddate,
        tourManagerId,domesticOrInternational,packageCost} = useLocalSearchParams();
    const [count,setCount] = useState('')
    const[items, setItems] = useState([]);
    const[nameOfTourist,setNameOfTourist] = useState('');
    const[email,setEmail] = useState('');
    const[age,setAge] = useState('');
    const[mobile,setMobile] = useState('');
     const[specialRequest,setSpecialRequest] = useState('');
    const[openBookingForm, setOpenBookingForm] = useState(false);
    
    //This is the final result tourist info payload
    const [booking,setBooking] = useState({
        tourManagerId:tourManagerId,
        location:location,
        startdate:startdate,
        enddate:enddate,
        domesticOrInternational:domesticOrInternational,
        bookingData: []
    })
        //This is the booking record for each tourist
     const [bookingData,setBookingData] = useState({
        
        name: '',
        email: '',
        mobile: '',
        age: '',
        specialRequest: ''
      });
     

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
            setBookingData(booking.bookingData[key-1]);
                bookingData[name] = value;
                booking.bookingData[key-1] = bookingData;
            }
        
      

    const submitBookings = async() =>{
        let noOfTourists = count === ''?0:(+count);
         for(let count = 1;count<=noOfTourists;count++)
          {
            updateBooking('name',count,'name');
            updateBooking('mobile',count,'mobile');
            updateBooking('email',count,'email');
            updateBooking('age',count,'age'); 
            updateBooking('specialRequest',count,'specialRequest');
          }
     }
    

    useEffect(()=>{
        // let result = [];
        // if(count){
        //     let data = {"key":(count),"value":(count)};
        //     result.push(data);
        //     setItems(result);
        //     setOpenBookingForm(true);
        // }else{
        //    setItems(result);
        //     setOpenBookingForm(false); 
        // }
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
          
          for(let index=0;index<parseInt(count);index++)
          {
           booking.bookingData[index] = {};
          }
         
        
         setOpenBookingForm(true);
          }else if(openBookingForm){
            let totalbookings =  booking.bookingData.length-1;
            booking.bookingData[totalbookings+1] = {};
        }

    },[count]);

    
    return(
        <View contentContainerStyle = {BookingStyle.contentContainer}>
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
        <View style={BookingStyle.tableContainer}>
        {openBookingForm ?
       
            
                items && items.length>0 ?
                     items.map((item)=>(
                       <View key={`"view"-${item.key}`} >
                         <Text  key={`"header"-${item.key}`}>Tourist no#: {item.key}</Text>
                            <Table key={`"table"-${item.key}`} >
                                <TR>
                       <TD style={BookingStyle.tableCell}> <Text  key={`"namelabel"-${item.key}`}>Name:</Text></TD>
                        <TD style={BookingStyle.tableCell}> <Text  key={`"mobilelabel"-${item.key}`}>Mobile#:</Text></TD> 
                         <TD style={BookingStyle.tableCell}> <Text  key={`"agelabel"-${item.key}`}>Age:</Text></TD>
                         </TR>
                         <TR>
                      <TD key={`"cell"-${item.key}`}>    
                <TextInput 
              placeholder="Name" key={`"name"-${item.key}`} 
        value={nameOfTourist} onBlur={()=>updateBooking(item.key,"name",nameOfTourist)}/>  </TD> 
                        
                    <TD> 
        <TextInput 
              placeholder="Mobile #" key={`"mobile"-${item.key}`} 
        value={mobile} onBlur={()=>updateBooking(item.key,"mobile",mobile)} />
          </TD>
                        
                 <TD>  
         <TextInput 
              placeholder="Age" key={`"age"-${item.key}`}
        value={age} onBlur={()=>updateBooking(item.key,"age",age)}/> </TD>           
                        
      
        </TR> 
       </Table>
       </View>
        
    )):<View></View>
            
            
        :<View></View>
        }
        </View>
        </View>



    )
    
}