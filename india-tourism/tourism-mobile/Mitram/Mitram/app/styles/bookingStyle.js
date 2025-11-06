import { StyleSheet ,Platform } from 'react-native';

const BookingStyle = StyleSheet.create({

    contentContainer: {
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'center', // Centers content vertically (if scrollable area allows)
    paddingVertical: 20,
    backgroundColor:'#8a41df7e'
  },
    TextInput: {
    alignitems: 'center',
    textAlign: 'center',
    margin: 'auto',
    width:480,
    height:40,
    backgroundColor:'#eaeaea',
    borderradius: 6
},
textfieldunderlinedInput: {
    fontSize: 15, // Makes the text big
    borderBottomWidth: 1, // Creates a thick underline
    borderBottomColor: '#020f1dff', // Sets the underline color
    paddingVertical: 15, // Adds vertical padding for better spacing
    width: '100%', // Adjust width as needed
    textAlign: 'center' ,// Centers the text within the input
    borderradius:'8px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
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
        width: '100%',
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
   tdcell: {
      width: '50%', // Distributes width evenly, or set a specific pixel value
    },
    previewtable: {
        borderWidth: 1,
        marginBottom: 8,
    }
});

export default BookingStyle