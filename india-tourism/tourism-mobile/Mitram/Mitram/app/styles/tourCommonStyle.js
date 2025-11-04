import { StyleSheet } from 'react-native';

const TourCommonStyle = StyleSheet.create({

centeredContainer: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',     // Centers content horizontally
    backgroundColor: '#8a41df7e', // Optional: for visual clarity
  },
  buttonscontainer: {
    flexDirection: 'row', // Arranges children horizontally
    justifyContent: 'space-around', // Distributes space evenly around items
    alignItems: 'center', // Aligns items vertically in the center
    flex: 1, // Allows the container to take up available space
  },
  buttonWrapper: {
    // Optional: Add styling to individual button containers if needed
    marginHorizontal: 10, // Adds horizontal spacing between buttons
  },
  centre: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row', // Arranges items horizontally in a row
    justifyContent: 'space-around', // Distributes space evenly around items
    marginBottom: 10,
  },
   screenText: {
        fontSize: 20,
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center',
      },

    buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#ff00c8ff', // Example background color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bookingbutton: {
    backgroundColor: '#ff00c8ff', // Example background color
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
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
  } ,
  table: {
    // Style for each row of the table
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  
  cell: {
    // Style for each cell within a row
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  underline: {
    textDecorationLine: 'underline',
  },

   updatebookingbutton: {
    backgroundColor: '#ff00c8ff', // Example background color
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    width:"25%"
  }

},



);

export default TourCommonStyle;