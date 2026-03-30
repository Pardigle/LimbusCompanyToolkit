import { useState, useEffect } from "react";
import Box from "../components/Box";
import RedBox from "../components/RedBox";
import BrownBox from "../components/BrownBox";
import DarkBox from "../components/DarkBox"; 
import CrtBox from "../components/CrtBox";
import Chain from "../components/Chain";

const EVENTS = [
  {
    date: "03.2026",
    activated: true,
    hotDate: true,
    label: "New Banner",
    banner: {
      tag: "Season 5 Limbus Pass",
      title: "OBLIVION",
      sub: "2024.10.10 [KST] · Until Season 6 Update",
    },
  },
  {
    date: "10.03.2026",
    activated: true,
    hotDate: false,
    label: "New Event",
    bullets: ["UI Fix", "Skin System"],
  },
  {
    date: "04.2026",
    activated: false,
    hotDate: true,
    label: "New Event",
    bullets: ["UT S", "IDK"],
  },
  {
    date: "01.04.2026",
    activated: false,
    hotDate: false,
    label: "Future Event",
    bullets: ["AK Collab"],
  },
];

const ACTIVATED = "#f19a07";
const UNACTIVATED = "#8e6035";
const DATE_W = 130;
const DATE_GAP = 20;
const NODE_D = 20;

