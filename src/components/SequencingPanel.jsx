import React, { useState, useEffect, useRef } from 'react';
import { generateSequence } from '../data/viruses';
import { Play, Pause, Activity } from 'lucide-react';

function SequencingPanel({ virus }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sequenceLines, setSequenceLines] = useState([]);
  const containerRef = useRef(null);

  // Reset lines when virus changes
  useEffect(() => {
    setSequenceLines([virus.sequencePrefix + generateSequence(25)]);
  }, [virus]);

  // Simulate reading RNA genome
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSequenceLines((prev) => {
          const newLine = generateSequence(40);
          const nextLines = [...prev, newLine];
          if (nextLines.length > 15) return nextLines.slice(nextLines.length - 15);
          return nextLines;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const renderBase = (char, i) => {
    return <span key={i} className={`base-${char}`}>{char}</span>;
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="#00f0ff" />
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Sequencer</h3>
        </div>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 0.8rem', borderRadius: '4px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span style={{ fontSize: '0.8rem' }}>{isPlaying ? 'PAUSE' : 'START'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
        <span>5'</span>
        <span>RNA Strand</span>
        <span>3'</span>
      </div>

      <div 
        ref={containerRef}
        className="sequence-container" 
        style={{ flex: 1, background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '1rem', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', border: '1px solid rgba(0, 240, 255, 0.1)' }}
      >
        <div style={{ fontSize: '1rem', letterSpacing: '2px', wordBreak: 'break-all', lineHeight: '1.8' }}>
          {sequenceLines.map((line, rowIndex) => (
            <div key={rowIndex} style={{ opacity: rowIndex === sequenceLines.length - 1 ? 1 : Math.max(0.2, rowIndex / sequenceLines.length) }}>
              {line.split('').map((char, colIndex) => renderBase(char, colIndex))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SequencingPanel;
