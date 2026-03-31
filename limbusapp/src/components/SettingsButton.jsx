import { useState, useEffect } from 'react';

export default function SettingsButton({ action=null, children }) {
  const [isPressed, setIsPressed] = useState(false);
  const cutSize = '4px';

  const handlePressStart = () => {
    setIsPressed(true);
    if (action) action(true); // Trigger action on press
  };

  const containerStyle = {
    marginTop: '0.2rem',
    marginBottom: '0.2rem',
    display: 'inline-flex',
    padding: '3px',
    backgroundColor: '#050505',
    cursor: 'pointer',
    userSelect: 'none',
    boxShadow: 'none',
    transition: 'all 0.1s ease',
    clipPath: `polygon(
      ${cutSize} 0%, calc(100% - ${cutSize}) 0%, 
      100% ${cutSize}, 100% calc(100% - ${cutSize}), 
      calc(100% - ${cutSize}) 100%, ${cutSize} 100%, 
      0% calc(100% - ${cutSize}), 0% ${cutSize}
    )`,
    WebkitUserSelect: 'none', 
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    WebkitTouchCallout: 'none',
    touchAction: 'manipulation'
  };

  const innerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.4rem 1.2rem',
    minWidth: '100px',
    transition: 'all 0.1s ease',
    backgroundColor: isPressed ? '#342b23' : '#e3c59c',
    color: isPressed ? '#ffbb1b' : '#120f0c',
    boxShadow: isPressed ? 'inset 0 0 10px #ff9800' : 'inset 0 0 5px #372f23',
    clipPath: `polygon(
      calc(${cutSize} - 1px) 0%, calc(100% - (${cutSize} - 1px)) 0%, 
      100% calc(${cutSize} - 1px), 100% calc(100% - (${cutSize} - 1px)), 
      calc(100% - (${cutSize} - 1px)) 100%, calc(${cutSize} - 1px) 100%, 
      0% calc(100% - (${cutSize} - 1px)), 0% calc(${cutSize} - 1px)
    )`,
  };

  const textStyle = {
    fontWeight: '400',
    fontSize: '1.2rem',
    marginTop: '0.1rem',
    letterSpacing: '1px',
    textShadow: isPressed ? '0 0 12px rgba(255, 153, 0, 0.92)' : 'none',
    userSelect: 'none',
  };

  return (
    <div
        style={containerStyle}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => {handlePressStart(); setIsPressed(false);}}
        onMouseLeave={() => {setIsPressed(false);}}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => {handlePressStart(); setIsPressed(false);}}
    >
      <div style={innerStyle}>
        <span style={textStyle}>{children || 'Settings'}</span>
      </div>
    </div>
  );
}