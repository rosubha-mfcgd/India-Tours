    import React from 'react';
    import { View, Text, Pressable } from 'react-native';
    import radioButtonStyle  from '../styles/radioButtonStyle';
    const RadioButton = ({ label, selected, onPress }) => {
      return (
        <Pressable style={radioButtonStyle.radioContainer} onPress={onPress}>
          <View style={[radioButtonStyle.outerCircle, selected && radioButtonStyle.outerCircleSelected]}>
            {selected && <View style={radioButtonStyle.innerCircle} />}
          </View>
          <Text style={radioButtonStyle.radioLabel}>{label}</Text>
        </Pressable>
      );
    };

    

    export default RadioButton;