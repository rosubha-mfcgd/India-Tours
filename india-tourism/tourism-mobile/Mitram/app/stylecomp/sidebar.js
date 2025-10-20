
import { StyleSheet } from 'react-native';

const SidebarStyle = StyleSheet.create({

sidebar: {
    boxsizing: 'border-box',
    margin: 0,
    padding: 0,
},
Myprofile:{
  marginleft: '260',
    fontsize: '2rem'
},
SharePoints:
 {
     marginleft: '260',
    fontsize: '2rem'
},

parentcontainer :{
  position: 'relative', /* Essential for positioning child elements relative to this container */
  /* Add other styles for your container as needed, e.g., width, height, background-color */
},

childView: {
  position: 'absolute', /* Takes the element out of the normal document flow */
  top: 0, /* Positions the top edge of the div at the top edge of its positioned parent */
  right: 0, /* Positions the right edge of the div at the right edge of its positioned parent */
  /* Add other styles for your child div as needed, e.g., width, height, padding, background-color */
},

sidebar :{
  position: 'fixed',
  top: 0,
  left: '-250', /* Hide by default */
  width: '250',
  height: '100%',
  backgroundcolor: '#333',
  color: 'white',
  padding: '1rem',
  transition: 'left 0.3s ease',
  zindex: '1000'
},

sidebaropen :{
  right: 0 /* Slide in when open */
},

sidebarclosebtn :{
  background: 'none',
  color: 'white',
  border: 'none',
  fontsize: '2rem',
  cursor: 'pointer',
  float: 'right'
}
});

export default SidebarStyle;
