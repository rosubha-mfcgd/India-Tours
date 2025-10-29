import { Tabs } from 'expo-router';
import { Image} from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native';
export default function TabLayout() {

  const [activeColor, setActiveColor] = useState('blue');

  const toggleColor = () => {
    setActiveColor(prevColor => (prevColor === 'blue' ? 'red' : 'blue'));
  };

  return (
    <Tabs 
      screenOptions={{
         tabBarActiveTintColor: 'blue', // Color for active tab icon/label
        tabBarInactiveTintColor: 'black', // Color for inactive tab icon/label
        tabBarStyle: {
          backgroundColor: '#e69797ff', // Background color of the entire tab bar
        },
      }}>
      {/* <Stack.Screen name="index" options={{ title: 'Home' }} /> */}
      <Tabs.Screen name="index" options={{ title: 'Mitram Products', 
      tabBarIcon :({focused,color,size}) =>{
          return  (
            <Image
              style={{ width: size, height: size }}
              source={focused ? require('../../assets/products.png') : require('../../assets/products.png')}
             />
          );
      }                                                                                                                                                                
      }}       
      />
      <Tabs.Screen name="tourism" options={{ title: 'Tourism', href: null,
      tabBarIcon :({focused,color,size}) =>{
          return  (
            <Image
              style={{ width: size, height: size }}
              source={focused ? require('../../assets/tourism.png') : require('../../assets/tourism.png')}
              
            />
          );
      }

                                                                                                                                                                      
      }} />
      <Tabs.Screen name="login" options={{ title: 'Login/Signup', 
      tabBarIcon :({focused,color,size}) =>{
          return  (
            <Image
              style={{ width: size, height: size }}
              source={focused ? require('../../assets/auth.png') : require('../../assets/auth.png')}
            />
          );
      } }} />
    </Tabs>
  );
}
