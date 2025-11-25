import { StyleSheet } from 'react-native';

const radioButtonStyle = StyleSheet.create({
      radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      },
      outerCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      outerCircleSelected: {
        borderColor: '#007AFF', // Example selected color
      },
      innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#007AFF', // Example selected color
      },
      radioLabel: {
        fontSize: 16,
        color: '#f1ececa6',
      },
    });

    export default radioButtonStyle;