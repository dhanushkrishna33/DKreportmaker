import React from 'react';

export const AlietLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 130 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer border rings */}
      <circle cx="100" cy="100" r="96" fill="#ffffff" stroke="#1d2d5b" strokeWidth="3.5" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#1d2d5b" strokeWidth="1.5" />

      {/* Circular text path for college name */}
      <defs>
        <path
          id="textCircleOuter"
          d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
        />
        <path
          id="textCircleInner"
          d="M 100,100 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
        />
        <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9933" />
          <stop offset="70%" stopColor="#f37021" />
          <stop offset="100%" stopColor="#d34e00" />
        </radialGradient>
        <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#70d6ff" />
          <stop offset="50%" stopColor="#00a8e8" />
          <stop offset="100%" stopColor="#007ea7" />
        </linearGradient>
      </defs>

      {/* Outer text: ANDHRA LOYOLA INSTITUTE OF ENGINEERING AND TECHNOLOGY */}
      <text fill="#1d2d5b" fontSize="7.8" fontWeight="bold" letterSpacing="0.8px" fontFamily="'Arial', sans-serif">
        <textPath href="#textCircleOuter" startOffset="50%" textAnchor="middle">
          ★ ANDHRA LOYOLA INSTITUTE OF ENGINEERING AND TECHNOLOGY ★
        </textPath>
      </text>

      {/* Inner circular separator */}
      <circle cx="100" cy="100" r="68" fill="#f8fafc" stroke="#2563eb" strokeWidth="1.5" />

      {/* Motto: FAITH EXCELLENCE SERVICE */}
      <text x="100" y="44" textAnchor="middle" fill="#d946ef" fontSize="7" fontWeight="900" fontFamily="'Arial Black', sans-serif" letterSpacing="1px">
        FAITH
      </text>
      <text x="100" y="53" textAnchor="middle" fill="#0284c7" fontSize="6.5" fontWeight="900" fontFamily="'Arial Black', sans-serif" letterSpacing="1px">
        EXCELLENCE
      </text>
      <text x="100" y="62" textAnchor="middle" fill="#16a34a" fontSize="6.5" fontWeight="900" fontFamily="'Arial Black', sans-serif" letterSpacing="1px">
        SERVICE
      </text>

      {/* 4-pointed Star */}
      <path
        d="M 64,36 Q 67,46 75,47 Q 67,48 64,58 Q 62,48 53,47 Q 62,46 64,36 Z"
        fill="#e11d48"
      />

      {/* Orange oval base / platform */}
      <ellipse cx="100" cy="132" rx="44" ry="17" fill="url(#orangeGlow)" stroke="#c2410c" strokeWidth="1" />

      {/* 5 Diamond / Flame crystals */}
      {/* Center highest crystal */}
      <polygon points="100,72 108,104 100,136 92,104" fill="url(#diamondGrad)" stroke="#0369a1" strokeWidth="1.2" />
      <line x1="100" y1="72" x2="100" y2="136" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />

      {/* Inner Left crystal */}
      <polygon points="86,88 94,112 86,134 78,112" fill="url(#diamondGrad)" stroke="#0369a1" strokeWidth="1" />
      <line x1="86" y1="88" x2="86" y2="134" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />

      {/* Inner Right crystal */}
      <polygon points="114,88 122,112 114,134 106,112" fill="url(#diamondGrad)" stroke="#0369a1" strokeWidth="1" />
      <line x1="114" y1="88" x2="114" y2="134" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />

      {/* Outer Left small crystal */}
      <polygon points="74,106 81,122 74,138 67,122" fill="url(#diamondGrad)" stroke="#0369a1" strokeWidth="0.8" />

      {/* Outer Right small crystal */}
      <polygon points="126,106 133,122 126,138 119,122" fill="url(#diamondGrad)" stroke="#0369a1" strokeWidth="0.8" />
    </svg>
  );
};
