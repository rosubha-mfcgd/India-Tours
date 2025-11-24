import loadingYoga from '../../Assets/images/loadingYoga.gif'
import "./Loading.css"
import {Image,View}  from 'react-native'
const Loading = () => {
  return (
    <View className='fp-container'>
      <Image source={require('../../Assets/images/loadingYoga.gif')} className='fp-loader' alt='loading' />
    </View>
  )
}

export default Loading
