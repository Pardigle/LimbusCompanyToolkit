import Box from "../components/Box";
import OrangeBox from "../components/OrangeBox";
import DarkBox from "../components/DarkBox";
import LightBox from "../components/LightBox";
import SettingsButton from "../components/SettingsButton";
import CrtBox from "../components/CrtBox";
import BrownLuxuryBox from "../components/BrownLuxuryBox";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Chain from "../components/Chain";
import ReactDOM from 'react-dom';
import LuxuryButton from "../components/LuxuryBotton";
import CardboardBox from "../components/CardboardBox";
import BrownBox from "../components/BrownBox";

export default function XPCalc() {
    const [addGoalState, setAddGoalState] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setAddGoalState(false);
            setIsExiting(false);
        }, 400);
    };

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && addGoalState) handleClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [addGoalState]);

    // Render backdrop directly into document.body, completely outside any filter/transform context
    const backdropPortal = addGoalState ? ReactDOM.createPortal(
        <AnimatePresence>
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.42)',
                    zIndex: 1000,
                    display: 'flex',
                    pointerEvents: 'auto',
                    justifyContent: 'center'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column' }}
                >
                    <div
                        className={isExiting ? "hanging-container-out" : "hanging-container-in"}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginTop: '6rem',
                        }}
                    >
                        <div style={{ display: 'flex', marginTop: '-180px', pointerEvents: 'none' }}>
                            <Chain style={{ marginLeft: '10px', width: '20px', zIndex: -1, marginTop: '-5rem', marginBottom: '-8rem' }} />
                            <Chain style={{ marginLeft: '800px', width: '20px', zIndex: -1, marginTop: '-5rem', marginBottom: '-8rem' }} />
                        </div>
                        <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
                            <div style={{zIndex:2000, position: 'absolute', top: '-26px', left:'80px'}}>
                                <CardboardBox>
                                    <div style={{paddingTop: '0.5rem', paddingRight: '15rem', paddingLeft: '2rem'}}>
                                        <span style={{fontSize: '3rem', color:'#eadaa4'}}>ADD GOAL</span>
                                    </div>
                                </CardboardBox>
                            </div>
                            <div style={{zIndex:2000, position: 'absolute', top: '-30px', left:'850px'}}>
                                <BrownBox>
                                    <div style={{
                                        display: 'flex',
                                        height: '3rem',
                                    }}>
                                        <SettingsButton>
                                            <span>Identities</span>
                                        </SettingsButton>
                                        <SettingsButton>
                                            <span style={{transform: 'scale(1, 1.3)', display: 'inline-block', paddingTop: '3px'}}>E.G.O</span>
                                        </SettingsButton>
                                        <SettingsButton>
                                            <span>Façades</span>
                                        </SettingsButton>
                                    </div>
                                </BrownBox>
                            </div>                            
                            <BrownLuxuryBox >
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection:'column', }}>
                                <div style={{ paddingBottom: '0.5rem'}}>
                                    <div style={{display:'flex', gap: '0.2rem'}}>
                                        <DarkBox>
                                            <div style={{padding: '12rem', paddingInline: '16rem'}}>

                                            </div>
                                        </DarkBox>
                                        <DarkBox>
                                            <div style={{padding: '12rem', paddingInline: '22rem'}}>
                                                
                                            </div>
                                        </DarkBox>
                                    </div>
                                    
                                </div>
                                <LuxuryButton>
                                    <span style={{paddingInline: '2.5rem'}}>Confirm</span>
                                </LuxuryButton>
                            </div>
                            </BrownLuxuryBox>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null;

    return (
        <>
            {backdropPortal}
            <div style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{ paddingBottom: '0.3rem' }}>
                    <Box style={{ width: '100%' }}>
                        <CrtBox>
                            <div style={{ height: '8.5rem' }}></div>
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
                        <div style={{ marginLeft: '1rem' }}>
                            <DarkBox>
                                <span style={{ userSelect: 'none' }}>GOALS</span>
                            </DarkBox>
                        </div>
                        <SettingsButton action={setAddGoalState}>
                            <span style={{ userSelect: 'none' }}>Add Goal</span>
                        </SettingsButton>
                    </div>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                    <DarkBox>
                        <div style={{ height: 'auto', display: 'flex', justifyContent: 'center', gap: '0.3rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '0.3rem', overflow: 'auto' }}>
                                    <OrangeBox>
                                        <div style={{ height: '14rem', width: '8rem' }}></div>
                                    </OrangeBox>
                                    <OrangeBox>
                                        <div style={{ height: '14rem', width: '25rem' }}></div>
                                    </OrangeBox>
                                    <OrangeBox>
                                        <div style={{ height: '14rem', width: '10rem' }}></div>
                                    </OrangeBox>
                                </div>
                            </div>
                            <div>
                                <OrangeBox>
                                    <div style={{ height: '52vh', width: '15rem' }}></div>
                                </OrangeBox>
                            </div>
                        </div>
                    </DarkBox>
                </div>
            </div>
        </>
    );
}