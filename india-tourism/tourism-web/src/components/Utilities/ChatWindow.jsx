import React from 'react';

    const ChatWindow = ({ onClose }) => {
      return (
        <div
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
          <div style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Live Chat</span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}>X</button>
          </div>
          <div style={{ padding: '10px', height: 'calc(100% - 70px)', overflowY: 'auto' }}>
            {/* Chat messages and input will go here */}
            <p>Welcome to our chat!</p>
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid #eee' }}>
            <input type="text" placeholder="Type your message..." style={{ width: '100%', padding: '5px' }} />
          </div>
        </div>
      );
    };

    export default ChatWindow;