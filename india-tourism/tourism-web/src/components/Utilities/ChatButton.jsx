  import React from 'react';

    const ChatButton = ({ toggleChat }) => {
      return (
        <button
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
          onClick={toggleChat}
        >
          Chat with us !!
        </button>
      );
    };

    export default ChatButton;