import loadBookingSession from "../../../assets/images/loadBookingSession.gif"
import "./Loading.css"

const LoadingSessionBooked = () => {
  return (
    <View className='fp-container'>
      <img src={loadBookingSession} className='fp-loader' alt='loading' />
    </View>
  )
}

export default LoadingSessionBooked
