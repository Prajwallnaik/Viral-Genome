import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function VirusDrawer({ viruses, selectedIdx, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = viruses
    .map((v, i) => ({ ...v, origIdx: i }))
    .filter(v => v.name.toLowerCase().includes(query.toLowerCase()) ||
                 v.family.toLowerCase().includes(query.toLowerCase()) ||
                 v.rnaType.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="glass"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: '0.85rem 0.85rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.7rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
            Organisms
          </span>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
            {viruses.length}
          </span>
        </div>

        {/* ── Search ── */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '0.55rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', pointerEvents: 'none' }}>⌕</span>
          <input
            type="text"
            placeholder="Search organisms..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '0.45rem 0.6rem 0.45rem 1.7rem',
              fontSize: '0.75rem',
              color: '#fff',
              outline: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>
      </div>

      {/* ── List ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0.6rem' }}>
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
              No results found
            </div>
          ) : (
            filtered.map((v) => {
              const active = selectedIdx === v.origIdx;
              return (
                <motion.button
                  key={v.id}
                  onClick={() => onSelect(v.origIdx)}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 0.6rem',
                    borderRadius: 10,
                    border: `1px solid ${active ? v.color + '44' : 'transparent'}`,
                    background: active ? `${v.color}0e` : 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    marginBottom: '0.15rem',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                >
                  {/* Color indicator */}
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: v.color, flexShrink: 0,
                    boxShadow: active ? `0 0 8px ${v.color}` : 'none',
                    transition: 'box-shadow 0.3s',
                  }} />

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.82rem',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.75)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      lineHeight: 1.3,
                    }}>
                      {v.name}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>
                      {v.rnaType}
                    </div>
                  </div>

                  {/* Active bar */}
                  {active && (
                    <motion.div
                      layoutId="activeBar"
                      style={{ width: 3, height: 22, borderRadius: 2, background: v.color, flexShrink: 0 }}
                    />
                  )}
                </motion.button>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
