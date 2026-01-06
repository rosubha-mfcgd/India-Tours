import { Text, View ,ScrollView} from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js'
import {formatINR} from "../../admin/utility.js";
import { TouchableOpacity, Image} from 'react-native';
import {tripListImages} from "../../admin/imageManager.js";
import { Table, THead, TH, TBody, TR, TD } from '@expo/html-elements';
import { useLocalSearchParams,Link } from 'expo-router';

export default function TripDetails()
{
    const {item,tourmanagerName,cityname,categoryId} = useLocalSearchParams();
    const itemObject = JSON.parse(item);
    return(
          <ScrollView style={{backgroundColor:'#8a41df7e'}}>
            
            <Table>
               
          <THead>
                <TR>
             <TH style={TourCommonStyle.cell}>
                <Image source={tripListImages[itemObject.locationName]}  style={{flex: 1, 
                width: 350, height: 350 }}/>  
                </TH>    
               </TR>
            <TR>
              <TD style={TourCommonStyle.cell}>
                <Text style={TextStyle.body}>{itemObject.description}</Text>
              </TD>
             
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD>
                <Text style={TextStyle.body}>This tour is operated by  {tourmanagerName} , {cityname}</Text>
              </TD>
              </TR>
             
               <TR>
              <TD>
                <Text style={TextStyle.body}>LocationName {itemObject.locationName}</Text>
              </TD>
              </TR>
           
            <TR>
              <TD>
               <Text style={TextStyle.body}>Trip Type :{itemObject.tourType === "Domestic"?"Domestic":"International"}</Text>
              </TD>
              </TR>
              <TR>
              <TD>
               <Text style={TextStyle.body}>Start Date  {itemObject.customStartDate}</Text>
              </TD>
              </TR>
              <TR>
               <TD>
                <Text style={TextStyle.body}>End Date  {itemObject.customEndDate}</Text>
              </TD>
            </TR>
             <TR>
              <TD>
                <Text style={TextStyle.body}>Trip Length {itemObject.lengthOfTour} days</Text>
              </TD>
              </TR>
              <TR>
              <TD>
                <Text style={TextStyle.body}>Package Cost  {formatINR(itemObject.ticketCost)}</Text>
              </TD>
            </TR>
             <TR>
              <TD>
                <Text style={TextStyle.body}>To view full Itinerary </Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Link href={{pathname:"/tourism/viewitinerary",
                                             params: { 
                                                location:  itemObject.locationName,
                                                tourmanagerName:tourmanagerName, 
                                                tourManagerId:itemObject.tourManagerId,
                                                cityname: cityname,
                                                startdate: itemObject.startDate,
                                                enddate: itemObject.endDate,
                                                categoryId: categoryId
                                                }
                                          }} style={TourCommonStyle.linkText} asChild>
            <Text>Click here</Text>
          </Link>
          </View>
              </TD>
            </TR>
          </TBody>

                </Table>
                 <View style={TourCommonStyle.buttonscontainer}>
                  <View style = {TourCommonStyle.buttonWrapper}>
                 <Link href={{pathname:"/tourism/bookTrip",
                                             params: { 
                                                location:  itemObject.locationName,
                                                tourmanagerName:tourmanagerName, 
                                                cityname: cityname,
                                                startdate: itemObject.customStartDate,
                                                enddate: itemObject.customEndDate,
                                                tourManagerId: itemObject.tourManagerId,
                                                domesticOrInternational:itemObject.tourType,
                                                packageCost:itemObject.packageCost
                                             }
                                          }} asChild>
                <TouchableOpacity 
                    style={TourCommonStyle.bookingbutton}>
                    <Text style={TourCommonStyle.buttonText}>Book My Trip</Text>
                  </TouchableOpacity>
                    </Link>
                    </View>
                     <View style = {TourCommonStyle.buttonWrapper}>
                   <Link href={{pathname:"/tourism/editTrip",
                                             params: { 
                                                location: itemObject.locationName,
                                                tourmanagerName:tourmanagerName, 
                                                cityname: cityname,
                                                startdate: itemObject.customStartDate,
                                                enddate: itemObject.enddate,
                                                tourManagerId: itemObject.tourManagerId,
                                                domesticOrInternational:itemObject.tourType,
                                                packageCost:itemObject.packageCost
                                             }
                                          }} asChild>
                <TouchableOpacity 
                    style={TourCommonStyle.bookingbutton}>
                    <Text style={TourCommonStyle.buttonText}>Edit My Trip</Text>
                  </TouchableOpacity>
            </Link>
            </View>
            
            </View>
        </ScrollView>
    )
    
}