import { StyleSheet, Text, View } from 'react-native';
import LoginSignUpStyle from '../../styles/loginsignup.js'; 
import CardStyle from '../../styles/cards.js'; 
import ProductStyle from '../../styles/productStyle.js'; 
import {updateAsFavorite,getProducts} from "../../admin/admin.js";
import { useEffect, useState, useContext } from "react";
import { FlatList, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Button, Icon } from '@rneui/themed';
import {productImages} from "../../admin/imageManager.js";

export default function payforTrip()
{
    
    return(
        <View>
            <Text> This page shows the trip Details!!</Text>

        </View>



    )
    
}