export default function BrownBox({children}) {
    return (
        <>
            <div style={{
                backgroundColor: '#835430',
                padding: '0.2rem'
            }}>
                <div style={{
                    backgroundColor: '#4b311f',
                    padding: '0.2rem',
                    height: '100%'
                }}>
                    <div style={{ background: '#080808' }}>
                        <div style={{
                            backgroundColor:'#080808',
                            background: `
                                radial-gradient(circle, transparent 1%, rgba(0,0,0,0.4) 100%, rgba(0,0,0,0.7) 100%),
                                repeating-linear-gradient(0deg, #332f2f, transparent 4px, rgba(0, 0, 0, 0.15) 4px, rgba(0, 0, 0, 0.15) 4px)
                            `,
                            color: '#b89c7f',
                            padding: '0.3rem',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}