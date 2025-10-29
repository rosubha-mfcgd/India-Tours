import { StyleSheet, Text, View ,ScrollView} from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import ProductStyle from '../../styles/productStyle.js'; 
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js'
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
    const {item,tourmanagerName,cityname} = useLocalSearchParams();

    const itemObject = JSON.parse(item);
    return(
          <ScrollView>
            
            <Table>
               
          <THead>
                <TR>
             <TD style={TourCommonStyle.cell}>
                <Image source={tripListImages[itemObject.locationName]}  style={{flex: 1, 
                width: 350, height: 350 }}/>  
                </TD>    
               </TR>
            <TR>
              <TD style={TourCommonStyle.cell}>
                <Text style={TextStyle.body}>{itemObject.desc}</Text>
              </TD>
             
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD>
                <Text style={TextStyle.body}>This tour is operated by  {tourmanagerName}</Text>
              </TD>
              </TR>
             
               <TR>
              <TD>
                <Text style={TextStyle.body}>LocationName {itemObject.locationName}</Text>
              </TD>
              </TR>
           
            <TR>
              <TD>
               <Text style={TextStyle.body}>Trip Type :{itemObject.domesticOrinternational === 'D'?"Domestic":"International"}</Text>
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
                <Text style={TextStyle.body}>Trip Length {itemObject.lengthOfTour}</Text>
              </TD>
              </TR>
              <TR>
              <TD>
                <Text style={TextStyle.body}>Package Cost  {itemObject.ticket_cost}</Text>
              </TD>
            </TR>
          </TBody>

                </Table>
                <TouchableOpacity 
                    style={TourCommonStyle.button}>
                    <Text style={TourCommonStyle.buttonText}>Book My Trip</Text>
                    </TouchableOpacity>
            
        </ScrollView>
    )
    
}