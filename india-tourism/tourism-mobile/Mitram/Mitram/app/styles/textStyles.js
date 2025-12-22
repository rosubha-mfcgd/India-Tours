import { StyleSheet } from 'react-native';

const TextStyle = StyleSheet.create({
    body: {
     fontfamily: 'Roboto', /* Or another suitable sans-serif font */
    fontSize: 16,
    lineheight: 1.5,
    padding: 10,
    color: '#333' /* Dark gray for good contrast */
  },
  h1: {
     fontSize: 24, /* Or another suitable sans-serif font */
  fontWeight: 'bold',
  marginbottom: 16
  },
  h2: {
     fontSize: 18, /* Or another suitable sans-serif font */
  fontWeight: 'bold',
  marginbottom: 16
  },
  p:{

  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  bookingtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1ececa6',
    textAlign: 'center',
    fontStyle: 'italic',
    },
  detailtitle: {
  fontsize: 18,
  fontweight: 500, /* Medium weight */
  color: '#007bff' /* Accent color for emphasis */
},

detailitemdescription: {
  fontsize: 14,
  color: '#666'
},

 bookingtitle: {
  fontsize: 18,
  fontweight: 500, /* Medium weight */
  color: '#007bff', /* Accent color for emphasis */
  textDecorationLine: 'underline'
},
infotext: {
  fontSize: 20,
    fontWeight: 'bold',
    color: '#ff0000ff',
    textAlign: 'center',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
},
 previewbookingtabletext: {
     fontfamily: 'Roboto', /* Or another suitable sans-serif font */
    fontSize: 16,
    lineheight: 1.5,
    color: 'white' /* Dark gray for good contrast */
  },
  TextInput: {
    alignitems: 'left',
    textAlign: 'left',
    margin: 'auto',
    width:'90%',
    height:40,
    backgroundColor:'#f7f8f8ff',
    borderRadius: 30
},
paragraph: {
    marginLeft: 8,
    // Styles for the items within the sections
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  selectedparagraph: {
    marginLeft: 8,
    // Styles for the items within the sections
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4b2bd8ff',
    backgroundColor: '#4b2bd8ff',
  }


});

 export default TextStyle