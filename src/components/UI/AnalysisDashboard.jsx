import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Dna, Network, Microscope, ShieldAlert, Fingerprint, Zap } from 'lucide-react';

// --- Reusable UI Elements ---

function Card({ children, title, icon: Icon, delay = 0, style = {}, color = "var(--accent)" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderTop: `1px solid ${color}44`,
        ...style
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${color}88, transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', opacity: 0.8 }}>
        {Icon && <Icon size={15} color={color} />}
        <div className="t-label" style={{ margin: 0, letterSpacing: '0.15em' }}>{title}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </motion.div>
  );
}

// --- Analysis Widgets ---

function RadarChart({ metrics, color }) {
  const points = [
    { label: 'Transmissibility', val: metrics.transmissibility },
    { label: 'Mortality', val: metrics.mortality },
    { label: 'Immune Escape', val: metrics.immuneEscape },
    { label: 'Env Stability', val: metrics.stability },
  ];

  const size = 180;
  const center = size / 2;
  const radius = center * 0.7;

  const getPoint = (val, i) => {
    const angle = (i * Math.PI * 2) / points.length - Math.PI / 2;
    const x = center + Math.cos(angle) * (val * radius);
    const y = center + Math.sin(angle) * (val * radius);
    return `${x},${y}`;
  };

  const pathData = points.map((p, i) => getPoint(p.val, i)).join(' ');
  const gridPath = [0.25, 0.5, 0.75, 1].map(lvl => 
    points.map((p, i) => getPoint(lvl, i)).join(' ')
  );

  return (
    <Card title="Risk Profile Analysis" icon={ShieldAlert} delay={0.1} color={color} style={{ alignItems: 'center' }}>
      <svg width={size} height={size} style={{ overflow: 'visible', filter: `drop-shadow(0 0 10px ${color}22)` }}>
        {/* Radar Web */}
        {gridPath.map((g, i) => (
          <polygon key={i} points={g} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray={i % 2 === 0 ? "2 2" : "none"} />
        ))}
        {/* Center crosshairs */}
        <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="rgba(255,255,255,0.06)" />
        <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="rgba(255,255,255,0.06)" />
        
        {/* Data Polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', bounce: 0.4 }}
          points={pathData}
          fill={`${color}33`}
          stroke={color}
          strokeWidth="1.5"
        />
        {/* Data points glow */}
        {points.map((p, i) => {
            const pt = getPoint(p.val, i).split(',');
            return (
              <circle key={`pt-${i}`} cx={pt[0]} cy={pt[1]} r="3" fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
            );
        })}
        {/* Labels */}
        {points.map((p, i) => {
          const angle = (i * Math.PI * 2) / points.length - Math.PI / 2;
          const tx = center + Math.cos(angle) * (radius + 24);
          const ty = center + Math.sin(angle) * (radius + 24);
          return (
            <text key={i} x={tx} y={ty} textAnchor="middle" alignmentBaseline="middle" fontSize="9" fill="rgba(255,255,255,0.5)" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              {p.label}
            </text>
          );
        })}
      </svg>
    </Card>
  );
}

