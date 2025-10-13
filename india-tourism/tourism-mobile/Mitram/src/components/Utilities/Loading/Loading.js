import loadingYoga from '../../Assets/images/loadingYoga.gif'
import "./Loading.css"

const Loading = () => {
  return (
    <View className='fp-container'>
      <img src={loadingYoga} className='fp-loader' alt='loading' />
    </View>
  )
}

export default Loading
