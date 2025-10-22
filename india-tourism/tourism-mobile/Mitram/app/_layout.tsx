import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {


  return (
     
    <View style={styles.container}>
    <SafeAreaProvider>
      <SafeAreaView>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{title:"Home",headerShown:false}}/>
      
        {/* <Stack.Screen name="components/sendotp/sendotp" options={{title:"Send OTP"}}/>
        
        <Stack.Screen name="components/tourpages/tripList" options={{title:"Trip List"}} /> */}

          {/* <Stack.Screen name="loginsignup" options={{title:"Login/Signup"}}/> */}
        {/* <Stack.Screen name="products" options={{title:"Mitram Products"}}/> */}
        <Stack.Screen name = "(tabs)" options = {{headerShown:false}}/>
      </Stack>
      </SafeAreaView>
    </SafeAreaProvider>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     alignItems: 'center',
    justifyContent: 'center',
  },
});
