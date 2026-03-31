function ChainLink({ cy }) {
  return (
    <g>
      <circle cx="0" cy={cy} r="20" fill="#1a1008" stroke="#000000" strokeWidth="2.5" />
      <circle cx="0" cy={cy} r="16" fill="#957244" stroke="#000000" strokeWidth="1.5" />
      <circle cx="0" cy={cy} r="9"  fill="#1a1008" stroke="#000000" strokeWidth="1.5" />
    </g>
  );
}

/**
 * The Final Chain Component
 * @param {number} linkCount - Number of circular links to render
 * @param {number} linkSpacing - Vertical distance between link centers
 * @param {object} style - Custom CSS for positioning (e.g., top, left, position)
 */
export default function Chain({
  linkCount   = 5,
  linkSpacing = 76,
  style       = {},
}) {
  const firstLink = 80;
  const lastLink  = firstLink + (linkCount - 1) * linkSpacing;
  const totalH    = lastLink + 70; // Padding for the base

  return (
    <svg
      width="60"
      height={totalH}
      viewBox={`-20 0 40 ${totalH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        overflow: 'visible',
        ...style
      }}
    >
      {/* Top Mounting Cap */}
      <rect 
        x="-10" y="2" width="20" height="18" rx="2"
        fill="#2a1c08" stroke="#000000" strokeWidth="2" 
      />

      {/* Central Rod - Amber/Tan with black borders */}
      <rect 
        x="-9.5" y="18" width="20" height={lastLink + 20} rx="0"
        fill="#957244" stroke="#000000" strokeWidth="7" 
      />

      {/* Individual Links */}
      {Array.from({ length: linkCount }, (_, i) => (
        <ChainLink key={i} cy={firstLink + i * linkSpacing} />
      ))}

      {/* Decorative Base */}
      <g transform={`translate(0, ${lastLink + 45})`}>
        <rect 
          x="-20" y="0" width="40" height="10" rx="3"
          fill="#2a1c08" stroke="#000000" strokeWidth="2" 
        />
        <rect 
          x="-14" y="10" width="28" height="5" rx="2"
          fill="#1a1008" stroke="#000000" strokeWidth="1.5" 
        />
      </g>
    </svg>
  );
}