export default function Timeline() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    EVENTS.forEach((_, i) => {
      setVisible((prev) => [...prev, i]);
    });
  }, [EVENTS]);

  return (
    <div style={{
        display:'flex',
        flex: 1,
        width: '100%',
        paddingLeft: '1rem'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Rajdhani:wght@400;600;700&display=swap');

        @keyframes fallAndRecoil {
          0% { transform: translateY(-1000px); }
          55% { transform: translateY(40px); } /* The "extend slightly" part */
          80% { transform: translateY(-18px); } /* The "go up a little" part */
          100% { transform: translateY(0); }    /* Final position */
        }

        .hanging-container {
          animation: fallAndRecoil 0.6s ease-out forwards;
        }

        .tl-root, .tl-root * { box-sizing: border-box; }

        .tl-root {
          font-family: 'Rajdhani', sans-serif;
          width: 100%;
          max-width: 520px;
          position: relative;
          padding: 20px 0;
        }

        .tl-item {
          display: flex;
          align-items: flex-start;
          position: relative;
          /* The gap between events */
          padding-bottom: 40px; 
          opacity: 0;
          transform: translateY(16px);
        }

        .tl-item.shown {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── The Spine (The Back Line) ── */
        /* We use a pseudo-element on the root for the brown line */
        .tl-root::before {
          content: '';
          position: absolute;
          top: 25px; /* Aligns with first node */
          bottom: 25px; /* Aligns with last node */
          left: ${DATE_W + DATE_GAP}px;
          width: 3px;
          background: ${UNACTIVATED};
          transform: translateX(-50%);
          z-index: 0;
        }

        /* ── The Active Line (The Gold Line) ── */
        /* Every activated item draws a line from its center to the next item's center */
        .tl-item.is-activated::after {
          content: '';
          position: absolute;
          top: 25px;    /* Start at center of current node */
          bottom: -15px; /* End at center of next node (padding-bottom 40 - 25 = 15) */
          left: ${DATE_W + DATE_GAP}px;
          width: 3px;
          background: ${ACTIVATED};
          transform: translateX(-50%);
          z-index: 1;
        }

        /* Hide the overhanging gold line on the LAST activated item */
        .tl-item.is-last-active::after {
          display: none;
        }
        
        .tl-item.is-activated:first-child::after {
            top: 0 !important;
        }

        .date-col {
          width: ${DATE_W}px;
          flex-shrink: 0;
          text-align: right;
          padding-right: 30px;
          padding-top: 5px;
        }

        .date-text {
          font-family: 'Special Elite', serif;
          font-size: 1.1rem;
          color: #ab9e81;
        }
        .date-text.hot { color: #c8b99a; font-size: 1.4rem; }

        .node-wrap {
          width: ${DATE_GAP * 2}px;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          padding-top: 10px; /* Adjust this to center node with text */
          position: relative;
          z-index: 5;
        }

        .node {
          width: ${NODE_D}px;
          height: ${NODE_D}px;
          border-radius: 50%;
          border: 2.5px solid ${ACTIVATED};
          background: ${ACTIVATED};
          box-shadow: 0 0 8px ${ACTIVATED}88;
        }

        .node.dim {
          border-color: ${UNACTIVATED};
          background: #080808; /* Match your background */
          box-shadow: none;
        }

        .content-col {
          flex: 1;
          padding-left: 14px;
        }

        .event-label {
          display: inline-block;
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 0.1rem;
          padding: 5px 10px;
          margin-bottom: 8px;
          border-radius: 2px;
        }
        .active-lbl { background: ${ACTIVATED}; color: #1a0e00; }
        .dim-lbl { background: ${UNACTIVATED}; color: #f0e8d8; }

        .banner-card {
          border: 2px solid #6b4e1e;
          border-radius: 4px;
          background: linear-gradient(135deg, #2a1a0866 0%, #3d251066 40%, #1a080866 100%);
          padding: 10px 12px;
          max-width: 28rem;
        }

        .event-list { list-style: none; margin: 0; padding: 0; color: #d6cfc4; }
        .event-list li {
            font-family: 'Arial', sans-serif !important;
            font-weight: 300;
            font-size: 0.9rem;
        }
        .event-list li::before { 
            content: '· '; 
            color: ${ACTIVATED};
            font-weight: 800; 
        }
      `}</style>
      <Box>
      <BrownBox>
      <div style={{ paddingRight: '1.5rem'}}>
      <div className="tl-root">
        {EVENTS.map((ev, i) => {
          const isActivated = ev.activated;
          // Check if this is the last one that is activated
          const isLastActive = isActivated && (EVENTS[i + 1] ? !EVENTS[i + 1].activated : true);

          return (
            <div 
              key={i} 
              className={`tl-item ${visible.includes(i) ? "shown" : ""} ${isActivated ? "is-activated" : ""} ${isLastActive ? "is-last-active" : ""}`}
            >
              <div className="date-col">
                <span className={`date-text ${ev.hotDate ? "hot" : ""}`}>{ev.date}</span>
              </div>

              <div className="node-wrap">
                <div className={`node ${ev.activated ? "" : "dim"}`} />
              </div>

              <div className="content-col">
                <div className={`event-label ${ev.activated ? "active-lbl" : "dim-lbl"}`}>
                  {ev.label}
                </div>

                {ev.banner ? (
                  <div className="banner-card">
                    <div style={{fontSize: '1rem', color: '#f19a07cc', fontWeight: 400}}>{ev.banner.tag}</div>
                    <div style={{fontFamily: 'Special Elite', fontSize: '1.8rem', color: '#f19a07'}}>{ev.banner.title}</div>
                    <div style={{fontSize: '0.8rem', color: '#a0896a', fontWeight: 400}}>{ev.banner.sub}</div>
                  </div>
                ) : (
                  <ul className="event-list">
                    {ev.bullets?.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div> 
      </div>      
      </BrownBox>
      </Box>
      <div className="hanging-container" style={{
        flex: 1,
        marginLeft: '1rem'
      }}>
        <div style={{ display: 'flex' }}>
          <Chain style={{ marginLeft: '25px', width: '20px', zIndex: -4, marginTop: '-300px', marginBottom: '-130px' }}/>
          <Chain style={{ marginLeft: '400px', width: '20px', zIndex: -1, marginTop: '-300px', marginBottom: '-130px' }}/>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
        }}>
            <div>
                <RedBox>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <span style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}>
                            Current Season
                        </span>
                    </div>
                </RedBox>
                <BrownBox>
                    <div style={{
                        height:'5rem'
                    }}>
                    </div>
                </BrownBox>
            </div>
            <div style={{ display: 'flex', }}>
              <Chain style={{ marginLeft: '25px', width: '20px', zIndex: -5, marginTop: '-200px', marginBottom: '-240px' }}/>
              <Chain style={{ marginLeft: '400px', width: '20px', zIndex: -2, marginTop: '-200px', marginBottom: '-240px'}}/>
            </div>
            <div>
                <RedBox>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <span style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}>
                            Ongoing Events
                        </span>
                    </div>
                </RedBox>
                <BrownBox>
                    <div style={{
                        padding: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>                                              
                    </div>
                </BrownBox>
            </div>
        </div>
      </div>
    </div>
  );
}