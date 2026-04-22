import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Overlay is constrained to center column: left:220px right:320px top:72px
 * 5 slots: TL, TR, TC (top-center), ML, MR — NO bottom slot to avoid HeroLabel
 *
 * Line endpoints are different spots on the VIRUS SURFACE (not all same center)
 * so it looks like a proper scientific anatomy diagram.
 *
 * Column approx dimensions: ~826px wide (on 1366px screen)
 * Virus center in column: ~55% left, ~40% top
 * Virus surface radius: ~22% of column height
 */

const SLOTS = [
  { id: 'tl', css: { top: '9%',  left:  '3%'  }, align: 'left',   lineEnd: { x: 40, y: 27 } },
  { id: 'tr', css: { top: '9%',  right: '7%'  }, align: 'right',  lineEnd: { x: 70, y: 27 } },
  { id: 'tc', css: { top: '3%',  left:  '50%', transform: 'translateX(-50%)' }, align: 'center', lineEnd: { x: 55, y: 22 } },
  { id: 'ml', css: { top: '46%', left:  '3%'  }, align: 'left',   lineEnd: { x: 35, y: 42 } },
  { id: 'mr', css: { top: '46%', right: '7%'  }, align: 'right',  lineEnd: { x: 75, y: 42 } },
];

// Chip departure points (where lines START from — near each chip)
const LINE_FROM = {
  tl: { x: 20, y: 15 },
  tr: { x: 80, y: 15 },
  tc: { x: 55, y:  8 },
  ml: { x: 20, y: 49 },
  mr: { x: 80, y: 49 },
};

const SHAPE_LABELS = {
  spherical_spikes: [
    { id:'spike',    label:'Spike Protein',         sub:'S-glycoprotein (S1/S2)' },
    { id:'envelope', label:'Lipid Envelope',         sub:'Bilayer membrane'       },
    { id:'rna',      label:'RNA Genome',             sub:'+ssRNA strand'          },
    { id:'matrix',   label:'Matrix Protein',         sub:'M-protein layer'        },
    { id:'capsid',   label:'Nucleocapsid',           sub:'N-protein wrapped'      },
  ],
  spherical_bumped: [
    { id:'ha',       label:'Hemagglutinin (HA)',     sub:'Host cell attachment'   },
    { id:'na',       label:'Neuraminidase (NA)',     sub:'Viral release enzyme'   },
    { id:'rna',      label:'RNA Segments',           sub:'8 −ssRNA segments'      },
    { id:'envelope', label:'Viral Envelope',         sub:'Lipid bilayer'          },
    { id:'m1',       label:'M1 Matrix',              sub:'Structural scaffold'    },
  ],
  spherical_conical: [
    { id:'env',      label:'gp120 / gp41 Env',       sub:'Entry glycoproteins'   },
    { id:'capsid',   label:'Conical Capsid',         sub:'p24 protein core'       },
    { id:'rna',      label:'RNA Genome',             sub:'+ssRNA dimer'           },
    { id:'rt',       label:'Reverse Transcriptase',  sub:'RT enzyme'              },
    { id:'integrase',label:'Integrase',              sub:'DNA integration'        },
  ],
  filamentous: [
    { id:'gp',       label:'Glycoprotein (GP)',      sub:'Entry protein'          },
    { id:'envelope', label:'Lipid Envelope',         sub:'Bilayer membrane'       },
    { id:'rna',      label:'RNA Genome',             sub:'−ssRNA strand'          },
    { id:'vp40',     label:'VP40 Matrix',            sub:'Budding scaffold'       },
    { id:'nucleo',   label:'Nucleocapsid',           sub:'NP-wrapped core'        },
  ],
  spherical_smooth: [
    { id:'e1e2',     label:'E1/E2 Glycoproteins',   sub:'Envelope proteins'      },
    { id:'envelope', label:'Lipid Envelope',         sub:'Bilayer membrane'       },
    { id:'rna',      label:'RNA Genome',             sub:'+ssRNA strand'          },
    { id:'core',     label:'Viral Core',             sub:'Capsid protein'         },
    { id:'ns5b',     label:'NS5B Polymerase',        sub:'RNA replication'        },
  ],
  icosahedral: [
    { id:'capsid',   label:'Icosahedral Capsid',    sub:'VP1–VP4 proteins'       },
    { id:'vp1',      label:'VP1 Canyon',             sub:'Receptor binding site'  },
    { id:'rna',      label:'RNA Genome',             sub:'+ssRNA strand'          },
    { id:'vertex',   label:'Icosahedral Vertex',    sub:'5-fold symmetry axis'   },
    { id:'protease', label:'3C Protease',            sub:'Polyprotein processing' },
  ],
  bullet: [
    { id:'g',        label:'G-Protein',              sub:'Receptor binding'       },
    { id:'envelope', label:'Lipid Envelope',         sub:'Bilayer membrane'       },
    { id:'rna',      label:'RNA Genome',             sub:'−ssRNA strand'          },
    { id:'np',       label:'Nucleoprotein (N)',      sub:'RNA encapsidation'      },
    { id:'lpol',     label:'L-Polymerase',           sub:'RNA-dep. replication'  },
  ],
  pleomorphic: [
    { id:'h',        label:'Hemagglutinin (H)',      sub:'CD150 cell attachment'  },
    { id:'f',        label:'Fusion Protein (F)',     sub:'Membrane fusion'        },
    { id:'rna',      label:'RNA Genome',             sub:'−ssRNA strand'          },
    { id:'envelope', label:'Viral Envelope',         sub:'Lipid bilayer'          },
    { id:'nucleocap',label:'Nucleocapsid',           sub:'N-protein complex'      },
  ],
  icosahedral_detailed: [
    { id:'e',        label:'Envelope Protein (E)',   sub:'Major surface antigen'  },
    { id:'prm',      label:'PrM / M Protein',        sub:'Virus maturation'       },
    { id:'rna',      label:'RNA Genome',             sub:'+ssRNA strand'          },
    { id:'capsid',   label:'Icosahedral Capsid',    sub:'Geometric protein shell' },
    { id:'ns5',      label:'NS5 Polymerase',         sub:'Genome replication'     },
  ],
};

