import loadingYoga from '../../Assets/images/loadingYoga.gif'
import "./Loading.css"

const Loading = () => {
  return (
    <div className='fp-container'>
      <img src={loadingYoga} className='fp-loader' alt='loading' />
    </div>
  )
}

export default Loading
