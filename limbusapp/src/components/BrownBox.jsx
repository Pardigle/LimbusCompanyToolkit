export default function BrownBox({children}) {
    return (
        <>
            <div style={{
                backgroundColor: '#835430',
                padding: '0.2rem'
            }}>
                <div style={{
                    backgroundColor: '#4b311f',
                    padding: '0.2rem'
                }}>
                    <div style={{
                        backgroundColor:'#080808',
                        color: '#b89c7f',
                        padding: '0.3rem',
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}