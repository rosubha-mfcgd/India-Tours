import { StyleSheet ,Platform } from 'react-native';

const PreviewBookingStyle = StyleSheet.create({

    contentContainer: {
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'center', // Centers content vertically (if scrollable area allows)
    paddingVertical: 20,
  },
    TextInput: {
    alignitems: 'left',
    textAlign: 'left',
    margin: 'auto',
    width:600,
    height:40,
    backgroundColor:'#65b2e6ff',
    borderradius: 6
},
 body: {
     fontfamily: 'Roboto', /* Or another suitable sans-serif font */
    fontSize: 16,
    lineheight: 1.5,
    color: '#333', /* Dark gray for good contrast */
     alignitems: 'left'
  },
   h2: {
     fontSize: 18, /* Or another suitable sans-serif font */
  fontWeight: 'bold',
  marginbottom: 16,
  color: '#fcf2f2ff'
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
      width: '75%', // Distributes width evenly, or set a specific pixel value
    },
    previewtable: {
        borderWidth: 1,
        marginBottom: 8,
    },
    tdlabelcell: {
        width: '25%', 
        backgroundColor: 'rgba(160, 230, 248, 1)'
    },
     safeAreaContainer: {
    flex: 1,
    backgroundColor: '#8004049f', // Background color behind the status bar/notch
  },
    scrollView: {
    marginHorizontal: 0,
  },
  contentContainer: {
    paddingHorizontal: 20,
    // Add extra padding at the top/bottom if needed, or let SafeAreaView handle it
  }
});

export default PreviewBookingStyle