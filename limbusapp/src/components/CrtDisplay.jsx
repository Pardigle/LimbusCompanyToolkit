export default function CrtDisplay({ image, children }) {
    return (
        <div style={{
            width: '99.8%',
            height: '100%',
            color: '#bb9f81',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #2a1f1d',
            backgroundColor: '#dcc9ad',
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: '15rem',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.3,
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
                background: `
                    radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.7) 100%),
                    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 3px, rgba(0, 0, 0, 0.15) 4px)
                `,
                backgroundSize: '100% 100%, 100% 4px'
            }} />
            <span style={{ zIndex: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {children}
            </span>
        </div>
    );
}