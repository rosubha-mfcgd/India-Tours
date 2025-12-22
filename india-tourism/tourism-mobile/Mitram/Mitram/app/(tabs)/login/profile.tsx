import React, { useState,useEffect } from 'react';
import {ScrollView, View, Text, TextInput, Pressable,
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

     const {email,mobile,access_token} = useLocalSearchParams();
     const[userName,setUserName] = useState('');
     const [pref,setPref] = useState([])

     const [userPref,setUserPref] = useState([])
     const [address,setAddress] = useState('')
     const [city, setCity] = useState('');
     const[mobileNo,setMobileNo] = useState('');
     const [section, setSection] = useState([]);
     const [selectPref,setSelectPref] = useState([])
     const [isExpanded, setIsExpanded] = useState(false);
     const[hidePref,setHidePref] = useState(false)
    const [fontsLoaded] = useFonts({
      'Inter-Black': Inter_900Black, // Assign a name to the loaded font
      'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Inter-Black-Header': Inter_900Black_Italic
    });

    const handleChecked = async(item)=>{
      // console.log('selected is...',selectPref[id])
      //   selectPref[id] = !selectPref[id]?true:false;
      //    console.log('selected now is...',selectPref[id])
      selectPref[item.code-1] = !selectPref[item.code-1]?true:false;
      if(selectPref[item.code-1])
      {
        userPref[item.code-1] = item.code;
       
      }else{
         userPref[item.code-1] = 0;
      }
      console.log('preference selected ....',selectPref,item.code);
       console.log('user preference selected ....',userPref);
    }

    const saveProfile = async()=>{
    }

    const editProfile = async()=>{
    }
// Determine the icon name based on the state
  const iconName = hidePref ? 'remove-circle' : 'add-circle';
     const renderPrefHeader = ({ section: { title } }) => (
    <View style={TourCommonStyle.sectionheader}>
      
      <Text style={[TourCommonStyle.headerTitle,TourCommonStyle.headerColWidth]} 
      onPress={()=>setHidePref(!hidePref)}>{title}</Text>
   
      
        <Ionicons
          name={iconName}
          size={24}
          color="blue"  style={TourCommonStyle.buttonColWidth} 
          onPress={()=>setHidePref(!hidePref)}
        /> 

     
    </View>
  );



    const RenderPrefList = ({item}) =>{
     
      let isChecked = (userPref.indexOf[item.code] !== -1);
      console.log('pref item....',item)
      selectPref[item.code-1] = !item.selectPref ? false:item.selectPref ;
      
      return(
        hidePref?
         <View style={LoginSignUpStyle.rowContainer}>
          <Pressable 
           onPress={() => {
            handleChecked(item)
         }}
      style={({ pressed }) => [ // The style prop receives the 'pressed' state
        LoginSignUpStyle.wrapperCustom,
        {
          backgroundColor: (pressed || userPref[item.code-1]) ? '#52667cff':'#ece1e1ff' , // Optional: change background
        },
      ]}
    >
     <Text style={TextStyle.paragraph}>{item.desc}</Text>
         
            </Pressable>
        </View>:<View/>
    
      );
       
    
    }
    
useEffect(()=>{
 let mounted = true;
     // setModalVisible(false);
     const timer = setTimeout( () =>{
        const searchUserProfileDetails = async(email,mobile,access_token)=>{
            let req_data = {
              email:email, 
              mobile:mobile,
              access_token:access_token
            }

            let result = await searchUserProfile(req_data);
            
            if(result)
            {
              console.log('result is....',result)
                //  let resp = result
                  if(result.name)
                  {
                    console.log('result name ....',result.name)
                    setUserName(result.name);
                  }
                  if(result.preference && result.preference.length>0)
                  {
                    setUserPref(result.preference);
                  }

                    if(result.address1)
                    {
                      setAddress(result.address1)
                    }
                    if(result.city)
                       setCity(result.city)

                    if(result.mobile)
                      setMobileNo(result.mobile)
            }
        }

          const getPreferences = async(access_token)=>{
            let data = {access_token:access_token}
              let result = await getPreferenceList(data);
              if(result && result.length>0)
              {
                console.log('pref result is....',result)
                  setPref(result);
                  let sections = [{title: "My Preferences", data: result}];
                  setSection(sections);
                  console.log('sections is...',section)
              }
          }

        
        if(mounted)
        {
            if(!pref || pref.length===0)
            {
               getPreferences(access_token);
            }
            if(!userName)
            {
              searchUserProfileDetails(email,mobile,access_token);
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
  <View style = {LoginSignUpStyle.contentContainer} 
               >
    <Text style={{ fontFamily: 'Inter-Black-Header',color:'#f3f3f3d7',fontSize:50 }}>My Profile</Text>

    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Name : </Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{userName}</Text>

    </View>

    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Email-id : </Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{email}</Text>

    </View>

      <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Mobile : </Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{mobileNo}</Text>

    </View>

    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Address : </Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{address}</Text>

         <Text
         style={{fontFamily:'Poppins-SemiBold'}}>City : </Text>

        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{city}</Text>

    </View>


     <View
      style={LoginSignUpStyle.flexboxcontainer}>

       <SectionList 
       sections={section}
              renderItem={({item})=> <RenderPrefList item = {item}/>}
              renderSectionHeader={renderPrefHeader}
              keyExtractor={item =>`${item._id}`}
        />


    </View>
     <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <View style={LoginSignUpStyle.buttonscontainer}>
    
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText} 
                    onPress={saveProfile} >Save</Text>
                  </TouchableOpacity>
       
      {/* Add a "Forgot Password" link or similar */}
    
    </View>

     <View style={LoginSignUpStyle.buttonscontainer}>
        
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText} 
                    onPress={editProfile}
                    >Edit</Text>
                  </TouchableOpacity>
   
          
    </View>
    </View>
</View>: 
<View style={TourCommonStyle.centeredContainer}>
            <ActivityIndicator 
            size="large" color="#3c3ca7ff"/>
            </View>

)


}