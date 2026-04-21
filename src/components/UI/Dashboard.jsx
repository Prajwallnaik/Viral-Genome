import React from 'react';
import { viruses } from '../../data/viruses';

function Dashboard({ 
  selectedVirus, 
  setSelectedVirus, 
  mutationRate, 
  setMutationRate,
  speed,
  setSpeed,
  showShell,
  setShowShell,
  rnaVisible,
  setRnaVisible
}) {
  return (
    <div className="glass-panel" style={{ padding: '1rem 2rem', pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      
      {/* Dropdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Select Organism</label>
        <select 
          value={selectedVirus.id} 
          onChange={(e) => setSelectedVirus(viruses.find(v => v.id === e.target.value))}
          style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '4px', outline: 'none' }}
        >
          {viruses.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      {/* Mutation Rate Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '150px' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Mutation Rate</span>
          <span style={{ color: '#00f0ff' }}>{(mutationRate * 100).toFixed(1)}%</span>
        </label>
        <input 
          type="range" 
          min="0" 
          max="0.2" 
          step="0.01" 
          value={mutationRate} 
          onChange={(e) => setMutationRate(parseFloat(e.target.value))}
        />
      </div>

      {/* Animation Speed Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '150px' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Rotation Speed</span>
          <span style={{ color: '#00f0ff' }}>{speed.toFixed(1)}x</span>
        </label>
        <input 
          type="range" 
          min="0" 
          max="5" 
          step="0.1" 
          value={speed} 
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />
      </div>

      {/* Toggles */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={showShell} onChange={(e) => setShowShell(e.target.checked)} />
          Capsid Envelope
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={rnaVisible} onChange={(e) => setRnaVisible(e.target.checked)} />
          Internal RNA Helix
        </label>
      </div>

    </div>
  );
}

export default Dashboard;
