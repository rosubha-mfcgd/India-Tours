import { StyleSheet ,Platform } from 'react-native';

const BookingStyle = StyleSheet.create({

    contentContainer: {
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'center', // Centers content vertically (if scrollable area allows)
    paddingVertical: 20,
  },
    TextInput: {
    alignitems: 'center',
    margin: 'auto',
    width:480,
    height:80,
    backgroundColor:'#eaeaea',
    borderradius: 6
},
 body: {
     fontfamily: 'Roboto', /* Or another suitable sans-serif font */
    fontSize: 16,
    lineheight: 1.5,
    color: '#333', /* Dark gray for good contrast */
     alignitems: 'left'
  },
input: {
   height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
   pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    // Adjust height for Android picker display
    ...(Platform.OS === 'android' && { height: 50, justifyContent: 'center' }),
  },
   flexboxcontainer: {
    flexDirection: 'row', // Arranges children horizontally
    alignItems: 'center', // Vertically aligns items in the center
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c91818ff',
  },
  column: {
    flex: 1, // Distributes available space equally among columns
    marginHorizontal: 5,
  },
  outlinedView: {
    flex: 1,
     flexDirection: 'row', // Arranges children horizontally
    alignItems: 'center', // Vertically aligns items in the center
        borderWidth: 2, // Sets the width of the border
        borderColor: 'red', // Sets the color of the border
        borderStyle: 'solid', // Sets the style of the border (solid, dotted, dashed)
        padding: 10, // Add padding to ensure content isn't flush with the border
      },
       tableContainer: {
    // The main outline effect is achieved here
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5, // Optional: for rounded corners
    margin: 10,
    overflow: 'hidden', // Ensures border radius is visible
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1, // Optional: for inner horizontal lines
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});

export default BookingStyle