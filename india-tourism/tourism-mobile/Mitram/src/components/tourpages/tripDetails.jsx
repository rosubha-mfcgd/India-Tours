import React, { useEffect,useState,useContext } from "react"; 
  import { useNavigation } from '@react-navigation/native';  
import '../../styles/TripDetails.css';
import '../../styles/loginsignup.css';
import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
import { NavContext } from '../navigationContext/navigationContext.jsx';

import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'


  const TripDetails = ({tourDetails,triggerDisplayOptionsByCatId,openBookingForm,cityList,access_token}) =>{

  const navigate = useNavigation();

        const goBack = () =>{
            navigate(-1);
        }
  
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
                    <TableContainer sx={{boxShadow: 'none'}}>
                 <Table>
                    <TableBody>
                       
                        <TableRow>
                    <TableCell>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                        LocationName : <strong>{tourDetails.locationName}</strong>    
                        </Text>
                    </TableCell>
                    </TableRow>
                   
                    <TableRow>
                    <TableCell>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                       Trip Length : <strong> {tourDetails.triplength}  </strong>
                        </Text>  
                    </TableCell>

                    </TableRow>
                     <TableRow>
                    <TableCell>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                       Trip Type : <strong> {tourDetails.domesticOrInternational === "D"? "Domestic"
                       :"International"}  </strong>
                        </Text>  
                    </TableCell>
                    
                    </TableRow>
                   
                      <TableRow>
                      <TableCell>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                       Start Date : <strong> {changeDateToWords(new Date(tourDetails.startDate))}</strong>  
                        </Text>  
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                       End Date : <strong>{changeDateToWords(new Date(tourDetails.endDate))}</strong>    
                        </Text>
                    </TableCell>
                      </TableRow>
                      <TableRow>
                      <TableCell>
                         <Text variant="body2" style={{ color: '#FFFFFF' }}>
                      Package Cost/person: <strong> {tourDetails.package_cost}</strong> 
                        </Text>   
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                         <Text variant="body2" style={{ color: '#FFFFFF' }}>
                      Max Tourist: <strong> {tourDetails.max_tourist}</strong>    
                        </Text>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                         <Text variant="body2" style={{ color: '#FFFFFF' }}>
                        Seats left: <strong>{tourDetails.seats_left}</strong>    
                        </Text>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                     <TableCell>
                        <Text variant="body2" style={{ color: '#FFFFFF' }}>
                      Itinerary Details: <strong>{tourDetails.itinerary} </strong>
                        </Text>   
                    </TableCell>
                   </TableRow>
                  </TableBody>
                  </Table>
                  </TableContainer>
                  </View>
                  <View className = "center-container" style={{
                    width: "fit-content",
                    margin: "auto",
                  }}>
                    
       
          
          
        <View className="button-container">
         <View className='submit-container'>
                    <button type="submit" onPress={()=>{
                        triggerDisplayOptionsByCatId(tourDetails.categoryId)}}
                        class="button"
                        >Go Back</button>

                            <button type="submit" onPress={()=>{
                        openBookingForm(tourDetails)}}
                       class="button" 
                        >Book My Trip</button>

              </View>

         </View>
      
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