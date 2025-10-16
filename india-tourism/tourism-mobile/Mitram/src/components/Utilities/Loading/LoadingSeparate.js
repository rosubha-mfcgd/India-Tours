 import { View, Image } from 'react-native';
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
      <Image source={require("../../../assets/images/loading-separate.gif")} alt='loading' />
    </View>
  )
}

export default loadingSeparate
