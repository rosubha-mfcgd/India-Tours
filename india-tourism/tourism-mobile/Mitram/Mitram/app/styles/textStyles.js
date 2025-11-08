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
    borderradius: 6
}


});

 export default TextStyle