function LineageTree({ lineages, color }) {
  return (
    <Card title="Phylogenetic Lineage" icon={Network} delay={0.2} color={color}>
      <div style={{ position: 'relative', flex: 1, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: '10%', left: 0, bottom: '10%', width: '1px', background: `linear-gradient(to bottom, transparent, ${color}66, transparent)` }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {lineages.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1), ease: 'easeOut' }}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: '15px', height: '1px', background: `linear-gradient(to right, ${color}88, transparent)` }} />
              <div style={{ 
                padding: '0.4rem 0.8rem', borderRadius: 6, 
                border: i === 0 ? `1px solid ${color}66` : '1px solid rgba(255,255,255,0.06)', 
                background: i === 0 ? `${color}11` : 'rgba(0,0,0,0.2)',
                fontSize: '0.75rem', color: i === 0 ? color : 'rgba(255,255,255,0.6)',
                fontWeight: i === 0 ? 700 : 400,
                letterSpacing: '0.05em',
                boxShadow: i === 0 ? `0 0 10px ${color}22` : 'none',
                transition: 'all 0.2s',
              }}>
                {l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function BaseComposition({ sequence, color }) {
  const stats = useMemo(() => {
    const counts = { A: 0, U: 0, G: 0, C: 0 };
    for (const b of sequence) counts[b]++;
    const total = sequence.length || 1;
    return Object.entries(counts).map(([label, count]) => ({
      label,
      percent: (count / total) * 100
    }));
  }, [sequence]);

  const baseColors = { A: '#ff4a6e', U: '#00e5ff', G: '#00ff88', C: '#ffcc00' };

  return (
    <Card title="Genetic Sequence Stats" icon={Dna} delay={0.3} color={color}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'center' }}>
        {stats.map((s, i) => (
          <div key={s.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ fontWeight: 700, color: baseColors[s.label] }}>Base {s.label}</span>
              <span style={{ fontFamily: 'monospace' }}>{s.percent.toFixed(1)}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.percent}%` }}
                transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "circOut" }}
                style={{ height: '100%', background: baseColors[s.label], borderRadius: '2px', boxShadow: `0 0 8px ${baseColors[s.label]}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// --- Main Dashboard ---

export default function AnalysisDashboard({ virus, sequence, mutationCount }) {
  return (
    <div style={{ 
      width: '100%', maxWidth: '1200px', margin: '0 auto',
      display: 'flex', flexDirection: 'column', gap: '2rem',
      pointerEvents: 'auto', paddingBottom: '3rem'
    }}>
      
      {/* ── Header Area ── */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.5rem' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
             <Activity size={16} color={virus.color} />
             <div className="t-label" style={{ color: virus.color, letterSpacing: '0.25em', margin: 0 }}>GENOMIC ANALYSIS ENGINE</div>
          </div>
          <motion.div 
            key={virus.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="t-display" 
            style={{ fontSize: '3rem', letterSpacing: '-0.02em', textShadow: `0 0 20px ${virus.color}44` }}
          >
            {virus.name} <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.4, letterSpacing: '0.1em', verticalAlign: 'middle', marginLeft: '0.5rem' }}>v{mutationCount}.0</span>
          </motion.div>
        </div>

        <div style={{ display: 'flex', gap: '3rem', textAlign: 'right' }}>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>
                <Zap size={12} />
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Mutations</div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 300, fontFamily: 'monospace', color: '#fff' }}>{mutationCount}</div>
           </div>
           <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>
                <Fingerprint size={12} />
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Sequence ID</div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 500, fontFamily: 'monospace', color: virus.color, marginTop: '0.4rem' }}>
                {virus.id.toUpperCase().replace(/-/g,'').substring(0,6)}-{mutationCount.toString().padStart(3, '0')}
              </div>
           </div>
        </div>
      </motion.div>

      {/* ── Top Metrics Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', height: '280px' }}>
        <RadarChart metrics={virus.riskMetrics} color={virus.color} />
        <LineageTree lineages={virus.lineages} color={virus.color} />
        <BaseComposition sequence={sequence} color={virus.color} />
      </div>

      <Card title="Proteomic Structural Breakdown" icon={Microscope} delay={0.4} color={virus.color} style={{ flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '0.5rem', padding: '0.5rem 0.25rem' }}>
          {virus.proteins.map((p, i) => (
            <motion.div 
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.05) }}
              whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.08)', boxShadow: `0 8px 24px rgba(0,0,0,0.4)` }}
              style={{ 
                padding: '1rem 1.25rem', 
                background: 'rgba(0,0,0,0.35)', 
                border: '1px solid rgba(255,255,255,0.06)', 
                borderRadius: 10,
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
                cursor: 'default',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle accent edge */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '4px', background: virus.color, opacity: 0.8 }} />
              
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.02em', color: '#fff', lineHeight: 1.2 }}>{p.name}</span>
                <span style={{ fontSize: '0.55rem', padding: '0.25rem 0.6rem', background: `${virus.color}22`, color: virus.color, border: `1px solid ${virus.color}44`, borderRadius: 12, letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>Protein</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, flex: 1 }}>
                {p.function}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

    </div>
  );
}
