import { useState } from 'react';
import LuxuryButton from './LuxuryBotton';

// ── Reusable clip-path helper ────────────────────────────────────────────────
const clip = (size, inset = 0) => {
  const s = `${size - inset}px`;
  return `polygon(${s} 0%, calc(100% - ${s}) 0%, 100% ${s}, 100% calc(100% - ${s}), calc(100% - ${s}) 100%, ${s} 100%, 0% calc(100% - ${s}), 0% ${s})`;
};

// ── SettingsButton clone — but supports active/inactive state ─────────────────
function ModalTab({ active, onClick, children }) {
  const [isPressed, setIsPressed] = useState(false);
  const cutSize = 4;

  const outer = {
    display: 'inline-flex',
    padding: '2px',
    backgroundColor: '#050505',
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    transition: 'all 0.1s ease',
    boxShadow: (isPressed || active) ? '0 0 10px #ff9800, 0 0 4px #ff9800' : 'none',
    clipPath: clip(cutSize),
  };

  const inner = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.35rem 1rem',
    minWidth: '70px',
    transition: 'all 0.1s ease',
    backgroundColor: (isPressed || active) ? '#342b23' : '#e3c59c',
    color: (isPressed || active) ? '#ff9800' : '#120f0c',
    boxShadow: (isPressed || active) ? 'inset 0 0 10px #ff9800' : 'inset 0 0 4px #372f23',
    clipPath: clip(cutSize, 1),
  };

  const text = {
    fontWeight: '400',
    fontSize: '1.05rem',
    letterSpacing: '0.5px',
    textShadow: (isPressed || active) ? '0 0 8px rgba(255,152,0,0.7)' : 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      style={outer}
      onMouseDown={() => { setIsPressed(true); }}
      onMouseUp={() => { setIsPressed(false); onClick(); }}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => { setIsPressed(false); onClick(); }}
    >
      <div style={inner}>
        <span style={text}>{children}</span>
      </div>
    </div>
  );
}

// ── Sinner icon slot ──────────────────────────────────────────────────────────
function SinnerSlot({ sinner, selected, onClick }) {
  const cutSize = 4;
  return (
    <div
      onClick={() => sinner && onClick(sinner)}
      title={sinner?.name ?? ''}
      style={{
        width: '44px',
        height: '44px',
        cursor: sinner ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px',
        transition: 'all 0.1s ease',
        boxShadow: selected ? '0 0 8px #ff9800' : 'none',
        backgroundColor: selected ? '#ff9800' : '#50311e',
        clipPath: clip(cutSize),
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: selected ? '#2a1400' : '#1a0e08',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: clip(cutSize, 1),
        overflow: 'hidden',
      }}>
        {sinner?.icon
          ? <img src={sinner.icon} alt={sinner.name} style={{ width: '34px', height: '34px', objectFit: 'cover' }} />
          : <span style={{ color: '#3a2515', fontSize: '1.4rem' }}>◆</span>
        }
      </div>
    </div>
  );
}

// ── Number box (the chalk-board style input boxes) ────────────────────────────
function NumBox({ value, label }) {
  // Mimics the hand-drawn square boxes from the image
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px',
    }}>
      {label && (
        <span style={{
          color: '#c4a97a',
          fontSize: '0.72rem',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          opacity: 0.7,
        }}>{label}</span>
      )}
      <div style={{
        width: '46px',
        height: '42px',
        backgroundColor: '#0d0a06',
        border: '2px solid #5a3e22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e8d0aa',
        fontSize: '1.35rem',
        fontWeight: '300',
        letterSpacing: '1px',
      }}>
        {value}
      </div>
    </div>
  );
}

