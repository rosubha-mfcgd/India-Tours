
import { StyleSheet } from 'react-native';

const ProductStyle = StyleSheet.create({

 row: {
    flexDirection: 'row', // Arranges items horizontally in a row
    justifyContent: 'space-around', // Distributes space evenly around items
    marginBottom: 10,
  },
  gridItem: {
    flex: 1, // Allows items to grow and shrink to fill available space
    aspectRatio: 1, // Makes the item square
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
   button: {
   backgroundColor: '#007AFF', // Example primary color 
paddingVertical: 12, 
paddingHorizontal: 20, 
borderRadius:  30, 
flexDirection: 'row', 
alignItems: 'center', 
justifyContent: 'center', 
shadowColor: '#000', 
shadowOffset: { width: 0, height: 2 }, 
shadowOpacity: 0.2, 
shadowRadius: 4, 
elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
   productscreenText: {
        fontSize: 20,
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center',
      }
});

  export default ProductStyle