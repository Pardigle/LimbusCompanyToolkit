export default function Box({children}) {
    const cutSize = '10px';
    
    return (
        <div
            style={{
                backgroundColor: '#946137',
                padding: '4px',
                width: '100%',
                clipPath: `polygon(
                    ${cutSize} 0%, calc(100% - ${cutSize}) 0%, 
                    100% ${cutSize}, 100% calc(100% - ${cutSize}), 
                    calc(100% - ${cutSize}) 100%, ${cutSize} 100%, 
                    0% calc(100% - ${cutSize}), 0% ${cutSize}
                )`,
            }}
        >
            <div style={{
                backgroundColor: '#242421',
                color: '#bb9f81',
                padding: '0.4rem',
                minHeight:'2rem',
                clipPath: `polygon(
                    calc(${cutSize} - 2px) 0%, calc(100% - (${cutSize} - 2px)) 0%, 
                    100% calc(${cutSize} - 2px), 100% calc(100% - (${cutSize} - 2px)), 
                    calc(100% - (${cutSize} - 2px)) 100%, calc(${cutSize} - 2px) 100%, 
                    0% calc(100% - (${cutSize} - 2px)), 0% calc(${cutSize} - 2px)
                )`,
            }}>
                {children}
            </div>
        </div>
    );
}