import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

function SidePanel({ selectedVirus }) {
  return (
    <div className="glass-panel" style={{ width: '350px', padding: '1.5rem', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '100%', overflowY: 'auto' }}>
      
      <header>
        <h1 className="text-gradient" style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <ShieldAlert size={28} color="#00f0ff" />
          Virus Genomics
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Realtime 3D simulation of RNA mutation dynamics.
        </p>
      </header>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Info size={20} color={selectedVirus.color} />
          <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>Organism Profile</h2>
        </div>
        
        <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: selectedVirus.color }}>
          {selectedVirus.name}
        </h3>
        <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
          Family: <strong style={{ color: '#fff' }}>{selectedVirus.family}</strong>
        </div>
        <br />
        <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1rem' }}>
          Genome: <strong style={{ color: '#00f0ff' }}>{selectedVirus.rnaType}</strong>
        </div>
        <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '1rem', marginLeft: '0.5rem' }}>
          Shape: <strong style={{ color: '#fff' }}>{selectedVirus.shape.replace('_', ' ')}</strong>
        </div>
        
        <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--text-main)' }}>
          {selectedVirus.description}
        </p>
      </div>
      
    </div>
  );
}

export default SidePanel;
