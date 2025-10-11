import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter,Route} from 'react-router-native';
import LoginSignup from  './src/components/loginsignup/loginsignup.jsx'
import sendotp from './src/components/loginsignup/sendotp.jsx'
import Welcome from './src/components/tourpages/welcome.jsx'
import TripList from './src/components/tourpages/tripList.jsx'

export default function App() {
  return (
    <View style={styles.container}>
     
           <NativeRouter>
           <Route path='signup' Component={LoginSignup}></Route>
           <Route path='sendotp' Component={sendotp}></Route>
           <Route path='welcome' Component={Welcome}></Route>
           <Route path='/' Component={Welcome}></Route>
           <Route path='/searchtrip' Component={TripList}></Route>
         </NativeRouter>
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
