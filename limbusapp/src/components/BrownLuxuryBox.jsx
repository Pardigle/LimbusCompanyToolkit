export default function BrownLuxuryBox({ children }) {
  const cutSize = '5px';

  const containerStyle = {
    display: 'inline-flex',
    padding: '5px',
    transition: 'all 0.1s ease',
    background:`conic-gradient(
          from 180deg,
          #23221f 0%,
          #23221f 25%,
          #996639 25.1%, 
          #996639 75%,
          #23221f 75.1%,
          #23221f 100%
        )`,
    clipPath: `polygon(
      ${cutSize} 0%, calc(100% - ${cutSize}) 0%, 
      100% ${cutSize}, 100% calc(100% - ${cutSize}), 
      calc(100% - ${cutSize}) 100%, ${cutSize} 100%, 
      0% calc(100% - ${cutSize}), 0% ${cutSize}
    )`,
  };

  const middleRimStyle = {
    padding: '4px',
    display: 'flex',
    backgroundColor:'#38342f',
    clipPath: `polygon(
      calc(${cutSize} - 1px) 0%, calc(100% - (${cutSize} - 1px)) 0%, 
      100% calc(${cutSize} - 1px), 100% calc(100% - (${cutSize} - 1px)), 
      calc(100% - (${cutSize} - 1px)) 100%, calc(${cutSize} - 1px) 100%, 
      0% calc(100% - (${cutSize} - 1px)), 0% calc(${cutSize} - 1px)
    )`,
  };

  const innerCoreStyle = {
    backgroundColor: '#120f0c',
    color: '#bb9f81',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.1s ease',
    background: `linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 15%), #120f0c`,
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