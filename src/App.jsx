import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { viruses, generateSequence } from './data/viruses';
import { mutateSequence } from './utils/mutationSimulator';
import HeroScene from './components/3D/HeroScene';
import NavBar from './components/UI/NavBar';
import VirusDrawer from './components/UI/VirusDrawer';
import ControlsPanel from './components/UI/ControlsPanel';
import InfoPanel from './components/UI/InfoPanel';
import AnalysisDashboard from './components/UI/AnalysisDashboard';
import HeroLabel from './components/UI/HeroLabel';


// Navbar height constant — used to offset panels below it
const NAV_H = '72px';
const SIDE_PAD = '1.5rem';

export default function App() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showShell, setShowShell] = useState(true);
  const [rnaVisible, setRnaVisible] = useState(true);
  const [mutationRate, setMutationRate] = useState(0.02);
  const [speed, setSpeed] = useState(1);
  const [sequence, setSequence] = useState(() => generateSequence(40));
  const [mutationCount, setMutationCount] = useState(0);
  const [activeTab, setActiveTab] = useState('Viewer');

  const selectedVirus = viruses[selectedIdx];

  useEffect(() => {
    setSequence(generateSequence(40));
    setMutationCount(0);
  }, [selectedIdx]);

  useEffect(() => {
    const id = setInterval(() => {
      setSequence(prev => {
        const { newSequence, mutations } = mutateSequence(prev, mutationRate);
        if (mutations > 0) setMutationCount(c => c + mutations);
        return newSequence;
      });
    }, 800);
    return () => clearInterval(id);
  }, [mutationRate]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>

      {/* ──────────────────────────────────────────────
          Layer 0 : Full-screen 3D Canvas (behind all UI)
          ────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroScene
          virus={selectedVirus}
          sequence={sequence}
          speed={speed}
          showShell={showShell}
          rnaVisible={rnaVisible}
        />
      </div>



      {/* ──────────────────────────────────────────────
          Layer 1 : Top Navbar
          ────────────────────────────────────────────── */}
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ──────────────────────────────────────────────
          Layer 2 : Tab-based Content
          ────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'Viewer' ? (
          <motion.div
            key="viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              top: NAV_H,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'grid',
              gridTemplateColumns: '220px 1fr 320px',
              gridTemplateRows: '1fr auto',
              padding: `1rem ${SIDE_PAD} 1rem ${SIDE_PAD}`,
              gap: '1rem',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {/* ── LEFT COLUMN : Virus selector ── */}
            <div style={{
              gridColumn: '1', gridRow: '1',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              pointerEvents: 'auto', overflow: 'hidden',
            }}>
              <VirusDrawer viruses={viruses} selectedIdx={selectedIdx} onSelect={setSelectedIdx} />
            </div>

            <div style={{
              gridColumn: '2', gridRow: '1 / 3',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-end', alignItems: 'center',
              paddingBottom: '2.5rem',
              textAlign: 'center',
              pointerEvents: 'none',
            }}>
              <AnimatePresence mode="wait">
                <HeroLabel key={selectedVirus.id} virus={selectedVirus} />
              </AnimatePresence>
            </div>

            {/* ── RIGHT COLUMN : Info panel + Controls panel ── */}
            <div style={{
              gridColumn: '3', gridRow: '1',
              display: 'flex', flexDirection: 'column',
              gap: '0.75rem', overflowY: 'auto',
              pointerEvents: 'auto',
              maxHeight: '100%',
            }}>
              <InfoPanel virus={selectedVirus} sequence={sequence} mutationCount={mutationCount} />
              <ControlsPanel
                mutationRate={mutationRate} setMutationRate={setMutationRate}
                speed={speed} setSpeed={setSpeed}
                showShell={showShell} setShowShell={setShowShell}
                rnaVisible={rnaVisible} setRnaVisible={setRnaVisible}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              top: NAV_H,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              display: 'flex',
              padding: `2rem ${SIDE_PAD}`,
              justifyContent: 'center',
              overflowY: 'auto'
            }}
          >
            <AnalysisDashboard 
              virus={selectedVirus} 
              sequence={sequence} 
              mutationCount={mutationCount} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
