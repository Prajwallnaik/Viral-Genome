import React from 'react';
import { motion } from 'framer-motion';

export default function HeroLabel({ virus }) {
  const { name, family, rnaType, shape, color, riskMetrics } = virus;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={virus.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Background Pulse Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '240px',
          height: '240px',
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          zIndex: -1,
          pointerEvents: 'none',
          filter: 'blur(30px)',
        }}
      />

      {/* Family Label */}
      <motion.div variants={itemVariants} style={{ marginBottom: '0.2rem' }}>
        <span style={{
          fontSize: '0.62rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: color,
          opacity: 0.75,
          textShadow: `0 0 8px ${color}33`,
        }}>
          {family}
        </span>
      </motion.div>

      {/* Main Name */}
      <motion.div variants={itemVariants}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
          fontWeight: 800,
          margin: 0,
          background: `linear-gradient(to bottom, #ffffff 30%, ${color}aa 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          filter: `drop-shadow(0 0 16px ${color}33)`,
        }}>
          {name}
        </h1>
      </motion.div>

      {/* Feature Badges */}
      <motion.div 
        variants={itemVariants}
        style={{ 
          marginTop: '0.8rem', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        {/* BSL Badge */}
        {virus.bsl >= 3 && (
          <div style={{
            background: '#ff4a6e22',
            border: '1px solid #ff4a6e44',
            color: '#ff4a6e',
            fontSize: '0.63rem',
            fontWeight: 800,
            padding: '0.2rem 0.55rem',
            borderRadius: '5px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            BSL-{virus.bsl}
          </div>
        )}

        <div className="pill" style={{ 
          background: 'rgba(255,255,255,0.03)', 
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '0.35rem 0.9rem',
          backdropFilter: 'blur(10px)',
          fontSize: '0.72rem',
        }}>
          <span style={{ 
            width: 7, height: 7, borderRadius: '50%', 
            background: color, display: 'inline-block',
            boxShadow: `0 0 7px ${color}` 
          }} />
          <span style={{ color: '#fff', fontWeight: 600 }}>{rnaType}</span>
        </div>
        
        <div className="pill" style={{ 
          background: 'rgba(255,255,255,0.03)', 
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '0.35rem 0.9rem',
          backdropFilter: 'blur(10px)',
          fontSize: '0.72rem',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>{shape.replace(/_/g, ' ')}</span>
        </div>
      </motion.div>

      {/* Mini Metrics Teaser */}
      <motion.div 
        variants={itemVariants}
        style={{ 
          marginTop: '0.8rem', 
          display: 'flex', 
          gap: '1.6rem',
          padding: '0.5rem 1.2rem',
          borderRadius: '12px',
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Transmission</span>
          <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${riskMetrics.transmissibility * 100}%` }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ height: '100%', background: color }} 
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Clinical Risk</span>
          <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${riskMetrics.mortality * 100}%` }}
              transition={{ duration: 1, delay: 1 }}
              style={{ height: '100%', background: '#ff4a6e' }} 
            />
          </div>
        </div>
      </motion.div>

      {/* Genetic Stream Teaser */}
      <motion.div
        variants={itemVariants}
        style={{
          marginTop: '0.7rem',
          fontFamily: 'monospace',
          fontSize: '0.62rem',
          color: color,
          opacity: 0.4,
          letterSpacing: '0.25em',
          textTransform: 'uppercase'
        }}
      >
        Live: <motion.span
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          {Array.from({ length: 10 }).map(() => "AUGC"[Math.floor(Math.random() * 4)]).join("")}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
