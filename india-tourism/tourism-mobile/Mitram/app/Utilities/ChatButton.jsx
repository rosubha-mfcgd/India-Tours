  import React from 'react';
import { Button } from 'react-native-paper';
import { Text,View } from 'react-native';
    const ChatButton = ({ toggleChat }) => {
      return (
        <Button
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onPress={toggleChat}
        >
         <Text> Chat with us !!</Text>
        </Button>
      );
    };

    export default ChatButton;