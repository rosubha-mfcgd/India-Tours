import { Text, View ,ScrollView} from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js'
import {performTripBooking} from "../../admin/admin.js";
import {formatINR} from "../../admin/utility";
import { useEffect, useState, useContext } from "react";
import {TouchableOpacity, TextInput} from 'react-native';
import { Table,  TH, TBody, TR, TD } from '@expo/html-elements';
import { useLocalSearchParams,useRouter } from 'expo-router';


export default function payforTrip()
{
    const {bookingdata} = useLocalSearchParams();
     const[email,setEmail] = useState('');
     const router = useRouter();
         const[specialRequest,setSpecialRequest] = useState('NA');
        const [bookingDataObj, setBookingDataObj] = useState(JSON.parse(bookingdata));
       const[totalPayableAmt,setTotalPayableAmt] = useState('');
       const handleEmailChange = (text) =>{
            bookingDataObj["email"] = text;
            setEmail(text);
       }

         const handleSpecialRequests = (text) =>{
            bookingDataObj["specialRequest"] = text;
            setSpecialRequest(text);
       }
       const handleSubmit = async() =>{
          console.log('submit action called ');
          let primarybookings = [];
          let dependentbookings = [];
          let primary_index=0;
           let dep_index=0;
          for(let index=0;index<bookingDataObj.bookingData.length;index++)
          {
            let bookingData = bookingDataObj.bookingData[index]; 
            if(bookingData.age<18)
            {
              dependentbookings[dep_index++] = bookingData;

            }else{
                primarybookings[primary_index++] = bookingData;
                
            }
              
          }

          let data = {tourManagerId:bookingDataObj.tourManagerId,
              locationName:bookingDataObj.location,
              startDate:bookingDataObj.startdate,
              endDate:bookingDataObj.enddate,
              domesticOrInternational:bookingDataObj.domesticOrInternational,
              package_cost:bookingDataObj.totalAmountPayable,
              primarybookings:primarybookings,
             dependantbookings: dependentbookings
          }
         const bookings= await performTripBooking(data);
         if(bookings){
            console.log('bookings...',bookings);
            router.push({
           pathname: '/tourism/confirmbooking',
            params: { booking: bookings.bookingid,
              locationName:bookingDataObj.location,
            startDate:bookingDataObj.startdate,
              endDate:bookingDataObj.enddate
            },
           });
         }
       }



       useEffect(()=>{

        console.log('bookingdata...',bookingdata)
         let totaltourists = bookingDataObj.bookingData.length;
        let totalAmountPayable = ((+bookingDataObj.package_cost)*(totaltourists));
        bookingDataObj.totalAmountPayable = totalAmountPayable;
        setTotalPayableAmt(formatINR(totalAmountPayable));

       },[])

    return(
       
       <ScrollView style={{backgroundColor:'#8a41df7e'}}>
            <Table>
              <TBody>
                
             <TH style={TourCommonStyle.cell}>
                 <Text style={TextStyle.body}> Tour Location {bookingDataObj.location}</Text>
            </TH>
            <TR>
                <TD style={TourCommonStyle.cell}>
            <Text style={TextStyle.body}> Your Total Package Cost is {totalPayableAmt}</Text>
            </TD>
            </TR>
            <TR>
            <TD style={TourCommonStyle.cell}>
             <Text style={TextStyle.body}>Enter an email ID for better communication</Text>
             
              <TextInput value={email} placeholder='Enter email here'
                                        key="1"
                                        style={TextStyle.TextInput} 
                                        onChangeText={text=>
                                     {
                                            handleEmailChange(text)
                                     }}/>
                                     </TD>
                                     </TR>
                                     <TR>
                <TD style={TourCommonStyle.cell}>
              <Text style={TextStyle.body}>If you have any special request which you'd need in this trip, 
                let us know . We'll try our best to meet your requirements.
              </Text>
              <TextInput value={specialRequest} 
                                        key={specialRequest}
                                        style={TextStyle.TextInput} 
                                        onChangeText={text=>
                                     {
                                            handleSpecialRequests(text)
                                     }}/>
             </TD>
            </TR>
            <TR>
                <TD style={TourCommonStyle.cell}>
              <View style={TourCommonStyle.buttonscontainer}>
                <View style = {TourCommonStyle.buttonWrapper}>
                   
            
             {/* <Link href={{pathname:"/tourism/confirmbooking",
                          params: { 
                               bookingdata: JSON.stringify(bookingDataObj),
                               payment:"A"
                                }
                               }} asChild> */}
                <TouchableOpacity 
                    style={TourCommonStyle.paymentbutton}>
                    <Text style={TourCommonStyle.buttonText}
                    onPress={handleSubmit}
                    >Advance Payment</Text>
                  </TouchableOpacity>
            {/* </Link> */}
            </View>
             </View>
            </TD>
            <TD>
             <View style={TourCommonStyle.buttonscontainer}>
                <View style = {TourCommonStyle.buttonWrapper}>

                <TouchableOpacity 
                    style={TourCommonStyle.paymentbutton}>
                    <Text style={TourCommonStyle.buttonText}
                    onPress={handleSubmit}
                    >Complete Payment</Text>
                  </TouchableOpacity>
           
            </View>
            </View>
            </TD>
            </TR>
            </TBody>
       </Table>
    </ScrollView>


    )
    
}