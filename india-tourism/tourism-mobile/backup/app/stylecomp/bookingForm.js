
import { StyleSheet } from 'react-native';

const BookingFormStyle = StyleSheet.create({

formlabel : {
 marginRight: 10
},

/* Or, if you want space between specific labels */
labelone :{
  marginRight: '15px'
},
addremovebutton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
addremovebuttonText: {
    color: 'white',
    fontsize: 16
  },
  
inputlabel: {
  flex: 1,
  flexdirection: 'row',
  justifycontent: 'flex-end',
  textalign: 'right',
  width: '400px',
  lineheight: '26px',
  marginbottom: '10px'
},

buttoncontainer: {
  flex: 1,
  justifycontent: 'center', /* Centers horizontally */
  alignitems: 'center',   /* Centers vertically */
  height: '40vh' /* Ensures the container takes up the full viewport height */
},

blinkingbutton: {
  /* Basic button styles */
  backgroundColor: '#007bff',
  color: 'white',
  padding: '20px',
  border: 'none',
  borderradius: '5px',
  cursor: 'pointer',

 
},
imagestyle :{
    flex: 1,
    width: 50,
    height: 50,
    resize : 'contain'
},
imgstyle: {
 float: 'right'
 }});

export default BookingFormStyle;
