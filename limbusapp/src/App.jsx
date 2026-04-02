import { useState, useEffect } from 'react'
import './App.css'
import Box from './components/Box';
import LightBox from './components/LightBox';
import CrtBox from './components/CrtBox';
import LuxuryButton from './components/LuxuryBotton';
import SettingsButton from './components/SettingsButton';
import DarkBox from './components/DarkBox';
import OrangeBox from './components/OrangeBox';
import BrownBox from "./components/BrownBox";
import XPCalc from './pages/XPCalc';
import Timeline from './pages/Timeline';
import Shards from './pages/Shards';

export default function App() {
  // For the "Adsense" column
  const [isLg, setIsLg] = useState(window.innerWidth >= 800);
  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 800);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [currentPage, setCurrentPage] = useState("Timeline");

  return (
    <div style={{
      display: 'flex',
      width: '83rem',
      scrollbarWidth: 'none',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '18rem',
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          position:'sticky',
          paddingTop: '1rem',
          width: '16rem',
          top: 0,
          zIndex: 100,
        }}>

          
          
          <Box>
            <BrownBox>
              <div  style={{ display:"flex", justifyContent: "center" }}>
                <img src={"/logo/logo_gradient.svg"} style={{ height: "auto", width: "100%"}} />
              </div>
            </BrownBox>
            <LightBox currentPage={currentPage} action={setCurrentPage} value={'Timeline'}>
              <span style={{ paddingTop:'0.3rem' }}>Timeline</span>
            </LightBox>
            <LightBox currentPage={currentPage} action={setCurrentPage} value={'Shards'}>
              <span style={{ paddingTop:'0.3rem' }}>Shards</span>
            </LightBox>
            <LightBox currentPage={currentPage} action={setCurrentPage} value={'XPCalc'}>
              <span style={{ paddingTop:'0.3rem' }}>XP Calculator</span>
            </LightBox>
          </Box>
        </div>
      </div>
        
      {(currentPage === 'Timeline') &&
        <div style={{
          padding: "1rem",
          width:"100%",
          height:"32rem"
        }}>
          <span style={{
            fontSize: '3rem',
            color: '#f19a07cc',
            fontWeight: '400',
            paddingLeft: '1.5rem'
          }}>Timeline</span>
          <Timeline/>
        </div>
      }
      {(currentPage === 'XPCalc') &&
        <XPCalc/>
      }
      {(currentPage === 'Shards') && 
        <Shards/>
      }
    </div>
  )
}
