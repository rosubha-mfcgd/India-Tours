/* GridColumnDiv.css */
import { StyleSheet } from 'react-native';

const TripDetailsStyle = StyleSheet.create({
gridcontainer: {
  display: 'grid', /* Enables CSS Grid layout */
  gridtemplatecolumns: 'repeat(3, 1fr)', /* Creates 3 equal-width columns */
  gap: '20px', /* Adds a 20px gap between grid items */
  justifycontent: 'center',
   alignitems: 'center'
},

griditem: {
  /* Optional: Add styling for individual grid items */
  padding: '10px',
  border: '0px solid #ddd',
  justifycontent: 'center',
   alignitems: 'center'
},
button:{
  float:'right',
    margin:'2px'
}
});

export default TripDetailsStyle;