// ── +/- stepper button ────────────────────────────────────────────────────────
function StepBtn({ label, onClick, disabled }) {
  const [pressed, setPressed] = useState(false);
  const cutSize = 3;
  return (
    <div
      onMouseDown={() => { if (!disabled) { setPressed(true); onClick(); } }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => { if (!disabled) { setPressed(true); onClick(); } }}
      onTouchEnd={() => setPressed(false)}
      style={{
        width: '26px',
        height: '26px',
        cursor: disabled ? 'default' : 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        opacity: disabled ? 0.3 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5px',
        transition: 'all 0.08s ease',
        backgroundColor: pressed ? '#ff9800' : '#50311e',
        boxShadow: pressed ? '0 0 6px #ff9800' : 'none',
        clipPath: clip(cutSize),
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: pressed ? '#2a1400' : '#0e0a06',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: pressed ? '#ff9800' : '#a08060',
        fontSize: '1rem',
        clipPath: clip(cutSize, 1),
      }}>
        {label}
      </div>
    </div>
  );
}

// ── Range control row: [−] [val] [▶] [val] [+] ───────────────────────────────
function RangeControl({ fromVal, toVal, min, max, onFromChange, onToChange, toLabel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <StepBtn label="−" onClick={() => onFromChange(Math.max(min, fromVal - 1))} disabled={fromVal <= min} />
      <NumBox value={fromVal} />
      <span style={{ color: '#c4a97a', fontSize: '1.1rem', paddingBottom: '2px' }}>▶</span>
      <NumBox value={toLabel ?? toVal} />
      <StepBtn label="+" onClick={() => onToChange(Math.min(max, toVal + 1))} disabled={toVal >= max} />
    </div>
  );
}

// ── Chalk-style section header ────────────────────────────────────────────────
function ChalkLabel({ children, size = '1rem' }) {
  return (
    <span style={{
      color: '#d4b882',
      fontSize: size,
      fontWeight: '400',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      textShadow: '0 0 8px rgba(180,130,50,0.3)',
      opacity: 0.9,
    }}>
      {children}
    </span>
  );
}

