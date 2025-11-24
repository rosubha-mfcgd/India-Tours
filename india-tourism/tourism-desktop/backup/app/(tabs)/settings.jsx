import React, { useState,  useEffect} from 'react';
 import { Image } from 'react-native';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'


import { View,TouchableOpacity } from 'react-native';

import LoginSignUpStyle from '../stylecomp/loginsignup.js'; 


import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


  export default function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings Screen</Text>
      </View>
    );
  }

