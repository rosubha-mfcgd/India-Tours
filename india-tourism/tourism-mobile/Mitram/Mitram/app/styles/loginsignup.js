// GlobalStyles.js
import { StyleSheet } from 'react-native';

const LoginSignUpStyle = StyleSheet.create({

  centeredContainer: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',     // Centers content horizontally
    backgroundColor: '#64589cff', // Optional: for visual clarity
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
},

 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
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
    alignitems: 'left',
    textAlign: 'center',
    margin: 'auto',
    width:'80%',
    height:40,
    backgroundColor:'#f7f8f8ff',
    borderRadius: 30
  },
  flexboxcontainer: {
    flexDirection: 'row', // Arranges children horizontally
    alignItems: 'center', // Vertically aligns items in the center
    padding: 10,
    width:'100%',
    justifyContent: 'center',
   
  },
  buttonscontainer: {
    flexDirection: 'row', // Arranges children horizontally
    justifyContent: 'space-around', // Distributes space evenly around items
    alignItems: 'center', // Aligns items vertically in the center
    flex: 1, // Allows the container to take up available space
  },
  loginbutton: {
   backgroundColor: '#ff0000ff', // Example primary color 
paddingVertical: 12, 
paddingHorizontal: 20, 
borderRadius: 25, 
flexDirection: 'row', 
alignItems: 'center', 
justifyContent: 'center', 
shadowColor: '#000', 
shadowOffset: { width: 0, height: 2 }, 
shadowOpacity: 0.2, 
shadowRadius: 4, 
elevation: 5,
  },
  
  disabledButton: {
     backgroundColor: '#ff0000ff', // Example primary color 
paddingVertical: 12, 
paddingHorizontal: 20, 
borderRadius: 25, 
flexDirection: 'row', 
alignItems: 'center', 
justifyContent: 'center', 
shadowColor: '#000', 
shadowOffset: { width: 0, height: 2 }, 
shadowOpacity: 0.2, 
shadowRadius: 4, 
elevation: 5,
    opacity: 0.5, // Visually indicate disabled state
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  // Add more common styles here
});

export default LoginSignUpStyle;