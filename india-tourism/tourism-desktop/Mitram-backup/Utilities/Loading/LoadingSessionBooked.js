import loadBookingSession from "../../../assets/images/loadBookingSession.gif"
import "./Loading.css"
import {View,Image} from 'react-native'
const LoadingSessionBooked = () => {
  return (
    <View className='fp-container'>
      <Image source={require("../../../assets/images/loadBookingSession.gif")} className='fp-loader' alt='loading' />
    </View>
  )
}

export default LoadingSessionBooked
