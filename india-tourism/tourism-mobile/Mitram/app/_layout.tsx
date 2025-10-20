import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {


  return (
     
    <View style={styles.container}>
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
      <Stack>
        <Stack.Screen name="index" options={{title:"Home"}}/>
      
        <Stack.Screen name="components/sendotp/sendotp" options={{title:"Send OTP"}}/>
        
        <Stack.Screen name="components/tourpages/tripList" options={{title:"Trip List"}} />

          {/* <Stack.Screen name="loginsignup" options={{title:"Login/Signup"}}/> */}
        {/* <Stack.Screen name="products" options={{title:"Mitram Products"}}/> */}
      </Stack>
      </SafeAreaView>
    </SafeAreaProvider>

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
