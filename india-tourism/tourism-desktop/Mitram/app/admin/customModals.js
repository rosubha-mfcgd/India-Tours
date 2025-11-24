import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { AlertStyles } from '../styles/AlertButtonStyle';
export  const CustomFirstDialog = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={AlertStyles.centeredView}>
        <View style={AlertStyles.modalView}>
          {children}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};