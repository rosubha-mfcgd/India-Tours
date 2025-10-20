import React from 'react';
import { Text,View } from 'react-native';
    const ChatWindow = ({ onClose }) => {

      const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  baseText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  coloredText: {
    color: 'blue',
  },
});

      return (
        <View
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 999,
          }}
        >
          <View style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Live Chat</Text>
            <button onPress={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}>X</button>
          </View>
          <View style={{ padding: '10px', height: 'calc(100% - 70px)', overflowY: 'auto' }}>
            {/* Chat messages and input will go here */}
            <Text>Welcome to our chat!</Text>
          </View>
          <View style={{ padding: '10px', borderTop: '1px solid #eee' }}>
            <input type="text" placeholder="Type your message..." style={{ width: '100%', padding: '5px' }} />
          </View>
        </View>
      );
    };

    export default ChatWindow;