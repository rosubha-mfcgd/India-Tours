import { StyleSheet } from 'react-native';

const TourCommonStyle = StyleSheet.create({

centeredContainer: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',     // Centers content horizontally
    backgroundColor: '#f0f0f0', // Optional: for visual clarity
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
    backgroundColor: '#0c0009ff', // Example background color
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
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
  }


},



);

export default TourCommonStyle;