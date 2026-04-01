import { useState, useEffect } from "react";
import Box from "../components/Box";
import RedBox from "../components/RedBox";
import BrownBox from "../components/BrownBox";
import DarkBox from "../components/DarkBox";
import CrtBox from "../components/CrtBox";
import Chain from "../components/Chain";
import '../App.css';

// ─── Data ─────────────────────────────────────────────────────────────────────
// Each item can have:
//   schedule: {
//     start: ISO 8601 string  ← when the event goes live
//     end:   ISO 8601 string  ← when the event ends
//   }
//
// Ongoing Events panel shows items where now >= start AND now < end.
// Omit schedule entirely for items with no time relevance.
// All times in KST (+09:00).
// ─────────────────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    date: "03.2026",
    activated: true,
    hotDate: true,
    items: [
      {
        label: "New Banner",
        schedule: {
          start: "2026-03-06T10:00:00+09:00",
          end:   "2026-04-17T10:00:00+09:00",
        },
        banner: {
          tag: "Season 5 Limbus Pass",
          title: "OBLIVION",
          sub: "2026.03.06 [KST] · Until Season 6 Update",
        },
      },
    ],
  },
  {
    date: "10.03.2026",
    activated: true,
    hotDate: false,
    items: [
      {
        label: "New Update",
        schedule: {
          start: "2026-03-10T10:00:00+09:00",
          end:   "2026-04-17T10:00:00+09:00",
        },
        bullets: ["UI Fix", "Skin System"],
      },
    ],
  },
  {
    date: "04.2026",
    activated: false,
    hotDate: true,
    items: [
      {
        label: "New Event",
        schedule: {
          start: "2026-04-17T10:00:00+09:00",
          end:   "2026-05-15T10:00:00+09:00",
        },
        bullets: ["UT Season"],
      },
      {
        label: "AK Collab",
        schedule: {
          start: "2026-04-24T10:00:00+09:00",
          end:   "2026-05-22T10:00:00+09:00",
        },
        bullets: ["Arknights Collaboration"],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pad(n) {
  return String(n).padStart(2, '0');
}

function isOngoing(schedule) {
  if (!schedule) return false;
  const now = Date.now();
  return now >= new Date(schedule.start).getTime() && now < new Date(schedule.end).getTime();
}

function getTimeLeft(isoDate) {
  const diff = new Date(isoDate) - Date.now();
  if (diff <= 0) return null;
  const totalSecs = Math.floor(diff / 1000);
  const d = Math.floor(totalSecs / 86400);
  const h = Math.floor((totalSecs % 86400) / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return { d, h, m, s };
}

// ─── Ongoing Timer ────────────────────────────────────────────────────────────

function OngoingTimer({ endDate }) {
  const [time, setTime] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(endDate)), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (!time) {
    return <div className="ongoing-expired">Ended</div>;
  }

  const blocks = [
    { num: pad(time.d), lbl: "Days" },
    { num: pad(time.h), lbl: "Hrs" },
    { num: pad(time.m), lbl: "Min" },
    { num: pad(time.s),  lbl: "Sec" },
  ];

  return (
    <div className="ongoing-countdown">
      {blocks.map(({ num, lbl }) => (
        <div className="cd-block" key={lbl}>
          <span className="cd-num">{num}</span>
          <span className="cd-lbl">{lbl}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Ongoing Events panel ─────────────────────────────────────────────────────

function OngoingEvents() {
  const [, tick] = useState(0);

  // Re-evaluate which events are ongoing every minute
  // (in case the page is left open and an event starts/ends)
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const entries = EVENTS.flatMap((ev) =>
    ev.items.filter((item) => isOngoing(item.schedule))
  );

  if (entries.length === 0) {
    return (
      <div style={{ padding: '0.75rem', color: '#7a6040', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem' }}>
        No ongoing events.
      </div>
    );
  }

  return (
    <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {entries.map((item, i) => (
        <div className="ongoing-entry" key={i}>
          {item.banner ? (
            <div className="ongoing-banner-card">
              <div className="ongoing-banner-tag">{item.banner.tag}</div>
              <div className="ongoing-banner-title">{item.banner.title}</div>
              <div className="ongoing-banner-sub">{item.banner.sub}</div>
            </div>
          ) : (
            <div className="ongoing-label-plain">{item.label}</div>
          )}
          <OngoingTimer endDate={item.schedule.end} />
        </div>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Timeline() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    EVENTS.forEach((_, i) => {
      setVisible((prev) => [...prev, i]);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%', paddingLeft: '1rem' }}>
      <div>
        <Box>
          <BrownBox>
            <div style={{ paddingRight: '1.5rem' }}>
              <div className="tl-root">
                {EVENTS.map((ev, i) => {
                  const isActivated = ev.activated;
                  const isLastActive = isActivated && (EVENTS[i + 1] ? !EVENTS[i + 1].activated : true);

                  return (
                    <div
                      key={i}
                      className={`tl-item ${visible.includes(i) ? "shown" : ""} ${isActivated ? "is-activated" : ""} ${isLastActive ? "is-last-active" : ""}`}
                    >
                      <div className="date-col">
                        <span className={`date-text ${ev.hotDate ? "hot" : ""}`}>
                          {ev.date}
                        </span>
                      </div>

                      <div className="node-wrap">
                        {ev.hotDate
                          ? <div className={`node ${ev.activated ? "" : "dim"}`} />
                          : <div className={`node node-sub ${ev.activated ? "" : "dim"}`} />
                        }
                      </div>

                      <div className="content-col">
                        {ev.items.map((item, j) => (
                          <div className="sub-event" key={j}>
                            <div className={`event-label ${ev.activated ? "active-lbl" : "dim-lbl"}`}>
                              {item.label}
                            </div>
                            {item.banner ? (
                              <div className="banner-card">
                                <div style={{ fontSize: '1rem', color: '#f19a07cc', fontWeight: 400 }}>{item.banner.tag}</div>
                                <div style={{ fontFamily: 'Special Elite', fontSize: '1.8rem', color: '#f19a07' }}>{item.banner.title}</div>
                                <div style={{ fontSize: '0.8rem', color: '#a0896a', fontWeight: 400 }}>{item.banner.sub}</div>
                              </div>
                            ) : (
                              <ul className="event-list">
                                {item.bullets?.map((b, k) => <li key={k}>{b}</li>)}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </BrownBox>
        </Box>
      </div>

      <div className="hanging-container-in" style={{ flex: 1, marginLeft: '2rem' }}>
        <div style={{ display: 'flex' }}>
          <Chain style={{ marginLeft: '25px', width: '20px', zIndex: -4, marginTop: '-300px', marginBottom: '-130px' }} />
          <Chain style={{ marginLeft: '400px', width: '20px', zIndex: -1, marginTop: '-300px', marginBottom: '-130px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <RedBox>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}>Current Season</span>
              </div>
            </RedBox>
            <BrownBox>
              <div style={{ height: '5rem' }} />
            </BrownBox>
          </div>
          <div style={{ display: 'flex' }}>
            <Chain style={{ marginLeft: '25px', width: '20px', zIndex: -5, marginTop: '-200px', marginBottom: '-240px' }} />
            <Chain style={{ marginLeft: '400px', width: '20px', zIndex: -2, marginTop: '-200px', marginBottom: '-240px' }} />
          </div>
          <div>
            <RedBox>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}>Ongoing Events</span>
              </div>
            </RedBox>
            <BrownBox>
              <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
                <OngoingEvents />
              </div>
            </BrownBox>
          </div>
        </div>
      </div>
    </div>
  );
}