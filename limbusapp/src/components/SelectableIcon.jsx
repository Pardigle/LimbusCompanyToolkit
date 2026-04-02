import { useState } from 'react';

export default function SelectableIcon({ children, onClick }) {
  const [isPressed, setIsPressed] = useState(false);

  const containerStyle = {
    display: 'inline-flex',
    padding: '2px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.1s ease',
    background: isPressed 
      ? '#ff9800'
      : '#c4af90',
    WebkitUserSelect: 'none', 
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    WebkitTouchCallout: 'none',
    touchAction: 'manipulation'
  };

  const middleRimStyle = {
    padding: '2px',
    display: 'flex',
    backgroundColor: isPressed ? '#ff9800' : '#5e5850',
  };

  const innerCoreStyle = {
    backgroundColor: isPressed ? '#2a1a0a' : '#120f0c',
    color: isPressed ? '#ffcc80' : '#bb9f81',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.1s ease',
    background: isPressed 
      ? `linear-gradient(180deg, rgba(255,152,0,0.2) 0%, rgba(0,0,0,0) 40%), #120f0c`
      : `linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 15%), #120f0c`,
  };

  return (
    <div
      onClick={onClick}
      style={containerStyle}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => {setIsPressed(false);}}
    >
      <div style={middleRimStyle}>
        <div style={innerCoreStyle}>
          <span style={{ 
            opacity: 0.9, 
            fontWeight: '300', 
            letterSpacing: '1px', 
            fontSize: '1.1rem',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}>
            {children}
          </span>
        </div>
      </div>
    </div>
  );
}