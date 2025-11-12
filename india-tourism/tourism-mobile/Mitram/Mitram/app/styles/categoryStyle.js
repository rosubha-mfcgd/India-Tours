import { StyleSheet } from 'react-native';

const CategoryStyle = StyleSheet.create({

    column: {
        flexDirection: 'column', // Arranges items horizontally in a row
        justifyContent: 'space-around', // Distributes space evenly around items
        marginBottom: 5,
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
  row: {
    flexDirection: 'row', // Arranges items horizontally in a row
    justifyContent: 'space-around', // Distributes space evenly around items
    marginBottom: 12,
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
  categoryscreenText: {
        fontSize: 20,
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      touchableOpacity: {
    // You can add styling to the touchable area itself if needed
    // For example, to give it a specific size or background
    borderRadius: 10, // Example: for a rounded touchable area
    overflow: 'hidden', // Ensures content respects border-radius
    flex: 1, 
    width: 300, 
    height: 200
  },
  image: {
    flex: 1, 
    width: 300, 
    height: 200
  },
  headercontainer: {
       flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60, // Adjust as needed
    backgroundColor: '#673AB7', // Example: Purple background
  },
  headerTitles:{
     color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  }
});

export default CategoryStyle