import React from 'react';
import {  Modal, Text, View ,Pressable} from 'react-native';
import ModalStyle from '../styles/modalStyle.js';
 
export default function AuthCommonModal({modalVisible,setModalVisible,errorMessage,setErrorMessage}) {
 
   const handleOk = () => {
    // Logic for "OK" action
    console.log('OK Pressed');
    setModalVisible(false);
    setErrorMessage(false)
  };

  const handleCancel = () => {
    // Logic for "Cancel" action
    console.log('Cancel Pressed');
    setModalVisible(false);
  };


  return (
    <View style={ModalStyle.centeredView}>
      <Modal
        animationType="slide"
        transparent={true} 
         visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
       
      >
        <View style={ModalStyle.centeredView}>
          <View style={ModalStyle.modalView}>
            <Text style={ModalStyle.modalText}>{errorMessage}</Text>
            <View style={ModalStyle.buttonContainer}>

              <Pressable
                style={[ModalStyle.button, ModalStyle.buttonOk]}
                onPress={handleOk}
              >
                <Text style={ModalStyle.textStyle}>OK</Text>
              </Pressable>
                           
            </View>
          </View>
        </View>
      </Modal>
      </View>
  )
}