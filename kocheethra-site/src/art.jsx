import React from 'react';
import { Icon } from './Icon.jsx';
import { useScrollReveal } from './hooks.js';

/* Curved section edge */
export const Wave = ({ fill = '#fff', position = 'bottom' }) => (
  <svg
    viewBox="0 0 1440 90"
    preserveAspectRatio="none"
    aria-hidden="true"
    className={`absolute left-0 w-full h-12 sm:h-20 block pointer-events-none ${position === 'bottom' ? 'bottom-0 -mb-px' : 'top-0 -mt-px rotate-180'}`}
    fill={fill}
  >
    <path d="M0,40 C180,92 380,4 620,32 C860,60 1040,100 1260,52 C1360,30 1420,28 1440,34 V90 H0Z" />
  </svg>
);

/* Hero: an animated financial dashboard with floating status chips */
export const HeroVisual = () => {
  const heights = [44, 66, 54, 84, 104, 90, 126, 150];
  const pts = heights.map((h, i) => [26 + i * 44, 186 - h - 22]);
  return (
    <div className="relative w-full max-w-[460px] mx-auto art-anim play">
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-leaf/25 via-sky/20 to-transparent blur-3xl" />
      <div className="relative rounded-[2rem] bg-white/10 border border-white/20 backdrop-blur-md p-6 shadow-2xl shadow-ink-900/40">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-indigo-200">Financial overview</p>
            <p className="font-serif text-xl text-white">Growth &amp; compliance</p>
          </div>
          <span className="w-11 h-11 rounded-2xl bg-leaf grid place-items-center text-white shadow-lg shadow-leaf/40">
            <Icon name="pie" size={22} />
          </span>
        </div>
        <svg viewBox="0 0 370 200" className="w-full" role="img" aria-label="Rising bar chart">
          <defs>
            <linearGradient id="gBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8ff0bd" />
              <stop offset="1" stopColor="#14b866" stopOpacity=".55" />
            </linearGradient>
          </defs>
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="0" x2="370" y1={y} y2={y} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 5" />
          ))}
          {heights.map((h, i) => (
            <rect key={i} className="bar" style={{ animationDelay: `${i * 90}ms` }} x={12 + i * 44} y={186 - h} width="28" height={h} rx="6" fill="url(#gBar)" />
          ))}
          <polyline className="draw" pathLength="1" points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map(([x, y], i) => (
            <circle key={i} className="dot" style={{ animationDelay: `${1100 + i * 140}ms` }} cx={x} cy={y} r="5" fill="#110d47" stroke="#fff" strokeWidth="2.5" />
          ))}
        </svg>
        <div className="flex gap-2 mt-4 flex-wrap">
          {['GST', 'Income Tax', 'E-Way Bill', 'DSC'].map((t) => (
            <span key={t} className="text-[11px] font-medium tracking-wide text-white/90 bg-white/10 border border-white/15 rounded-full px-3 py-1">{t}</span>
          ))}
        </div>
      </div>

      <div className="absolute -left-4 sm:-left-12 top-[44%] animate-float">
        <div className="flex items-center gap-3 bg-white rounded-2xl shadow-xl shadow-ink/30 px-4 py-3">
          <span className="w-9 h-9 rounded-xl bg-leaf/15 text-leaf-dark grid place-items-center"><Icon name="check" size={18} stroke={2.4} /></span>
          <span className="text-sm font-semibold text-ink">GST return filed</span>
        </div>
      </div>
      <div className="absolute -right-3 sm:-right-8 -bottom-12 animate-float-slow">
        <div className="flex items-center gap-3 bg-white rounded-2xl shadow-xl shadow-ink/30 px-4 py-3">
          <span className="w-9 h-9 rounded-xl bg-royal/10 text-royal grid place-items-center"><Icon name="truck" size={18} /></span>
          <span className="text-sm font-semibold text-ink">E-Way Bill generated</span>
        </div>
      </div>
    </div>
  );
};

/* Training: bars climbing like steps */
export const StairsArt = () => {
  const { ref, isVisible } = useScrollReveal(0.25);
  const steps = [70, 110, 150, 190, 230];
  return (
    <div ref={ref} className={`art-anim ${isVisible ? 'play' : ''} relative w-full max-w-sm mx-auto`}>
      <svg viewBox="0 0 400 320" className="w-full" role="img" aria-label="Steps rising towards a goal">
        <defs>
          <linearGradient id="gStep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8ff0bd" />
            <stop offset="1" stopColor="#7c86ff" stopOpacity=".45" />
          </linearGradient>
        </defs>
        {steps.map((h, i) => (
          <rect key={i} className="bar" style={{ animationDelay: `${i * 140}ms` }} x={20 + i * 74} y={290 - h} width="62" height={h} rx="10" fill="url(#gStep)" />
        ))}
        <polyline className="draw" pathLength="1" points="40,250 114,205 188,165 262,125 336,70" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="1" strokeLinecap="round" />
        <g className="dot" style={{ animationDelay: '1700ms' }}>
          <circle cx="352" cy="52" r="26" fill="#14b866" />
          <path d="M340 52l9 9 16-18" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <path d="M10 292H390" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
      </svg>
    </div>
  );
};

/* Rotating text badge */
export const RotatingBadge = () => (
  <div className="relative w-32 h-32 text-royal">
    <div className="absolute inset-0 rounded-full bg-white shadow-xl" />
    <svg viewBox="0 0 120 120" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
      <defs>
        <path id="badgeCircle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
      </defs>
      <text fontSize="9.5" fontWeight="600" fill="currentColor" textLength="280" lengthAdjust="spacing">
        <textPath href="#badgeCircle">YEARS OF TRUSTED EXPERTISE • TAX &amp; FINANCE •</textPath>
      </text>
    </svg>
    <div className="absolute inset-0 grid place-items-center">
      <span className="font-serif text-3xl font-semibold text-ink">25+</span>
    </div>
  </div>
);
