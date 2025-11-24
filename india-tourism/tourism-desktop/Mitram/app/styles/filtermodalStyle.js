import { StyleSheet  } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ModalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: '#ff5c5c',
  },
  buttonOk: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerCompStyle: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  headercontainer: {
       flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    width: screenWidth,
    height: screenHeight*0.10, // Adjust as needed
    backgroundColor: '#673AB7', // Example: Purple background
  },
  headersubcontainer: {
       flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '30%',
    height: 60, // Adjust as needed
    backgroundColor: '#673AB7', // Example: Purple background
  },
   headerTitles:{
     color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  }

  
});

export default ModalStyle;