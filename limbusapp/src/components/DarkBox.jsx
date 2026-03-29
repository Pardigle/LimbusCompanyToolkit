export default function DarkBox({ children }) {
  const cutSize = '5px';

  return (
    <div
      style={{
        filter:'drop-shadow(0px 0px 1.2px #18130e)',
      }}
    >
      <div
        style={{
          backgroundColor: '#50311e',
          marginTop: '0.2rem',
          marginBottom: '0.2rem',
          padding: '3px',
          paddingInline: '6px',
          transition: 'background-color 0.1s ease',
          clipPath: `polygon(
            ${cutSize} 0%, calc(100% - ${cutSize}) 0%, 
            100% ${cutSize}, 100% calc(100% - ${cutSize}), 
            calc(100% - ${cutSize}) 100%, ${cutSize} 100%, 
            0% calc(100% - ${cutSize}), 0% ${cutSize}
          )`,
          minWidth: '15rem'
        }}
      >
        <div
          style={{
            backgroundColor:'#080808',
            color:'#e0c6ab',
            padding: '0.3rem',
            display: 'flex',
            fontWeight: '300',
            fontSize: '1.7rem',
            letterSpacing: '0.08rem',
            justifyContent: 'center',
            alignItems: 'center',
            letterSpacing: '0.1rem',
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