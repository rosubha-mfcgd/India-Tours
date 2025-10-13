/* VerticalBar.css */

import { StyleSheet } from 'react-native';

const rightInfoStyle = StyleSheet.create({

verticalbar: {
  width: '200px', /* Adjust the width as needed */
  height: '100vh', /* Make it span the full viewport height */
  backgroundcolor: '#334', /* Set a background color */
  position: 'relative', /* Fix its position on the screen */
  top: 0, /* Align to the top */
  left: 0, /* Align to the left */
  boxshadow: '2px 0 5px rgba(0, 0, 0, 0.2);', /* Optional: Add a subtle shadow */
  zindex: 1000 /* Ensure it stays on top of other content */
}
});


export default rightInfoStyle;