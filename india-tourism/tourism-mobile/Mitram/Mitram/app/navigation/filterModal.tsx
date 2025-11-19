import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, FlatList } from 'react-native';
import Drawerstyles from '../styles/drawerStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
const { width } = Dimensions.get('window');

const FilterSidebar = ({ data,showFilterDateOptions,toggleFilterOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
const router = useRouter();

  const animation = useState(new Animated.Value(0))[0];

  const toggleSidebar = () => {
    const toValue = isOpen ? 0 : 1;
    toggleFilterOptions(true)
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };
  const performAction= (id) =>{
        if(id === '1')
        {
                router.push({
           pathname: '/tourism/events'});
        }
  }
  const sidebarTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.50, 0], // Sidebar width 75% of screen
  });

  return (
    <View style={Drawerstyles.container}>
      {/* Main Content */}
      <View style={Drawerstyles.mainContent}>
        <TouchableOpacity onPress={toggleSidebar} >
       <Ionicons
              name="funnel" // Choose your desired icon name
              size={24}
              color="white"
              style={{ marginLeft: 15 }}
            />
        </TouchableOpacity>
       </View>

      {/* Overlay (optional, for dimming background) */}
      {isOpen && (
        <TouchableOpacity
          style={Drawerstyles.overlay}
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}

{isOpen ?
     
      <Animated.View
        style={[
          Drawerstyles.sidebar,
          { transform: [{ translateX: sidebarTranslateX }] },
        ]}
      >
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={Drawerstyles.sidebarItem} onPress={()=>performAction(item.id)}>
            {item.name}</Text>}
      />
      </Animated.View>:<View/>
}
    </View>
  );
};

export default FilterSidebar