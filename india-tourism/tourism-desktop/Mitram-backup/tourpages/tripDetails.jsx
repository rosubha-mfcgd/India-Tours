import React, { useEffect,useState,useContext } from "react"; 
import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
import { NavContext } from '../navigationContext/navigationContext.jsx';
import { View } from 'react-native';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple,DataTable} from 'react-native-paper'
import LoginSignUpStyle from "../stylecomp/loginsignup";
import TripDetailsStyle from "../stylecomp/TripDetails";
const TripDetails = ({tourDetails,triggerDisplayOptionsByCatId,openBookingForm,
  cityList,access_token}) =>{


         
    function getFieldsForTripDetailsScreen(){

     let detailFields = process.env.REACT_APP_TRIP_DETAIL_FIELDS;
        console.log('detailFields...',process.env.REACT_APP_TRIP_DETAIL_FIELDS)
       // console.log('detailFields...',detailFields)
        if(detailFields)
            {
            let detailFieldArr = detailFields.split(",");
            return detailFieldArr;
            }
        }
        function changeDateToWords(dateObject)
     {
        const date = new Date(dateObject);
        console.log('date....',date)
        console.log('formatted date...', 
          date.toLocaleDateString('en-GB')); // Or 'en-GB' for a different locale
        return date.toLocaleDateString('en-GB');
    }
        const detailFlds = getFieldsForTripDetailsScreen();
        console.log('tourDetails...',tourDetails);
        const { notification} = useContext(NavContext);
        
    return (
        <View style={{ display: 'flex', flexDirection: 'column', 
        justifycontent: 'center',
        alignitems: 'center',
        gap: '20px' }}>
        <View className="grid-container">
      <View className="grid-item">
        <View item xs = {10} sm={4}></View>
      </View>
            <View className="grid-item">
            <View item xs = {10} sm={4}>
                 <Card className="card">
                    <CardMedia
        component="img"
        style={{ height: "200px",width: "350px" }}
        image={tourDetails.image}
        alt={tourDetails.locationName}
      />
           </Card>
            <Text variant="body2" style={{ color: '#FFFFFF' }}>
                           {tourDetails.desc}
                         </Text>
            <Text variant="body2" style={{ color: '#FFFFFF' }}>
                          This tour is operated by :- <strong>{tourDetails.tourManagerName}</strong>
                         </Text>
            <Text variant="body2" style={{ color: '#FFFFFF' }}>
                Operator Contact :- <strong>{tourDetails.contact}</strong>
             </Text>
             <Text variant="body2" style={{ color: '#FFFFFF' }}>
                    Operator secondary Contact :- {tourDetails.secondarycontact}
             </Text>

              
                <View>
                  
                 <DataTable>
                   
                       
                        <DataTable.Row>
                    <DataTable.Col>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                        LocationName : <strong>{tourDetails.locationName}</strong>    
                        </Text>
                    </DataTable.Col>
                   </DataTable.Row>
                   
                    <DataTable.Row>
                    <DataTable.Col>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                       Trip Length : <strong> {tourDetails.triplength}  </strong>
                        </Text>  
                    </DataTable.Col>

                    </DataTable.Row>
                     <DataTable.Row>
                     <DataTable.Col>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                       Trip Type : <strong> {tourDetails.domesticOrInternational === "D"? "Domestic"
                       :"International"}  </strong>
                        </Text>  
                    </DataTable.Col>
                    
                    </DataTable.Row>
                   
                      <DataTable.Row>
                      <DataTable.Col>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                       Start Date : <strong> {changeDateToWords(new Date(tourDetails.startDate))}</strong>  
                        </Text>  
                    </DataTable.Col>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Col>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                       End Date : <strong>{changeDateToWords(new Date(tourDetails.endDate))}</strong>    
                        </Text>
                    </DataTable.Col>
                      </DataTable.Row>
                      <DataTable.Row>
                      <DataTable.Col>
                         <Text variant="body2" style={{ color: '#FFFFFF' }}>
                      Package Cost/person: <strong> {tourDetails.package_cost}</strong> 
                        </Text>   
                    </DataTable.Col>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Col>
                         <Text variant="body2" style={{ color: '#FFFFFF' }}>
                      Max Tourist: <strong> {tourDetails.max_tourist}</strong>    
                        </Text>
                    </DataTable.Col>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Col>
                         <Text variant="body2" style={{ color: '#FFFFFF' }}>
                        Seats left: <strong>{tourDetails.seats_left}</strong>    
                        </Text>
                    </DataTable.Col>
                    </DataTable.Row>
                    <DataTable.Row>
                     <DataTable.Col>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                      Itinerary Details: <strong>{tourDetails.itinerary} </strong>
                        </Text>   
                    </DataTable.Col>
                   </DataTable.Row>
                 
                  </DataTable>
                 
                  </View>
                  <View style={LoginSignUpStyle.centeredContainer} >
          
                    <Button  onPress={()=>{
                        triggerDisplayOptionsByCatId(tourDetails.categoryId)}}
                        style={TripDetails.button}
                        >Go Back</Button>

                    
                    <Button  onPress={()=>{
                        openBookingForm(tourDetails)}}
                       style={TripDetails.button} 
                        >Book My Trip</Button>

             
        </View> 
        
           
                 </View>
                    {notification ?
                                <View style={{position: 'fixed', top:70,right:0}} >    
                                <SideBarNotification/> 
                             </View> 
                             :<View></View>
                              }
            </View>
                     
        </View>
        
        </View>
    );
  }

  export default TripDetails;
