import React from 'react';
import { TouchableOpacity, Text,  Alert,View, Image,  StyleSheet, ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import '../../styles/bookingForm.css'; 
import plus from '../Assets/images/plus.png';
import minus from '../Assets/images/minus.png';
const CustomButton = () => {
  const handlePress = () => {
    Alert.alert('Custom Button Pressed!', 'You clicked the custom button.');
    // Add your real-time logic here
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
          borderWidth: 5,
          height: 40,
          width: 40,

        }}
            source={plus}
          />
          <Text style={styles.text}>Add</Text>
      </View>
          <View>
      <Image
            style={{
          borderColor: 'red',
          borderWidth: 5,
          height: 40,
          width: 40,

        }}
            source={minus}
          />
          <Text style={styles.text}>Remove</Text>
      </View>
     </SafeAreaView>
  </SafeAreaProvider>
  );
};



export default CustomButton;