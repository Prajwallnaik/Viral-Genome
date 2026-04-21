// Virus SVG Logo — stylized coronavirus particle icon
// Embedded inline for zero network requests and perfect sharpness
export default function VirusLogo({ size = 32, color = '#00e5ff', glow = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={glow ? { filter: `drop-shadow(0 0 8px ${color}99)` } : undefined}
    >
      {/* Envelope sphere */}
      <circle cx="50" cy="50" r="24" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2.5" />

      {/* 12 spike proteins radially distributed */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI;
        const innerR = 24;
        const outerStem = 36;
        const outerHead = 42;
        const x1 = 50 + innerR * Math.cos(angle);
        const y1 = 50 + innerR * Math.sin(angle);
        const x2 = 50 + outerStem * Math.cos(angle);
        const y2 = 50 + outerStem * Math.sin(angle);
        const hx = 50 + outerHead * Math.cos(angle);
        const hy = 50 + outerHead * Math.sin(angle);
        return (
          <g key={i}>
            {/* Stem */}
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" />
            {/* Head */}
            <circle cx={hx} cy={hy} r="5" fill={color} fillOpacity="0.9" />
          </g>
        );
      })}

      {/* Inner RNA coil hint */}
      <circle cx="50" cy="50" r="12" fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="6" fill={color} fillOpacity="0.35" />
    </svg>
  );
}
