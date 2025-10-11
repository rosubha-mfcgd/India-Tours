import loadBookingSession from "../../../assets/images/loadBookingSession.gif"
import "./Loading.css"

const LoadingSessionBooked = () => {
  return (
    <div className='fp-container'>
      <img src={loadBookingSession} className='fp-loader' alt='loading' />
    </div>
  )
}

export default LoadingSessionBooked
