# Kocheethra Associates – Website

React + Vite + Tailwind single-page site (IBM Plex Serif / Sans; indigo + green palette that complements the logo).

## Run locally
    npm install
    npm run dev          # http://localhost:5173
    npm run build        # production files in dist/

## Deploy
Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, or cPanel `public_html`). Paths are relative, so any folder works.

## Edit content
- `src/data.js` – phone numbers, emails, services, clients, "why us", process steps, FAQs
- `src/App.jsx` – page text and layout
- `index.html` – SEO title/description and business structured data

## Images
- `public/logo.jpg` – main logo (included)
- `public/images/vinod-mathew.jpg` – **photo of Mr. Vinod Mathew** (portrait, about 4:5). Until it is added,
  the About section shows a "VM" placeholder in the same spot.
- `public/assoc-logo.png` – optional association logo, shown in the footer if present
- Optional faceless background photos: `public/images/hero.jpg`, `why.jpg`, `training.jpg`
  (shown faintly in greyscale under the graphics when the file exists)

## Enquiry form
Default: opens a pre-filled WhatsApp chat to the first phone number.
For email delivery: create a form at formspree.io or web3forms.com, copy `.env.example` to `.env`,
set `VITE_FORM_ENDPOINT=<your endpoint URL>`, then rebuild.

## GST calculator
Quick-pick rates are 0%, 3%, 5%, 18% and 40% plus a custom field. Edit `RATES` in `src/App.jsx` if the
slabs change.
