export default function RedBox({children}) {
    return (
        <>
            <div style={{
                backgroundColor: '#4c0a0d',
                padding: '0.3rem'
            }}>
                <div style={{
                    backgroundColor: '#835430',
                    padding: '0.3rem'
                }}>
                    <div style={{
                        backgroundColor:'#311d1a',
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