import { StyleSheet } from 'react-native';

const TextStyle = StyleSheet.create({
    body: {
     fontfamily: 'Roboto', /* Or another suitable sans-serif font */
    fontSize: 16,
    lineheight: 1.5,
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
 previewbookingtabletext: {
     fontfamily: 'Roboto', /* Or another suitable sans-serif font */
    fontSize: 16,
    lineheight: 1.5,
    color: 'white' /* Dark gray for good contrast */
  }


});

 export default TextStyle