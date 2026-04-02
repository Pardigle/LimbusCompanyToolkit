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
import SelectableIcon from "../components/SelectableIcon";
import TriangleThing from "../components/TriangleThing";
import characterData from '../data/limbus_data.json';

export default function XPCalc() {
    const icon_source = '/sinner_icons/';
    const [selectedChar, setSelectedChar] = useState(null);
    const currentChar = characterData.character.find(c => c.name === selectedChar);
    const [mode, setMode] = useState(null);
    const [addGoalState, setAddGoalState] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const handleSelectedChar = (e) => {
        setSelectedChar(e.target.value);
        setMode(null);
        setAddGoalState(null);
    };

    const handleMode = (currentMode) => {
        setMode(currentMode);
    };

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

    const sinner_icon_directories = [
        'yisang_icon', 'faust_icon', 'donqui_icon', 'ryoshu_icon',
        'meursault_icon', 'honglu_icon', 'heathcliff_icon', 'ishmael_icon', 
        'rodya_icon', 'sinclair_icon', 'outis_icon', 'gregor_icon'
    ];

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
                            <div style={{zIndex:2000, position: 'absolute', top: '-26px', left:'40px'}}>
                                <CardboardBox>
                                    <div style={{paddingTop: '0.5rem', paddingRight: '15rem', paddingLeft: '2rem'}}>
                                        <span style={{fontSize: '3rem', color:'#eadaa4'}}>ADD GOAL</span>
                                    </div>
                                </CardboardBox>
                            </div>
                            <div style={{zIndex:2000, position: 'absolute', top: '-30px', left:'770px'}}>
                                <BrownBox>
                                    <div style={{
                                        display: 'flex',
                                        height: '3rem',
                                    }}>
                                        <SettingsButton action={() => handleMode("id")}>
                                            <span>Identities</span>
                                        </SettingsButton>
                                        <SettingsButton action={() => handleMode("ego")}>
                                            <span style={{transform: 'scale(1, 1.3)', display: 'inline-block', }}>E.G.O</span>
                                        </SettingsButton>
                                        <SettingsButton action={() => handleMode("facade")}>
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
                                            <div style={{height:'24rem', width:'26rem'}}>
                                                <h3 style={{paddingLeft:'2rem', paddingTop: '2rem', fontWeight: '400'}}>Sinner</h3>
                                                <div style={{
                                                    display:'flex',
                                                    justifyContent:'center'
                                                }}>
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(6, 1fr)',
                                                        gap: '0.2rem',
                                                        padding: 'rem',
                                                        width: 'min-content'
                                                    }}>
                                                        {sinner_icon_directories.map((file_name, i) => {
                                                            const character = characterData.character[i];
                                                            return (
                                                                <SelectableIcon key={i} 
                                                                onClick={() => { setSelectedChar(character.name) }}>
                                                                    <div style={{ width:'3rem', height:'3rem', display: 'flex', justifyContent:'center', alignItems:'center' }}>
                                                                        <img src={icon_source +file_name+'.svg'} style={{ width:'3rem', margin:'-0.2rem' }} draggable={"false"}/>
                                                                    </div>
                                                                </SelectableIcon>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                                <h3 style={{paddingLeft:'2rem', paddingTop: '1.5rem', fontWeight: '400'}}>Target</h3>
                                                <div style={{
                                                    display:'flex',
                                                    paddingLeft:'2rem',
                                                    paddingTop:'0.3rem'
                                                }}>
                                                    <div style={{flex:1}}>
                                                        <div style={{width:'7rem'}}>
                                                            <CardboardBox>
                                                                <span style={{fontSize:'1.4rem', color:'#edceb5'}}>LEVEL</span>
                                                            </CardboardBox>
                                                        </div>
                                                        <div style={{paddingTop: '0.5rem', display:'flex', alignItems:'center', gap:'0.6rem'}}>
                                                            <SelectableIcon>
                                                                <div style={{padding:'1.2rem'}}>

                                                                </div>
                                                            </SelectableIcon>
                                                            <TriangleThing size={18} color={"#c4af90"}/>
                                                            <SelectableIcon>
                                                                <div style={{padding:'1.2rem'}}>

                                                                </div>
                                                            </SelectableIcon>                                                            
                                                        </div>
                                                    </div>
                                                    <div style={{flex:1}}>
                                                        <div style={{width:'7rem'}}>
                                                            <CardboardBox>
                                                                <span style={{fontSize:'1.4rem', color:'#edceb5'}}>UPTIE</span>
                                                            </CardboardBox>
                                                        </div>
                                                        <div style={{paddingTop: '0.5rem', display:'flex', alignItems:'center', gap:'0.6rem'}}>
                                                            <SelectableIcon>
                                                                <div style={{padding:'1.2rem'}}>

                                                                </div>
                                                            </SelectableIcon>
                                                            <TriangleThing size={18} color={"#c4af90"}/>
                                                            <SelectableIcon>
                                                                <div style={{padding:'1.2rem'}}>

                                                                </div>
                                                            </SelectableIcon>                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DarkBox>
                                        <DarkBox>
                                            <div style={{
                                                height:'24rem', 
                                                width:'44rem', 
                                                overflowY: 'auto',
                                                padding:'2rem',
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, auto))',
                                                gap: '1rem'}}>

                                                {mode === "id" && currentChar && (
                                                    currentChar.id.map((id, i) => (
                                                        <button key={i} onClick={() => setAddGoalState(id.idName)}
                                                        style={{background: 'none', border: 'none', padding: 0}}>
                                                            <img src = {id.idImage} alt={id.idName} style={{ height:"8rem", width:"auto"}}/>
                                                        </button>
                                                    ))
                                                )}

                                                {mode === "ego" && currentChar && (
                                                    currentChar.ego.map((ego, i) => (
                                                        <button key={i} onClick={() => setAddGoalState(ego.egoName)}
                                                        style={{background: 'none', border: 'none', padding: 0}}>
                                                            <img src = {ego.egoImage} alt={ego.egoName} style={{ height:"8rem", width:"auto"}}/>
                                                        </button>
                                                    ))
                                                )}

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