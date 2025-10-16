import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import LoginSignup from  './src/components/loginsignup/loginsignup.jsx'
import sendotp from './src/components/loginsignup/sendotp.jsx'
import Welcome from './src/components/tourpages/welcome.jsx'
import TripList from './src/components/tourpages/tripList.jsx'

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    
    
    <View style={styles.container}>
    <PaperProvider>
     <NavigationContainer>
      <Stack.Navigator initialRouteName="/">
        <Stack.Screen name="signup" component={LoginSignup} />
        <Stack.Screen name="sendotp" component={sendotp} />
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="/" component={Welcome} />
        <Stack.Screen name="searchtrip" component={TripList} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
