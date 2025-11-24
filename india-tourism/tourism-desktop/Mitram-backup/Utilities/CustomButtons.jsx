import React from 'react';
import { Pressable, Text,  Alert,View, Image,  StyleSheet, ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import plus from '../Assets/images/plus.png';
import minus from '../Assets/images/minus.png';
const CustomButton = ({noOfTourist,setNoOfTourist}) => {
  const addTourist = () => {
   console.log('Custom Button Pressed!', 'You clicked the custom button ');
    
    // Add your real-time logic here
   
      setNoOfTourist(noOfTourist+1);
    
      console.log('no of tourist...',noOfTourist);
    
  };

    const removeTourist = () => {
   console.log('Custom Button Pressed!', 'You clicked the custom button');
   setNoOfTourist(noOfTourist-1);
   console.log('no of tourist...',noOfTourist);
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
  return (
     <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
    <View>
      
      <Image
            style={{
          borderColor: 'red',
          borderWidth: 0,
          height: 40,
          width: 40,
           resizeMode: 'contain'

        }}
            source={plus} id="add" onPress= {(event)=> addTourist(event)}/>
         
      </View>
          <View>
           
      <Image
            style={{
          borderColor: 'red',
          borderWidth: 0,
          height: 40,
          width: 40,
           resizeMode: 'contain'

        }}
            source={minus} id= "remove" onPress= {(event)=> removeTourist(event)}
          />
          
          
      </View>
     </SafeAreaView>
  </SafeAreaProvider>
  );
};



export default CustomButton;
