import { StyleSheet, Text, View } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import ProductStyle from '../../styles/productStyle.js'; 
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import {updateAsFavorite,getProducts} from "../../admin/admin";
import { useEffect, useState, useContext } from "react";
import { FlatList, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Button, Icon } from '@rneui/themed';
import {tripListImages} from "../../admin/imageManager";
import { Table, THead, TH, TBody, TR, TD, Caption } from '@expo/html-elements';
import { useLocalSearchParams } from 'expo-router';

export default function TripDetails()
{
    const {item,tourmanagerName} = useLocalSearchParams();
    return(
          <View style={TourCommonStyle.centeredContainer}>
            
            <Table>
               
          <THead>
                <TR>
             <TH>
                <Image source={tripListImages[item.locationName]}  style={{flex: 1, 
                width: 350, height: 350 }}/>  
                </TH>    
               </TR>
            <TR>
              <TH>
                <Text>{item.desc}</Text>
              </TH>
             
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD>
                <Text>This tour is operated by :- {tourmanagerName}</Text>
              </TD>
              <TD>
                <Text>LocationName :{item.locationName}</Text>
              </TD>
            </TR>
            <TR>
              <TD>
                <Text>Trip Type :{item.domesticOrinternational === 'D'?"Domestic":"International"}</Text>
              </TD>
              <TD>
                <Text>Start Date :- {item.customStartDate}</Text>
              </TD>
               <TD>
                <Text>End Date :- {item.customEndDate}</Text>
              </TD>
            </TR>
             <TR>
              <TD>
                <Text>Trip Length :{item.lengthOfTour}</Text>
              </TD>
              <TD>
                <Text>Package Cost :- {item.ticket_cost}</Text>
              </TD>
            </TR>
          </TBody>

                </Table>
             
            
        </View>
    )
    
}