// ── Chip component ──────────────────────────────────────────────────────────
function Chip({ label, sub, color, delay, slot }) {
  const isRight  = slot.align === 'right';
  const isCenter = slot.align === 'center';
  const { id, align, lineEnd, css } = slot;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        ...css,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isRight ? 'flex-end' : isCenter ? 'center' : 'flex-start',
      }}
    >
      {/* Label chip */}
      <div style={{
        background: 'rgba(3, 3, 12, 0.85)',
        border: `1px solid ${color}50`,
        borderRadius: 6,
        padding: '4px 10px',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: `0 4px 20px rgba(0,0,0,0.7), 0 0 0 0.5px ${color}20, inset 0 1px 0 rgba(255,255,255,0.04)`,
        position: 'relative',
        whiteSpace: 'nowrap',
      }}>
        {/* Accent bar */}
        <div style={{
          position: 'absolute', top: 4, bottom: 4,
          [isRight ? 'right' : 'left']: 0,
          width: 2, borderRadius: 2,
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }} />
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, color: '#fff',
          letterSpacing: '0.05em', lineHeight: 1.35,
          paddingLeft: isRight ? 0 : 7,
          paddingRight: isRight ? 7 : 0,
        }}>{label}</div>
        <div style={{
          fontSize: '0.48rem', color, opacity: 0.85,
          letterSpacing: '0.04em', lineHeight: 1.2,
          paddingLeft: isRight ? 0 : 7,
          paddingRight: isRight ? 7 : 0,
        }}>{sub}</div>
      </div>

      {/* Pulsing dot indicator */}
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: delay * 0.3 }}
        style={{
          width: 5, height: 5, borderRadius: '50%',
          background: color, boxShadow: `0 0 10px ${color}`,
          marginTop: 4,
          alignSelf: isRight ? 'flex-end' : isCenter ? 'center' : 'flex-start',
          marginRight: isRight  ? 10 : 0,
          marginLeft:  (!isRight && !isCenter) ? 10 : 0,
        }}
      />
    </motion.div>
  );
}

// ── SVG lines — each goes from chip to a different surface point ────────────
function Lines({ slots, color, show }) {
  if (!show) return null;
  return (
    <svg style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', overflow: 'visible', zIndex: 4,
    }}>
      <defs>
        <filter id="vag-glow">
          <feGaussianBlur stdDeviation="1.2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {slots.map((slot, i) => {
        const from = LINE_FROM[slot.id];
        const to   = slot.lineEnd;
        return (
          <motion.line
            key={slot.id}
            x1={`${from.x}%`} y1={`${from.y}%`}
            x2={`${to.x}%`}   y2={`${to.y}%`}
            stroke={color} strokeWidth="0.9"
            strokeDasharray="5 5" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
            filter="url(#vag-glow)"
          />
        );
      })}
    </svg>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────
export default function VirusAnnotations({ virus, showShell, rnaVisible }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, [virus.id]);

  const all = SHAPE_LABELS[virus.shape] ?? SHAPE_LABELS.spherical_spikes;

  const filtered = all.filter(l => {
    if (l.id === 'rna' && !rnaVisible) return false;
    if (!showShell && l.id !== 'rna') return false;
    return true;
  }).slice(0, 5);

  const activeSlots = SLOTS.slice(0, filtered.length);

  return (
    <div style={{
      position: 'absolute',
      // Strictly inside center column — never overlaps side panels or navbar
      top: '72px', left: '220px', right: '320px', bottom: 0,
      pointerEvents: 'none',
      zIndex: 5,
      // overflow visible so chips aren't clipped at edges
      overflow: 'visible',
    }}>
      <AnimatePresence>
        {visible && (
          <>
            <Lines slots={activeSlots} color={virus.color} show={visible} />
            {filtered.map((lbl, i) => (
              <Chip
                key={`${virus.id}-${lbl.id}`}
                label={lbl.label}
                sub={lbl.sub}
                color={virus.color}
                delay={0.1 + i * 0.12}
                slot={SLOTS[i]}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
