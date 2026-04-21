import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Sub-Components ---

function RadarChart({ metrics, color }) {
  const points = [
    { label: 'Transmissibility', val: metrics.transmissibility },
    { label: 'Mortality', val: metrics.mortality },
    { label: 'Immune Escape', val: metrics.immuneEscape },
    { label: 'Env Stability', val: metrics.stability },
  ];

  const size = 180;
  const center = size / 2;
  const radius = center * 0.75;

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
    <div className="glass" style={{ padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="t-label" style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>Risk Profile Analysis</div>
      <svg width={size} height={size} style={{ overflow: 'visible' }}>
        {/* Grids */}
        {gridPath.map((g, i) => (
          <polygon key={i} points={g} fill="none" stroke="rgba(255,255,255,0.08)" />
        ))}
        {/* Path */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          points={pathData}
          fill={`${color}22`}
          stroke={color}
          strokeWidth="2"
        />
        {/* Labels */}
        {points.map((p, i) => {
          const angle = (i * Math.PI * 2) / points.length - Math.PI / 2;
          const tx = center + Math.cos(angle) * (radius + 20);
          const ty = center + Math.sin(angle) * (radius + 20);
          return (
            <text key={i} x={tx} y={ty} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {p.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function LineageTree({ lineages, color }) {
  return (
    <div className="glass" style={{ padding: '1.25rem', height: '100%' }}>
      <div className="t-label" style={{ marginBottom: '1.25rem' }}>Phylogenetic Lineage</div>
      <div style={{ position: 'relative', height: '180px', paddingLeft: '1rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%', justifyContent: 'space-between' }}>
          {lineages.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
            >
              <div style={{ width: '12px', height: '2px', background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ 
                padding: '0.35rem 0.65rem', borderRadius: 6, 
                border: '1px solid rgba(255,255,255,0.06)', 
                background: 'rgba(255,255,255,0.03)',
                fontSize: '0.75rem', color: i === 0 ? color : 'rgba(255,255,255,0.6)',
                fontWeight: i === 0 ? 600 : 400
              }}>
                {l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
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

  return (
    <div className="glass" style={{ padding: '1.25rem', height: '100%' }}>
      <div className="t-label" style={{ marginBottom: '1.25rem' }}>Primary Base Distribution</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 600, color: '#fff' }}>Base {s.label}</span>
              <span>{s.percent.toFixed(1)}%</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.percent}%` }}
                style={{ height: '100%', background: color, borderRadius: '3px', filter: 'brightness(1.5)' }}
              />
            </div>
          </div>
        ))}
        <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
          *Data derived from current simulated RNA segment (len: {sequence.length})
        </div>
      </div>
    </div>
  );
}

// --- Main Dashboard ---

export default function AnalysisDashboard({ virus, sequence, mutationCount }) {
  return (
    <div style={{ 
      width: '100%', maxWidth: '1100px', height: '100%', 
      display: 'flex', flexDirection: 'column', gap: '1.5rem',
      pointerEvents: 'auto'
    }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="t-label" style={{ color: virus.color, letterSpacing: '0.2em' }}>Comparative Neural Analysis</div>
          <motion.div 
            key={virus.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="t-display" 
            style={{ fontSize: '2.4rem', marginTop: '0.2rem' }}
          >
            {virus.name} <span style={{ fontWeight: 300, opacity: 0.3 }}>v8.Q</span>
          </motion.div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', textAlign: 'right' }}>
           <div>
              <div style={{ fontSize: '0.6rem', opacity: 0.4, textTransform: 'uppercase' }}>Mutations</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{mutationCount}</div>
           </div>
           <div>
              <div style={{ fontSize: '0.6rem', opacity: 0.4, textTransform: 'uppercase' }}>Clade Affinity</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>98.4%</div>
           </div>
        </div>
      </div>

      {/* Hero Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
        <RadarChart metrics={virus.riskMetrics} color={virus.color} />
        <LineageTree lineages={virus.lineages} color={virus.color} />
        <BaseComposition sequence={sequence} color={virus.color} />
      </div>

      {/* Protein Grid */}
      <div className="glass" style={{ padding: '1.5rem', flex: 1 }}>
        <div className="t-label" style={{ marginBottom: '1.5rem' }}>Proteomic Structural Breakdown</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
          {virus.proteins.map((p, i) => (
            <div key={p.name} style={{ 
              padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10,
              display: 'flex', flexDirection: 'column', gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: virus.color }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.name}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                {p.function}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Status */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0.4, fontSize: '0.65rem' }}>
         <div>SOURCE_ID: GENBANK_{virus.id.toUpperCase().replace(/-/g, '_')}</div>
      </div>
    </div>
  );
}
