import loadingSep from "../../../assets/images/loading-separate.gif"
 import { View } from 'react-native';
const loadingSeparate = () => {
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <img src={loadingSep} alt='loading' />
    </View>
  )
}

export default loadingSeparate
