import React, { useState,useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, 
    TouchableOpacity,ActivityIndicator,Platform, 
    SectionList} from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For storing tokens
import LoginSignUpStyle from '../../styles/loginsignup.js';
import TourCommonStyle from '../../styles/tourCommonStyle.js';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black,Inter_900Black_Italic } from '@expo-google-fonts/inter'; 
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import {Link} from 'expo-router';
import TextStyle from '../../styles/textStyles' ;
import {searchUserProfile,getPreferenceList} from '../../admin/admin.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import AuthCommonModal from '../../admin/authCommonModal.js'
import { useLocalSearchParams } from 'expo-router';
import CheckBox from 'expo-checkbox';

export default function Userprofile(){

     const {email,mobile} = useLocalSearchParams();
     const[userName,setUserName] = useState('');
     const [pref,setPref] = useState([])

     const [userPref,setUserPref] = useState([])
     const [address,setAddress] = useState('')
     const [city, setCity] = useState('');
     const [section, setSection] = useState([]);
    const [fontsLoaded] = useFonts({
      'Inter-Black': Inter_900Black, // Assign a name to the loaded font
      'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Inter-Black-Header': Inter_900Black_Italic
    });

    const handleChecked = async(data)=>{

    }

     const renderPrefHeader = ({ section: { title } }) => (
    <View style={TourCommonStyle.sectionheader}>
      <Text style={TourCommonStyle.headerTitle}>{title}</Text>
    </View>
  );



    const RenderPrefList = ({item,index}) =>{

      let isChecked = (userPref.indexOf[item.code] !== -1);
      return(
         <View style={TourCommonStyle.rowContainer}>
      
        <CheckBox id={index}
          value={isChecked}
          onValueChange={()=>handleChecked(item)}
          color={true ? '#4630EB' : undefined}
        />
        <Text style={TextStyle.paragraph}>{item.desc}</Text>
      </View>
     
      );
       
    
    }
    
useEffect(()=>{
 let mounted = true;
     // setModalVisible(false);
     const timer = setTimeout( () =>{
        const searchUserProfileDetails = async(email,mobile)=>{
            let req_data = {
              email:email, mobile:mobile
            }

            let result = await searchUserProfile(req_data);
            
            if(result)
            {
              let resp = JSON.parse(result)
              if(resp.name){
                setUserName(resp.name);
              }
              if(resp.pref && resp.pref,length>0)
              {
                setUserPref(resp.pref);
              }

                if(resp.address1)
                {
                  setAddress(resp.address1)
                }
                if(resp.city)
                setCity(resp.city)
            }
        }

          const getPreferences = async()=>{
              let result = await getPreferenceList();
              if(result && result.length>0)
              {
                  setPref(JSON.parse(result));
                  let data = [{title: "My Preferences", data: pref}];
                  setSection(data);
              }
          }

        
        if(mounted)
        {
            if(!pref || pref.length===0)
            {
                 getPreferences();
            }
            if(!userName)
            {
              searchUserProfileDetails(email,mobile);
            }
            mounted = false;
        }

     },100);

      return () => {
                        mounted = false; // Set flag to false on cleanup
                        clearTimeout(timer); // Clean up the timer
                  };

},[])


return (
  fontsLoaded && pref.length>0?
 <KeyboardAvoidingView style = {LoginSignUpStyle.centeredContainer}  
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
              >
    <Text style={{ fontFamily: 'Inter-Black-Header',color:'#f3f3f3d7',fontSize:50 }}>My Profile</Text>

    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Name</Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{userName}</Text>

    </View>

    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Email</Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{email}</Text>

    </View>

      <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Mobile</Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{mobile}</Text>

    </View>


     <View
      style={LoginSignUpStyle.flexboxcontainer}>

       <SectionList 
       sections={section}
              renderItem={({item,index})=> <RenderPrefList item = {item} index={index}/>}
              renderSectionHeader={renderPrefHeader}
              keyExtractor={item =>`${item._id}`}
        />

    </View>

<View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Mobile</Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{mobile}</Text>

    </View>


</KeyboardAvoidingView>: 
<View style={TourCommonStyle.centeredContainer}>
            <ActivityIndicator 
            size="large" color="#3c3ca7ff"/>
            </View>

)


}