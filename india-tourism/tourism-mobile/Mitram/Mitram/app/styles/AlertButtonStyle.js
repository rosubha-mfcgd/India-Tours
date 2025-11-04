import { StyleSheet ,Platform } from 'react-native';

export  const AlertStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
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
  modalbuttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalbutton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  modalbuttonOk: {
    backgroundColor: '#2196F3',
  },
  modalbuttonCancel: {
    backgroundColor: '#f44336',
  },
  modaltextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});