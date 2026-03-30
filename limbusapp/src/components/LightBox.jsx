import { useState } from 'react';

export default function LightBox({ currentPage = null, action = null, value = null, children }) {
  const [isPressed, setIsPressed] = useState(false);
  const cutSize = '5px';

  if (isPressed && !!action) {
    action(value);
  }

  return (
    <div
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        style={{
            cursor: 'pointer',
            userSelect: 'none',
            filter:'drop-shadow(0px 0px 1.2px #af9175)',
            transition: 'filter 0.1s ease',
            WebkitUserSelect: 'none', 
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            touchAction: 'manipulation'
        }}
    >
      <div
        style={{
          backgroundColor: isPressed ? '#ff9900' : (currentPage === value) ? '#ff9800' : '#917761',
          marginTop: '0.2rem',
          marginBottom: '0.2rem',
          padding: '2.5px',
          transition: 'background-color 0.1s ease',
          clipPath: `polygon(
            ${cutSize} 0%, calc(100% - ${cutSize}) 0%, 
            100% ${cutSize}, 100% calc(100% - ${cutSize}), 
            calc(100% - ${cutSize}) 100%, ${cutSize} 100%, 
            0% calc(100% - ${cutSize}), 0% ${cutSize}
          )`,
        }}
      >
        <div
          style={{
            backgroundColor: isPressed ? '#5e2f00' :  (currentPage === value) ? '#3d2711' : '#311d1a',
            color: isPressed ? '#ffe2c3' : (currentPage === value) ? '#ffcc80' : '#bb9f81',
            padding: '0.3rem',
            display: 'flex',
            fontWeight: '400',
            fontSize: '1.4rem',
            letterSpacing: '0.08rem',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.1s ease',
            textShadow: '0px 0px 1px #af9175',
            clipPath: `polygon(
              calc(${cutSize} - 2px) 0%, calc(100% - (${cutSize} - 2px)) 0%, 
              100% calc(${cutSize} - 2px), 100% calc(100% - (${cutSize} - 2px)), 
              calc(100% - (${cutSize} - 2px)) 100%, calc(${cutSize} - 2px) 100%, 
              0% calc(100% - (${cutSize} - 2px)), 0% calc(${cutSize} - 2px)
            )`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}