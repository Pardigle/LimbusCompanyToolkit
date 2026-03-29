import Box from "../components/Box";
import OrangeBox from "../components/OrangeBox";
import DarkBox from "../components/DarkBox";
import LightBox from "../components/LightBox";
import SettingsButton from "../components/SettingsButton";
import CrtBox from "../components/CrtBox";

export default function XPCalc() {
    return (
        <div style={{ 
            flex: 1, 
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ paddingBottom: '0.3rem' }}>
            <Box style={{ width: '100%' }}>
                <CrtBox>
                <div style={{
                    height: '8.5rem',
                }}>
                </div>
                </CrtBox>
            </Box>
            </div>
            <div style={{ width: '100%' }}>
            <div style={{
                paddingTop: '0.3rem',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <div></div>
                <div style={{ marginLeft:'1rem' }}>
                <DarkBox>
                    <span style={{ userSelect:'none' }}>GOALS</span>
                </DarkBox>
                </div>
                <SettingsButton>
                <span style={{ userSelect:'none' }}>Add Goal</span>
                </SettingsButton>
            </div>
            </div>
            <div style={{
            marginTop: '0.5rem',
            }}>
            <DarkBox>
                <div style={{height:'55vh', display:'flex', justifyContent: 'center', gap:'1rem'}}>
                <div style={{
                    display:'flex',
                    flexDirection:'column'
                }}>
                    <div style={{
                    display:'flex',
                    gap:'0.3rem',
                    overflow:'auto',
                    }}>
                    <OrangeBox>
                        <div style={{ height:'14rem', width:'8rem' }}>

                        </div>                    
                    </OrangeBox>
                    <OrangeBox>
                        <div style={{ height:'14rem', width:'25rem' }}>

                        </div>
                    </OrangeBox>
                    <OrangeBox>
                        <div style={{ height:'14rem', width:'10rem' }}>

                        </div>
                    </OrangeBox>
                    </div>
                </div>
                <div>
                    <OrangeBox>
                    <div style={{ height:'52vh', width:'15rem' }}>

                    </div>
                    </OrangeBox>
                </div>
                </div>
            </DarkBox>
            </div>
        </div>
    )
}