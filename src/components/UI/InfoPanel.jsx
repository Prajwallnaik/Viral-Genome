import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSequence } from '../../data/viruses';

const BASE_CSS = { 'A': 'base-A', 'U': 'base-U', 'G': 'base-G', 'C': 'base-C' };

// Compute genome composition from a sequence string
function computeComposition(seq) {
  const counts = { A: 0, U: 0, G: 0, C: 0 };
  for (const ch of seq) if (counts[ch] !== undefined) counts[ch]++;
  const total = seq.length || 1;
  return { A: counts.A/total, U: counts.U/total, G: counts.G/total, C: counts.C/total };
}

const BASE_COLOR = { A: '#ff4a6e', U: '#4a7eff', G: '#3ddb82', C: '#ffd74a' };

function SequenceLine({ line, opacity, hoveredBase }) {
  return (
    <div style={{ opacity, transition: 'opacity 0.4s', lineHeight: 1.6, letterSpacing: '0.1em', fontSize: '0.8rem' }}>
      {line.split('').map((ch, i) => {
        const isMuted = hoveredBase && hoveredBase !== ch;
        return (
          <span 
            key={i} 
            className={BASE_CSS[ch] || ''}
            style={{ 
              opacity: isMuted ? 0.15 : 1, 
              transition: 'opacity 0.2s',
              textShadow: !isMuted ? '0 0 6px currentColor' : 'none'
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
}

export default function InfoPanel({ virus, sequence, mutationCount }) {
  const [lines, setLines] = useState([generateSequence(38)]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredBase, setHoveredBase] = useState(null);

  useEffect(() => { setLines([generateSequence(38)]); }, [virus.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setLines(prev => {
        const next = [...prev, generateSequence(38)];
        return next.length > 10 ? next.slice(next.length - 10) : next;
      });
    }, 350);
    return () => clearInterval(id);
  }, [isPlaying]);

  const comp = useMemo(() => computeComposition(sequence), [sequence]);
  const gcContent = ((comp.G + comp.C) * 100).toFixed(1);

  const statRows = [
    { label: 'Discovered', value: virus.year || '—' },
    { label: 'Host',       value: virus.host || '—' },
    { label: 'Mortality',  value: virus.mortality || '—' },
    { label: 'Physical Size', value: virus.diameter || '—' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
    >

      {/* ── Organism Card ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={virus.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass"
          style={{ padding: '1.2rem 1.3rem' }}
        >
          {/* Header row */}
          <div style={{ marginBottom: '0.85rem' }}>
            <div style={{ fontSize: '0.63rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: '0.3rem' }}>
              Organism Profile
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 700,
              color: virus.color, letterSpacing: '-0.025em', lineHeight: 1.1,
            }}>
              {virus.name}
            </div>
          </div>

          {/* Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
            <span className="pill">{virus.rnaType}</span>
            <span className="pill">{virus.family}</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '1rem' }}>
            {virus.description}
          </p>

          {/* Clinical Pathology */}
          {(virus.symptoms || virus.causes) && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)' }}>
               {virus.symptoms && (
                 <div style={{ marginBottom: '0.6rem' }}>
                   <div style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.8, marginBottom: '0.15rem' }}>Symptoms</div>
                   <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{virus.symptoms}</div>
                 </div>
               )}
               {virus.causes && (
                 <div>
                   <div style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.8, marginBottom: '0.15rem' }}>Transmission / Causes</div>
                   <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{virus.causes}</div>
                 </div>
               )}
            </div>
          )}

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.85rem' }}>
            {statRows.map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '0.55rem 0.7rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Genome Composition Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>Genome Composition</span>
            </div>
            <div style={{ display: 'flex', height: 5, borderRadius: 3, overflow: 'hidden', gap: '1px' }}>
              {['A','U','G','C'].map(b => (
                <motion.div
                  key={b}
                  initial={{ flex: 0 }}
                  animate={{ flex: comp[b] }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: BASE_COLOR[b], minWidth: comp[b] > 0 ? 2 : 0 }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem' }}>
              {['A','U','G','C'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: 2, background: BASE_COLOR[b] }} />
                  <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)' }}>{b} {(comp[b]*100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mutation Counter */}
          <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>Mutations Observed</span>
            <motion.span
              key={mutationCount}
              initial={{ scale: 1.35, color: '#ff4a6e' }}
              animate={{ scale: 1, color: 'var(--accent)' }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem' }}
            >
              {mutationCount}
            </motion.span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── RNA Sequencer ── */}
      <div className="glass" style={{ padding: '1.1rem 1.3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.63rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: '2px' }}>RNA Sequencer</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{virus.rnaType}</div>
          </div>
          <button onClick={() => setIsPlaying(p => !p)} className="btn" style={{ padding: '0.3rem 0.8rem', fontSize: '0.68rem' }}>
            {isPlaying ? '⏸ Pause' : '▶ Run'}
          </button>
        </div>

        {/* Base legend */}
        <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
          {['A','U','G','C'].map(b => (
            <div 
              key={b} 
              onMouseEnter={() => setHoveredBase(b)}
              onMouseLeave={() => setHoveredBase(null)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '0.2rem',
                cursor: 'crosshair',
                padding: '0.15rem 0.3rem',
                borderRadius: 4,
                background: hoveredBase === b ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: 2, background: BASE_COLOR[b] }} />
              <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.8)' }}>
                <span className={BASE_CSS[b]} style={{ fontWeight: 700 }}>{b}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Live sequence stream */}
        <div className="t-mono" style={{
          background: 'rgba(0,0,0,0.3)', 
          borderRadius: 10, 
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '0.75rem 0.85rem', 
          height: '120px',
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.4)'
        }}>
          <div style={{ position: 'relative', zIndex: 0 }}>
            {lines.map((line, i) => (
              <SequenceLine key={i} line={line} opacity={Math.max(0.1, (i + 1) / lines.length)} hoveredBase={hoveredBase} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.35rem' }}>
          <span>5′ end</span><span>3′ end</span>
        </div>
      </div>

    </motion.div>
  );
}
