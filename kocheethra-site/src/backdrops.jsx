import React, { useState } from 'react';

const BASE = import.meta.env.BASE_URL;
const uri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

/* Faint ruled grid, used as a texture behind dark sections */
export const gridBackdrop = (stroke = 'rgba(255,255,255,0.07)') => {
  let g = '';
  for (let y = 0; y <= 900; y += 60) g += `<path d="M0 ${y}H1600"/>`;
  for (let x = 0; x <= 1600; x += 60) g += `<path d="M${x} 0V900"/>`;
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" fill="none" stroke="${stroke}" stroke-width="1">${g}</svg>`);
};

/* Dotted texture for light sections */
export const dotsBackdrop = (fill = 'rgba(55,48,184,0.14)') =>
  uri(`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><circle cx="2" cy="2" r="1.6" fill="${fill}"/></svg>`);

/* Illustration: statement, calculator and coins (faceless financial scene) */
export const deskScene = () => {
  const ink = '#110d47';
  const green = '#14b866';
  const soft = '#c9ccf5';
  const royal = '#3730b8';
  let rows = '';
  for (let i = 0; i < 6; i++) {
    const y = 330 + i * 30;
    rows += `<path d="M135 ${y}H375" stroke="${soft}" stroke-width="1.5"/><path d="M318 ${y - 12}H358" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/><path d="M150 ${y - 12}H${200 + (i % 3) * 25}" stroke="${soft}" stroke-width="3" stroke-linecap="round"/>`;
  }
  const bars = [30, 48, 40, 72]
    .map((h, i) => `<rect x="${142 + i * 52}" y="${290 - h}" width="34" height="${h}" rx="3" fill="${i === 3 ? green : '#dfe2ff'}" stroke="${ink}" stroke-width="1.5"/>`)
    .join('');
  let keys = '';
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      const last = r === 3 && c === 2;
      keys += `<rect x="${474 + c * 64}" y="${236 + r * 52}" width="52" height="40" rx="8" fill="${last ? green : '#4a43d6'}"/>`;
    }
  }
  let coins = '';
  for (let i = 0; i < 4; i++) {
    const cy = 520 - i * 16;
    coins += `<path d="M556 ${cy}v14a54 14 0 0 0 108 0v-14" fill="#fff" stroke="${ink}" stroke-width="2"/><ellipse cx="610" cy="${cy}" rx="54" ry="14" fill="${i === 3 ? '#8ff0bd' : '#fff'}" stroke="${ink}" stroke-width="2"/>`;
  }
  return uri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eff1ff"/><stop offset="1" stop-color="#e2f8ec"/></linearGradient></defs><rect width="800" height="560" fill="url(#bg)"/>` +
      `<circle cx="690" cy="90" r="90" fill="${royal}" opacity=".08"/><circle cx="90" cy="500" r="110" fill="${green}" opacity=".1"/>` +
      `<g transform="rotate(-5 240 340)"><rect x="95" y="95" width="290" height="390" rx="8" fill="#fff" stroke="${soft}" stroke-width="2"/></g>` +
      `<rect x="110" y="110" width="290" height="390" rx="8" fill="#fff" stroke="${ink}" stroke-width="2"/>` +
      `<path d="M135 150H270" stroke="${ink}" stroke-width="5" stroke-linecap="round"/><path d="M135 172H210" stroke="${soft}" stroke-width="3" stroke-linecap="round"/>` +
      bars + `<path d="M135 290H375" stroke="${ink}" stroke-width="1.5"/>` + rows + `<path d="M305 318V490" stroke="${soft}" stroke-width="1.5"/>` +
      `<rect x="450" y="130" width="230" height="330" rx="20" fill="${ink}"/>` +
      `<rect x="472" y="152" width="186" height="60" rx="10" fill="#e9f1ff"/><path d="M520 188H640" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>` +
      keys + coins +
      `<circle cx="396" cy="118" r="26" fill="${green}"/><path d="M384 118l9 9 17-18" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  );
};

/* Absolutely-positioned backdrop. An optional photo (public/images/<photo>) is layered underneath
   when the file exists; if it is missing nothing is shown. */
export const Backdrop = ({ art, photo, photoClass = 'opacity-20', size = 'cover', repeat = 'no-repeat', position = 'center' }) => {
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      {photo && photoOk && (
        <img
          src={`${BASE}images/${photo}`}
          alt=""
          onError={() => setPhotoOk(false)}
          className={`absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity ${photoClass}`}
        />
      )}
      {art && (
        <div className="absolute inset-0" style={{ backgroundImage: `url("${art}")`, backgroundSize: size, backgroundPosition: position, backgroundRepeat: repeat }} />
      )}
    </div>
  );
};
