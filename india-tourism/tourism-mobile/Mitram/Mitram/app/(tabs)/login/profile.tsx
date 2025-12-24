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
import {searchUserProfile,getPreferenceList,updateUserProfile} from '../../admin/admin';
import { Ionicons } from '@expo/vector-icons';
import DeviceInfo from 'react-native-device-info';
import AuthCommonModal from '../../admin/authCommonModal'
import { useLocalSearchParams } from 'expo-router';
import PleaseWaitScreen from '../../admin/waitscreen'

export default function Userprofile(){

     const {email,mobile,access_token} = useLocalSearchParams();
     const[userName,setUserName] = useState('');
     const [pref,setPref] = useState([])
      const [points,setPoints] = useState(0);
     const [userPref,setUserPref] = useState([])
     const [address,setAddress] = useState('')
     const [city, setCity] = useState('');
     const[mobileFromDB,setMobileFromDB] = useState('');
     const[emailFromDB,setEmailFromDB] = useState('');
     const [section, setSection] = useState([]);
     const [selectPref,setSelectPref] = useState([])
     const[hidePref,setHidePref] = useState(false);
     const[modalVisible,setModalVisible] = useState(false);
     const[cityEditable,setCityEditable] = useState(false);
     const[addressEditable,setAddressEditable] = useState(false);
     const [error, setError] = useState('');
    const [isloading,setIsloading] = useState(false)
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
      if(userPref.indexOf(item.code) != -1)
        userPref[item.code-1]=0
      else
        userPref[item.code-1] = item.code;
     
     
       console.log('user preference selected ....',userPref);
    }

    const saveProfile = async()=>{
       setError('');
       setModalVisible(false);
       setIsloading(true)
      try{
        let data = {
          email:emailFromDB,
          mobile:mobileFromDB,
          prefs: userPref,
          address: address,
          city: city
        }

       let user =  await updateUserProfile(data);
       if(user)
       {
          setError('User profile updated successfully');
          setModalVisible(true);
          setIsloading(false);
       }
      }catch(err){
        console.log(err.stack);
         setError('Failed to update User profile');
          setModalVisible(true);
          setIsloading(false);
      }
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
  
      console.log('selected preference is...',selectPref[item.code-1]);
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
          backgroundColor: (pressed ||userPref && userPref.length>0 &&
             userPref.indexOf(item.code)!=-1) ? '#52667cff':'#ece1e1ff' , // Optional: change background
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
     selectPref.fill(false);
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
                  if(result.emailID)
                  {
                    setEmailFromDB(result.emailID);
                  }

                  if(result.name)
                  {
                    console.log('result name ....',result.name)
                    setUserName(result.name);
                  }
                  if(result.prefs && result.prefs.length>0)
                  {
                    setUserPref(result.prefs);
                  }

                    if(result.address)
                    {
                      setAddress(result.address)
                    }
                    if(result.city)
                       setCity(result.city)

                    if(result.mobile)
                      setMobileFromDB(result.mobile)
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
          setIsloading(false);
          setModalVisible(false);
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
        >{mobileFromDB}</Text>

    </View>
    {
      isloading ?
       
           <PleaseWaitScreen/>:<View/>
        
    }
   
    <View>
            {error ? <AuthCommonModal modalVisible={modalVisible} 
                        setModalVisible={setModalVisible} errorMessage={error} 
                        setErrorMessage={setError}
                        /> : null}
        </View>

    <View
      style={LoginSignUpStyle.flexboxcontainer}>
    <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Address : </Text>
        
      {addressEditable?
       <TextInput 
              placeholder="" key={`"address"`}  
              style={LoginSignUpStyle.textfieldunderlinedInput}
        value={address} onChangeText={text=>
        {
          setAddress(text);
        }}/>:
        <View>
        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{address} </Text>
        <Ionicons name="pencil" size={16} color="black" 
        onPress={()=>setAddressEditable(!addressEditable)}/>
       </View>

      }
      </View>
       <View
      style={LoginSignUpStyle.flexboxcontainer}>
         <Text
         style={{fontFamily:'Poppins-SemiBold'}}>City : </Text>
          {cityEditable?
          <TextInput 
              placeholder="" key={`"city"`}  
              style={LoginSignUpStyle.textfieldunderlinedInput}
        value={city} onChangeText={text=>
        {
          setCity(text);
        }}/>:
        <View>
        <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{city}</Text>
        <Ionicons name="pencil-outline" size={16} color="black" 
        onPress={()=>setCityEditable(!cityEditable)}/>
        </View>
          }    
    </View>

 <View
      style={LoginSignUpStyle.flexboxcontainer}>
         <Text
         style={{fontFamily:'Poppins-SemiBold'}}>Your Points : </Text>
  
          <Text
         style={{fontFamily:'Poppins-SemiBold'}}
        >{points}</Text>
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

     {/* <View style={LoginSignUpStyle.buttonscontainer}>
        
            <TouchableOpacity 
                    style={LoginSignUpStyle.loginbutton}>
                    <Text style={TourCommonStyle.buttonText} 
                    onPress={editProfile}
                    >Edit</Text>
                  </TouchableOpacity>
   
          
    </View> */}
    </View>
</View>: 
<View style={TourCommonStyle.centeredContainer}>
            <ActivityIndicator 
            size="large" color="#3c3ca7ff"/>
            </View>

)


}