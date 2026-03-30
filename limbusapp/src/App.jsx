import { useState, useEffect } from 'react'
import './App.css'
import Box from './components/Box';
import LightBox from './components/LightBox';
import CrtBox from './components/CrtBox';
import LuxuryButton from './components/LuxuryBotton';
import SettingsButton from './components/SettingsButton';
import DarkBox from './components/DarkBox';
import OrangeBox from './components/OrangeBox';
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

  const [currentPage, setCurrentPage] = useState("XPCalc");

  return (
    <div style={{
      display: 'flex',
      width: '83rem',
      gap: '1rem',
      scrollbarWidth: 'none',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '16rem',
        flexShrink: 0,
      }}>
        <div style={{
          position:'sticky',
          padding: '1rem',
          top: 0,
          zIndex: 100,
        }}>
          <Box>
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
          padding: "2rem",
          width:"100%",
          height:"32rem"
        }}>
          <span style={{
            fontSize: '3rem',
            color: '#736454',
            fontWeight: '400'
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