// ── "All ▼" filter dropdown (static, styling only) ───────────────────────────
function FilterDropdown({ value, onChange, options }) {
  const cutSize = 3;
  return (
    <div style={{
      display: 'inline-flex',
      padding: '1.5px',
      backgroundColor: '#050505',
      clipPath: clip(cutSize),
    }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          backgroundColor: '#e3c59c',
          color: '#120f0c',
          border: 'none',
          outline: 'none',
          padding: '0.2rem 0.5rem',
          fontSize: '0.9rem',
          fontFamily: 'inherit',
          cursor: 'pointer',
          clipPath: clip(cutSize, 1),
          appearance: 'none',
          paddingRight: '1.4rem',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23120f0c'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 5px center',
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ── Main GoalModal ────────────────────────────────────────────────────────────
export default function GoalModal({ onClose, sinners = [], onConfirm }) {
  const [selectedSinner, setSelectedSinner] = useState(null);
  const [activeTab, setActiveTab]           = useState('Identities');
  const [fromLevel, setFromLevel]           = useState(1);
  const [toLevel, setToLevel]               = useState(60);
  const [fromUptie, setFromUptie]           = useState(1);
  const [toUptie, setToUptie]               = useState(4);
  const [filter, setFilter]                 = useState('All');

  // Roman numerals for uptie display
  const romanUptie = ['I', 'II', 'III', 'IV'];

  const handleConfirm = () => {
    if (onConfirm) onConfirm({ sinner: selectedSinner, fromLevel, toLevel, fromUptie, toUptie, tab: activeTab });
    if (onClose) onClose();
  };

  return (
    <div style={{
      width: '820px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1a1008',
      overflow: 'hidden',
    }}>

      {/* ── TOP BAR: title + tabs ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.55rem 1rem 0.45rem 1.2rem',
        background: 'linear-gradient(180deg, #2e1e0e 0%, #1e1408 100%)',
        borderBottom: '2px solid #3a2510',
      }}>
        {/* Title — rough hand-lettered look via letter-spacing + weight */}
        <span style={{
          color: '#e8cf98',
          fontSize: '2rem',
          fontWeight: '400',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          textShadow: '2px 2px 0px rgba(0,0,0,0.6), 0 0 20px rgba(200,150,50,0.2)',
        }}>
          ADD GOAL
        </span>

        {/* Tabs using SettingsButton style */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {['Identities', 'E.G.O', 'Façades'].map(tab => (
            <ModalTab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </ModalTab>
          ))}
        </div>
      </div>

      {/* ── BODY: left controls + right card list ── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* LEFT PANEL */}
        <div style={{
          width: '270px',
          flexShrink: 0,
          padding: '0.9rem 1rem 0.8rem 1.1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          borderRight: '2px solid #2e1e0e',
          background: 'linear-gradient(180deg, #1e1408 0%, #160f06 100%)',
        }}>

          {/* SINNER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <ChalkLabel size="1.1rem">SINNER</ChalkLabel>
            {/* Row 1 */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {Array.from({ length: 6 }, (_, i) => (
                <SinnerSlot
                  key={i}
                  sinner={sinners[i] ?? null}
                  selected={selectedSinner?.id === sinners[i]?.id && !!sinners[i]}
                  onClick={setSelectedSinner}
                />
              ))}
            </div>
            {/* Row 2 */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {Array.from({ length: 6 }, (_, i) => (
                <SinnerSlot
                  key={i + 6}
                  sinner={sinners[i + 6] ?? null}
                  selected={selectedSinner?.id === sinners[i + 6]?.id && !!sinners[i + 6]}
                  onClick={setSelectedSinner}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #3a2510 30%, #3a2510 70%, transparent)' }} />

          {/* TARGET LEVEL + UPTIE side by side */}
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>

            {/* TARGET LEVEL */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <ChalkLabel size="0.95rem">TARGET</ChalkLabel>
              <ChalkLabel size="0.95rem">LEVEL</ChalkLabel>
              <RangeControl
                fromVal={fromLevel}
                toVal={toLevel}
                min={1}
                max={60}
                onFromChange={setFromLevel}
                onToChange={setToLevel}
              />
            </div>

            {/* Vertical divider */}
            <div style={{ width: '1px', alignSelf: 'stretch', marginTop: '4px', background: 'linear-gradient(to bottom, transparent, #3a2510 20%, #3a2510 80%, transparent)' }} />

            {/* UPTIE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <ChalkLabel size="0.95rem">UPTIE</ChalkLabel>
              <div style={{ height: '1.2rem' }} />{/* spacer to align with level controls */}
              <RangeControl
                fromVal={fromUptie}
                toVal={toUptie}
                min={1}
                max={4}
                onFromChange={setFromUptie}
                onToChange={setToUptie}
                toLabel={romanUptie[toUptie - 1]}
              />
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: character card grid placeholder */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#120d07',
          minHeight: '320px',
        }}>
          {/* Filter bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0.4rem 0.7rem',
            borderBottom: '1px solid #2a1a0a',
          }}>
            <FilterDropdown
              value={filter}
              onChange={setFilter}
              options={['All', 'Owned', 'Unowned']}
            />
          </div>

          {/* Card grid area — user fills in character cards here */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '6px',
            alignContent: 'start',
            // Subtle scanline texture like the rest of the UI
            background: `
              repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px),
              #120d07
            `,
          }}>
            {/* ← Drop your character card components here */}
          </div>
        </div>

      </div>

      {/* ── FOOTER: Confirm ── */}
      <div style={{
        borderTop: '2px solid #2e1e0e',
        padding: '0.6rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(0deg, #1e1408 0%, #160f06 100%)',
      }}>
        <div onClick={handleConfirm} style={{ cursor: 'pointer' }}>
          <LuxuryButton>✓ Confirm</LuxuryButton>
        </div>
      </div>

    </div>
  );
}