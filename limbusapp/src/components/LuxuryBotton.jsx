import { useState } from 'react';

export default function LuxuryButton({ children }) {
  const [isPressed, setIsPressed] = useState(false);
  const cutSize = '5px';

  const containerStyle = {
    display: 'inline-flex',
    padding: '2px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.1s ease',
    background: isPressed 
      ? '#ff9800'
      : `conic-gradient(
          from 135deg,
          #23221f 0%,
          #23221f 25%,
          #e3c59c 25.1%, 
          #e3c59c 75%,
          #23221f 75.1%,
          #23221f 100%
        )`,
    boxShadow: isPressed 
      ? '0 0 15px #ff9800, inset 0 0 10px #ff9800' 
      : 'none',
    clipPath: `polygon(
      ${cutSize} 0%, calc(100% - ${cutSize}) 0%, 
      100% ${cutSize}, 100% calc(100% - ${cutSize}), 
      calc(100% - ${cutSize}) 100%, ${cutSize} 100%, 
      0% calc(100% - ${cutSize}), 0% ${cutSize}
    )`,
  };

  const middleRimStyle = {
    padding: '2px',
    display: 'flex',
    backgroundColor: isPressed ? '#fb8c00' : '#38342f',
    clipPath: `polygon(
      calc(${cutSize} - 1px) 0%, calc(100% - (${cutSize} - 1px)) 0%, 
      100% calc(${cutSize} - 1px), 100% calc(100% - (${cutSize} - 1px)), 
      calc(100% - (${cutSize} - 1px)) 100%, calc(${cutSize} - 1px) 100%, 
      0% calc(100% - (${cutSize} - 1px)), 0% calc(${cutSize} - 1px)
    )`,
  };

  const innerCoreStyle = {
    backgroundColor: isPressed ? '#2a1a0a' : '#120f0c',
    color: isPressed ? '#ffcc80' : '#bb9f81',
    padding: '0.8rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.1s ease',
    background: isPressed 
      ? `linear-gradient(180deg, rgba(255,152,0,0.2) 0%, rgba(0,0,0,0) 40%), #120f0c`
      : `linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 15%), #120f0c`,
    clipPath: `polygon(
      calc(${cutSize} - 3px) 0%, calc(100% - (${cutSize} - 3px)) 0%, 
      100% calc(${cutSize} - 3px), 100% calc(100% - (${cutSize} - 3px)), 
      calc(100% - (${cutSize} - 3px)) 100%, calc(${cutSize} - 3px) 100%, 
      0% calc(100% - (${cutSize} - 3px)), 0% calc(${cutSize} - 3px)
    )`,
  };

  return (
    <div
      style={containerStyle}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div style={middleRimStyle}>
        <div style={innerCoreStyle}>
          <span style={{ 
            opacity: 0.9, 
            fontWeight: '300', 
            letterSpacing: '1px', 
            fontSize: '1.1rem',
            whiteSpace: 'nowrap'
          }}>
            {children}
          </span>
        </div>
      </div>
    </div>
  );
}