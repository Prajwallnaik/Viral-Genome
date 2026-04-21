import React from 'react';
import { motion } from 'framer-motion';

function Slider({ label, value, min, max, step, onChange, format }) {
  // Calculate percentage to fill the slider track dynamically
  const fillPercent = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="t-label" style={{ fontSize: '0.65rem' }}>{label}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
          {format(value)}
        </span>
      </div>
      
      <div style={{ position: 'relative', height: '14px', display: 'flex', alignItems: 'center' }}>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{
            ...sliderStyle,
            background: `linear-gradient(to right, var(--accent) ${fillPercent}%, rgba(255,255,255,0.1) ${fillPercent}%)`
          }}
        />
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      cursor: 'pointer', userSelect: 'none',
      padding: '0.5rem 0.6rem',
      borderRadius: '8px',
      background: checked ? 'rgba(0,229,255,0.04)' : 'transparent',
      border: `1px solid ${checked ? 'rgba(0,229,255,0.15)' : 'transparent'}`,
      transition: 'all 0.2s',
      marginLeft: '-0.6rem', marginRight: '-0.6rem'
    }}>
      <span style={{ fontSize: '0.75rem', color: checked ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: checked ? 500 : 400, transition: 'color 0.2s' }}>
        {label}
      </span>
      <input type="checkbox" className="toggle" checked={checked} onChange={e => onChange(e.target.checked)} />
    </label>
  );
}

// Custom styles for the range input thumb overriding index.css slightly for this specific panel
const sliderStyle = {
  WebkitAppearance: 'none',
  appearance: 'none',
  width: '100%',
  height: '4px',
  borderRadius: '2px',
  outline: 'none',
  margin: 0,
  cursor: 'pointer',
};

export default function ControlsPanel({ mutationRate, setMutationRate, speed, setSpeed, showShell, setShowShell, rnaVisible, setRnaVisible }) {
  
  const handleReset = () => {
    setMutationRate(0.02);
    setSpeed(1);
    setShowShell(true);
    setRnaVisible(true);
  };

  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      style={{ padding: '1.25rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-0.2rem' }}>
        <div className="t-label">Simulation Controls</div>
        <button 
          onClick={handleReset}
          style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', 
            fontSize: '0.65rem', cursor: 'pointer', letterSpacing: '0.05em',
            textTransform: 'uppercase', padding: '0.2rem 0.4rem'
          }}
          onMouseOver={e => e.target.style.color = '#fff'}
          onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
        >
          Reset
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Slider
          label="Mutation Rate"
          value={mutationRate}
          min={0} max={0.3} step={0.005}
          onChange={setMutationRate}
          format={v => `${(v * 100).toFixed(1)}%`}
        />

        <Slider
          label="Rotation Speed"
          value={speed}
          min={0} max={6} step={0.1}
          onChange={setSpeed}
          format={v => `${v.toFixed(1)}×`}
        />
      </div>

      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.06)', 
        paddingTop: '1rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.3rem' 
      }}>
        <div className="t-label" style={{ marginBottom: '0.3rem', fontSize: '0.6rem', opacity: 0.6 }}>Visibility Parameters</div>
        <Toggle 
          label="Capsid Envelope" 
          checked={showShell} 
          onChange={setShowShell} 
        />
        <Toggle 
          label="Internal RNA Helix" 
          checked={rnaVisible} 
          onChange={setRnaVisible} 
        />
      </div>
    </motion.div>
  );
}
