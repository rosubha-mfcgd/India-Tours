import React from 'react';
import '../../styles/FloatingButton.css'; // Import the CSS file

const FloatingButton = ({ onClick, children }) => {
  return (
    <button className="floating-btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default FloatingButton;
