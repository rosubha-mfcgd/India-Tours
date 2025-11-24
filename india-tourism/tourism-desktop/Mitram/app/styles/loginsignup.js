// GlobalStyles.js
import { StyleSheet } from 'react-native';

const LoginSignUpStyle = StyleSheet.create({

  centeredContainer: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',     // Centers content horizontally
    backgroundColor: '#f0f0f0', // Optional: for visual clarity
  },
  centre: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center'
  },
  centeredText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flexdirection: 'column',
    margin:'auto',
    width: 600,
    margintop: 200,
    backgroundColor: '#fff',
    paddingbottom: 30
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    flexdirection:'column',
    alignitems: 'center',
    gap: 9,
    width:100,
    margintop: 30
},
underline: {
    width: 61,
    height: 6,
    backgroundColor: '#3c009d',
    borderradius: 9
},
inputs:{
    margintop: 55,
   flexdirection: 'column',
    gap:25
},

input:{
    alignitems: 'center',
    margin: 'auto',
    width:480,
    height:80,
    backgroundColor:'#eaeaea',
    borderradius: 6

},
TextInput: {
    alignitems: 'center',
    margin: 'auto',
    width:480,
    height:80,
    backgroundColor:'#eaeaea',
    borderradius: 6
},

inputimg: {
    margin: 'auto',
},

inputText: {
    height:50,
    width:400,
    border: 'none',
    color:'#797979',
    fontsize:19
},

forgotpassword: {
    paddingleft: 62,
    margintop: 27,
    color:'#797979',
    fontsize:18
},

forgotpasswordspan: {
    color:'#4c00b4',
    cursor: 'pointer'
},

submitcontainer: {
    gap:30,
    margin:60
},

submit:{
    flex: 1,
    justifycontent: 'center',
    alignitems: 'center',
    minheight: '100vh',
    width: 220,
    height:59,
    color: '#fff',
    backgroundColor: '#4c00b4',
    borderradius: 50,
    fontsize: 19,
    fontweight: 700,
    cursor: 'pointer'

},

submitgray:{
    flex: 1,
    justifycontent: 'center',
    alignitems: 'center',
    minheight: '100vh',
    width: 220,
    height:59,
     color:'#676767',
    backgroundColor:' #EAEAEA',
    borderradius: 50,
    fontsize: 19,
    fontweight: 700,
    cursor: 'pointer'

},

  centrediv: {
    flex: 1,
    justifycontent: 'center',
    placeitems: 'center',
    alignitems: 'center',
    minheight: '100vh',
    minwidth: '100vw'
},

errordivattop: {

    flexdirection: 'column',
    alignitems: 'center',
    gap: 9,
    width:100,
    margintop: 30,
    fontweight: 'bold',
    color: 'red'
},

/* App.css */
rightinfocontainer: {
  flex: 1, /* Use flexbox for layout */
  justifycontent: 'center',
  alignItems: 'center'
},

originalcontent: {
  marginleft: 0, /* Adjust this to match the width of your vertical bar */
  flexgrow: 1, /* Allow main content to take up remaining space */
  padding: 10 /* Add some padding for content */
}
  // Add more common styles here
});

export default LoginSignUpStyle;