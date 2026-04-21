import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VirusLogo from './VirusLogo';

export default function NavBar({ activeTab, setActiveTab }) {
  const [time, setTime] = useState(new Date());

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '68px',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        /* Frosted glass bar */
        background: 'rgba(5, 5, 12, 0.65)',
        backdropFilter: 'blur(24px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 1px 0 rgba(0,229,255,0.02), 0 8px 32px rgba(0,0,0,0.4)',
      }}
    >

      {/* ── LEFT: Brand ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
        <VirusLogo size={36} color="#00e5ff" glow={true} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.05rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.15,
          }}>
            Viral Genome
          </div>
          <div style={{
            fontSize: '0.55rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            opacity: 0.9,
            lineHeight: 1,
            marginTop: '1px'
          }}>
            3D RNA Simulation Lab
          </div>
        </div>

        {/* Separator */}
        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 1rem' }} />

        {/* Build / Version tag */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Environment</div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>v4.2.0 • WebGL Active</div>
        </div>
      </div>

      {/* ── CENTER: Quick Navigation / Tabs (Mockup) ── */}
      <div style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem',
        pointerEvents: 'auto',
      }}>
        {['Viewer', 'Analysis'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                padding: '0.4rem 1.2rem',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => !isActive && (e.target.style.color = 'rgba(255,255,255,0.8)')}
              onMouseOut={e => !isActive && (e.target.style.color = 'rgba(255,255,255,0.5)')}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── RIGHT: Status & Live Sync ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
        
        {/* Live Clock */}
        <div className="t-mono" style={{ 
          fontSize: '0.65rem', 
          color: 'rgba(255,255,255,0.5)', 
          background: 'rgba(0,0,0,0.3)',
          padding: '0.3rem 0.6rem',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.04)'
        }}>
          {formatTime(time)}
        </div>

        {/* Separator */}
        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />
      </div>
    </motion.header>
  );
}
