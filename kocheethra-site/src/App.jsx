import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon.jsx';
import { useScrollReveal } from './hooks.js';
import { Backdrop, gridBackdrop, dotsBackdrop, deskScene } from './backdrops.jsx';
import { Wave, HeroVisual, StairsArt, RotatingBadge } from './art.jsx';
import { CONTACT_INFO, NAV, SERVICES, WHY_US, PROCESS, FAQS, SERVICE_LABELS } from './data.js';

const BASE = import.meta.env.BASE_URL;
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const GRID_ART = gridBackdrop();
const DOTS_ART = dotsBackdrop();
const DESK_ART = deskScene();

const COLORS = { cream: '#fbfaf6', mist: '#eff1ff', white: '#ffffff', ink: '#0b0833' };

/* ---------- helpers ---------- */

const Reveal = ({ children, delay = 0, from = 'up', className = '' }) => {
  const { ref, isVisible } = useScrollReveal();
  const variant = from === 'left' ? 'reveal-left' : from === 'right' ? 'reveal-right' : from === 'zoom' ? 'reveal-zoom' : '';
  return (
    <div ref={ref} className={`reveal ${variant} ${isVisible ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const AnimatedCounter = ({ end, suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  useEffect(() => {
    if (!isVisible) return;
    let start = null;
    let frame;
    const tick = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

const Rotator = ({ words }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return <span key={i} className="inline-block animate-wordin text-mint">{words[i]}</span>;
};

const Logo = ({ className = '' }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={`font-serif font-semibold tracking-wide text-ink ${className}`}>
        KOCHEETHRA <span className="text-leaf-dark">ASSOCIATES</span>
      </span>
    );
  }
  return <img src={`${BASE}company-logo.png`} alt="Kocheethra Associates" onError={() => setFailed(true)} className={`w-auto object-contain ${className}`} />;
};

const AssocLogo = () => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img src={`${BASE}assoc-logo.png`} alt="Association membership" onError={() => setFailed(true)} className="h-14 w-auto object-contain bg-white rounded-xl p-2" />;
};

const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-5 sm:px-8 ${className}`}>{children}</div>
);

const Eyebrow = ({ children, light = false, center = false }) => (
  <p className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${light ? 'text-mint' : 'text-leaf-dark'} ${center ? 'justify-center' : ''}`}>
    <span className={`h-0.5 w-8 rounded-full ${light ? 'bg-mint' : 'bg-leaf'}`} /> {children}
  </p>
);

const Heading = ({ children, light = false, className = '' }) => (
  <h2 className={`font-serif font-medium leading-[1.15] text-3xl md:text-[2.6rem] ${light ? 'text-white' : 'text-ink'} ${className}`}>{children}</h2>
);

const goTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

/* ---------- header ---------- */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled || isOpen ? 'bg-white/90 backdrop-blur-lg shadow-[0_8px_30px_-12px_rgba(17,13,71,.25)]' : 'bg-transparent'}`}>
      <div className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-royal via-sky to-leaf transition-[width] duration-150" style={{ width: `${progress}%` }} />
      <Container>
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-[68px]' : 'h-[84px]'}`}>
          <a href="#home" className="flex items-center" aria-label="Kocheethra Associates – home">
            <span className="bg-white rounded-xl px-2.5 py-1.5 shadow-md shadow-ink/10 ring-1 ring-black/5">
              <Logo className="h-9" />
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
            {NAV.map((link) => {
              const on = active === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium py-2 transition-colors ${scrolled ? (on ? 'text-royal' : 'text-slate-600 hover:text-royal') : on ? 'text-white' : 'text-white/75 hover:text-white'}`}
                >
                  {link.name}
                  <span className={`absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-leaf transition-all duration-300 ${on ? 'w-full' : 'w-0'}`} />
                </a>
              );
            })}
            <a href="#contact" className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-leaf to-leaf-dark text-white text-sm font-semibold px-6 py-2.5 shadow-lg shadow-leaf/30 hover:-translate-y-0.5 transition-transform">
              Book a Consultation
            </a>
          </nav>

          <button aria-label="Toggle menu" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className={`lg:hidden p-2 -mr-2 rounded-lg ${scrolled || isOpen ? 'text-ink' : 'text-white'}`}>
            <Icon name={isOpen ? 'close' : 'menu'} size={26} stroke={1.8} />
          </button>
        </div>
      </Container>
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[26rem] border-t border-royal/10' : 'max-h-0'}`}>
        <Container className="py-3">
          {NAV.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block py-3 text-base font-medium text-ink border-b border-royal/10 last:border-0">
              {link.name}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
};

/* ---------- hero ---------- */

const Hero = () => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const shift = (n) => ({ transform: `translate3d(calc(var(--mx, 0) * ${n}px), calc(var(--my, 0) * ${n}px), 0)` });

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="relative bg-gradient-to-br from-ink via-[#231c8f] to-royal bg-pan text-white overflow-hidden pt-36 pb-40 lg:pt-44 lg:pb-48">
      <Backdrop art={GRID_ART} photo="hero.jpg" photoClass="opacity-15" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-sky/25 blur-3xl transition-transform duration-300 ease-out" style={shift(-30)} />
        <div className="absolute bottom-0 right-[8%] w-[26rem] h-[26rem] rounded-full bg-leaf/20 blur-3xl transition-transform duration-300 ease-out" style={shift(40)} />
        <span className="absolute -right-6 top-24 font-serif font-semibold text-[22rem] leading-none text-transparent select-none transition-transform duration-300 ease-out hidden lg:block" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.09)', ...shift(-18) }}>₹</span>
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <Reveal delay={90}>
              <h1 className="font-serif font-medium text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.1] mb-5">
                Trusted Tax &amp; Financial Expertise for Over 25 Years.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-xl font-serif text-white/90 mb-5 h-8">
                Expert help with <Rotator words={['GST filing', 'Income tax', 'E-Way Bills', 'Digital signatures', 'Financial consulting']} />
              </p>
            </Reveal>
            <Reveal delay={230}>
              <p className="text-lg text-indigo-100/90 leading-relaxed mb-10 max-w-xl">
                KOCHEETHRA ASSOCIATES provides professional GST, income tax, accounting, digital signature, E-Way Bill and financial consulting services for individuals and businesses.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-leaf to-leaf-dark text-white font-semibold px-8 py-4 shadow-xl shadow-leaf/30 hover:-translate-y-1 transition-transform">
                  Get in Touch <Icon name="arrow" size={18} />
                </a>
                <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 text-white font-medium px-8 py-4 hover:bg-white/10 hover:border-white/60 transition-colors">
                  Explore Services
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal from="zoom" delay={200} className="lg:col-span-5">
            <div className="transition-transform duration-300 ease-out" style={shift(14)}>
              <HeroVisual />
            </div>
          </Reveal>
        </div>
      </Container>
      <Wave fill={COLORS.cream} />
    </section>
  );
};

const Stats = () => {
  const stats = [
    { number: 25, suffix: '+', label: 'Years of experience', icon: 'award' },
    { number: 1000, suffix: '+', label: 'Tax returns & filings', icon: 'file' },
    { text: 'Professional', label: 'Tax & GST support', icon: 'shield' },
    { text: 'Trusted', label: 'By businesses & individuals', icon: 'checkCircle' },
  ];
  return (
    <section className="relative z-20 -mt-24 sm:-mt-28 pb-6 bg-cream">
      <Container>
        <Reveal>
          <div className="bg-white rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(17,13,71,.45)] ring-1 ring-royal/10 grid grid-cols-2 lg:grid-cols-4 p-3 -translate-y-6">
            {stats.map((s, i) => (
              <div key={i} className="group flex flex-col items-center text-center px-4 py-7 rounded-3xl transition-colors hover:bg-mist">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-royal to-sky text-white grid place-items-center mb-4 shadow-lg shadow-royal/25 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                  <Icon name={s.icon} size={22} />
                </span>
                <div className="font-serif text-3xl md:text-4xl text-ink mb-1">{s.text ? s.text : <AnimatedCounter end={s.number} suffix={s.suffix} />}</div>
                <div className="text-xs uppercase tracking-wider text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

/* ---------- about ---------- */

const Portrait = () => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative max-w-md mx-auto lg:mx-0">
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-royal/20 via-sky/20 to-leaf/25 rotate-3" />
      <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full" style={{ backgroundImage: `url("${DOTS_ART}")` }} aria-hidden="true" />
      {/* Photo of Mr. Vinod Mathew: save as public/images/vinod-mathew.jpg (portrait, roughly 4:5) */}
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-ink via-royal-dark to-royal shadow-2xl shadow-ink/30">
        {!failed ? (
          <img src={`${BASE}images/vinod-mathew.jpg`} alt="Mr. Vinod Mathew" onError={() => setFailed(true)} className="absolute inset-0 w-full h-full object-cover object-top" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url("${GRID_ART}")`, backgroundSize: 'cover' }} />
            <span className="relative w-36 h-36 rounded-full border border-white/30 bg-white/10 grid place-items-center font-serif text-5xl text-white/90 tracking-wider">VM</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>
      <div className="absolute -bottom-7 -right-3 sm:-right-8 bg-white rounded-2xl shadow-xl shadow-ink/20 px-6 py-4 ring-1 ring-royal/10 max-w-[16rem]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-leaf-dark font-semibold mb-0.5">Head of the firm</p>
        <p className="font-serif text-lg text-ink leading-tight">Mr. Vinod Mathew</p>
        <p className="text-xs text-slate-500 mt-1 leading-snug">25+ years in taxation, GST &amp; financial consulting</p>
      </div>
      <div className="absolute -top-8 -right-2 sm:-right-8 animate-float">
        <RotatingBadge />
      </div>
    </div>
  );
};

const About = () => (
  <section id="about" className="relative bg-cream pt-16 pb-36 lg:pb-44 overflow-hidden">
    <Container>
      <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
        <Reveal from="left"><Portrait /></Reveal>
        <div>
          <Reveal>
            <Eyebrow>About us</Eyebrow>
            <Heading className="mb-7">Practical, dependable and professional support.</Heading>
          </Reveal>
          <Reveal delay={90}>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[17px] mb-9">
              <p className="text-ink font-medium">
                KOCHEETHRA ASSOCIATES is a professional taxation, accounting and financial consulting firm serving individuals and businesses in and around Kottayam and Changanacherry.
              </p>
              <p>With more than 25 years of experience, the firm specializes in GST, income tax, daybook preparation, ledger maintenance, accounting software support, E-Way Bill, digital signature services, and comprehensive financial consulting.</p>
              <p>We focus on providing practical and dependable support to both businesses and individuals, ensuring compliance and peace of mind in complex financial landscapes.</p>
            </div>
          </Reveal>
          <Reveal delay={170}>
            <div className="flex flex-wrap gap-3">
              {['Local expertise', 'Taxation services', 'Individual support', 'Business consulting'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-royal/15 px-4 py-2.5 text-sm font-medium text-ink shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:ring-leaf/50 transition">
                  <span className="w-5 h-5 rounded-full bg-leaf text-white grid place-items-center"><Icon name="check" size={12} stroke={3} /></span> {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Container>
    <Wave fill={COLORS.mist} />
  </section>
);

/* ---------- services ---------- */

const ServiceCard = ({ service, onEnquire }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative h-full overflow-hidden rounded-[1.75rem] bg-white p-8 ring-1 ring-royal/10 shadow-[0_14px_40px_-22px_rgba(17,13,71,.4)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_rgba(55,48,184,.55)] hover:ring-royal/30"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(380px circle at var(--x,50%) var(--y,50%), rgba(124,134,255,.16), transparent 45%)' }} />
      <div className="relative flex flex-col h-full">
        <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal to-sky text-white grid place-items-center mb-6 shadow-lg shadow-royal/30 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
          <Icon name={service.icon} size={26} stroke={1.5} />
        </span>
        <h3 className="font-serif text-[1.35rem] text-ink mb-3">{service.title}</h3>
        <p className="text-slate-600 leading-relaxed mb-5 flex-grow">{service.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {service.features.map((f) => (
            <span key={f} className="rounded-full bg-mist text-royal text-xs font-medium px-3 py-1">{f}</span>
          ))}
        </div>
        <button onClick={() => onEnquire(service.key)} className="inline-flex items-center gap-2 self-start text-sm font-semibold text-royal group-hover:gap-3 transition-all">
          Enquire about this <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
};

const Services = ({ onEnquire }) => (
  <section id="services" className="relative bg-mist pt-12 pb-40 lg:pb-48" style={{ backgroundImage: `url("${DOTS_ART}")` }}>
    <Container>
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Eyebrow center>Core services</Eyebrow>
          <Heading className="mb-5">Comprehensive financial solutions</Heading>
          <p className="text-slate-600 text-lg leading-relaxed">Expert assistance for businesses and individuals, ensuring seamless compliance and strategic financial management.</p>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {SERVICES.map((s, idx) => (
          <Reveal key={s.id} delay={(idx % 3) * 90} className={idx % 3 === 1 ? 'lg:mt-10' : ''}>
            <ServiceCard service={s} onEnquire={onEnquire} />
          </Reveal>
        ))}
      </div>
    </Container>
    <Wave fill="#2a2398" />
  </section>
);

/* ---------- GST calculator ---------- */

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
const RATES = [0, 3, 5, 18, 40];

const GstCalculator = () => {
  const [amount, setAmount] = useState('10000');
  const [rate, setRate] = useState(18);
  const [custom, setCustom] = useState('');
  const [mode, setMode] = useState('add');
  const [inter, setInter] = useState(false);

  const amt = parseFloat(String(amount).replace(/,/g, '')) || 0;
  const r = custom !== '' ? Math.min(Math.max(parseFloat(custom) || 0, 0), 100) : rate;
  const base = mode === 'add' ? amt : amt / (1 + r / 100);
  const gst = mode === 'add' ? (amt * r) / 100 : amt - base;
  const total = base + gst;
  const pct = total > 0 ? (gst / total) * 100 : 0;

  const seg = (on) => `flex-1 rounded-full py-2.5 text-sm font-semibold transition-all ${on ? 'bg-royal text-white shadow-md shadow-royal/30' : 'text-slate-600 hover:text-royal'}`;

  return (
    <section id="calculator" className="relative bg-gradient-to-br from-[#2a2398] via-royal to-ink text-white pt-28 pb-40 overflow-hidden">
      <Backdrop art={GRID_ART} />
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal from="left">
            <Eyebrow light>Free tool</Eyebrow>
            <Heading light className="mb-5">GST calculator</Heading>
            <p className="text-indigo-100/90 text-lg leading-relaxed mb-8 max-w-md">
              Quickly add GST to a price, or work out the GST inside a GST-inclusive amount. For anything more involved, our team is a call away.
            </p>
            <div className="animate-float rounded-[2rem] overflow-hidden shadow-2xl shadow-ink-900/50 ring-1 ring-white/20 max-w-md">
              <div className="aspect-[10/7] bg-cover bg-center" style={{ backgroundImage: `url("${DESK_ART}")` }} role="img" aria-label="Statement, calculator and coins illustration" />
            </div>
          </Reveal>

          <Reveal from="right" delay={100}>
            <div className="bg-white text-slate-700 rounded-[2rem] p-7 sm:p-9 shadow-2xl shadow-ink-900/50">
              <div className="flex bg-mist rounded-full p-1 mb-6">
                <button className={seg(mode === 'add')} onClick={() => setMode('add')}>Add GST</button>
                <button className={seg(mode === 'remove')} onClick={() => setMode('remove')}>Remove GST</button>
              </div>

              <label htmlFor="calc-amount" className="block text-sm font-medium text-ink mb-1.5">{mode === 'add' ? 'Amount (excluding GST)' : 'Amount (including GST)'}</label>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input id="calc-amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ''))} className="w-full rounded-2xl border border-royal/15 bg-mist/60 pl-9 pr-4 py-3.5 text-lg font-medium text-ink focus:outline-none focus:ring-2 focus:ring-royal/40 focus:bg-white" />
              </div>

              <p className="text-sm font-medium text-ink mb-2">GST rate</p>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {RATES.map((x) => (
                  <button key={x} onClick={() => { setRate(x); setCustom(''); }} className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${custom === '' && rate === x ? 'bg-leaf text-white shadow-md shadow-leaf/30' : 'bg-mist text-royal hover:bg-royal/10'}`}>{x}%</button>
                ))}
                <div className="relative">
                  <input type="number" min="0" max="100" step="0.01" placeholder="Custom" value={custom} onChange={(e) => setCustom(e.target.value)} aria-label="Custom GST rate" className={`w-24 rounded-full px-4 py-2 pr-7 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-royal/40 ${custom !== '' ? 'bg-leaf text-white placeholder:text-white/70' : 'bg-mist text-royal'}`} />
                  {custom !== '' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white">%</span>}
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-600 mb-6 cursor-pointer select-none">
                <input type="checkbox" checked={inter} onChange={(e) => setInter(e.target.checked)} className="w-4 h-4 accent-royal" />
                Inter-state supply (show IGST instead of CGST + SGST)
              </label>

              <div className="rounded-2xl bg-gradient-to-br from-ink to-royal text-white p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-indigo-200 mb-1">Total amount</p>
                <p className="font-serif text-3xl sm:text-4xl mb-5">{inr.format(total)}</p>
                <div className="h-2.5 rounded-full bg-white/20 overflow-hidden flex mb-5" aria-hidden="true">
                  <div className="bg-sky transition-all duration-500" style={{ width: `${100 - pct}%` }} />
                  <div className="bg-leaf transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><dt className="flex items-center gap-2 text-indigo-100"><span className="w-2.5 h-2.5 rounded-full bg-sky" />Taxable value</dt><dd className="font-semibold">{inr.format(base)}</dd></div>
                  {inter ? (
                    <div className="flex justify-between"><dt className="flex items-center gap-2 text-indigo-100"><span className="w-2.5 h-2.5 rounded-full bg-leaf" />IGST @ {r}%</dt><dd className="font-semibold">{inr.format(gst)}</dd></div>
                  ) : (
                    <>
                      <div className="flex justify-between"><dt className="flex items-center gap-2 text-indigo-100"><span className="w-2.5 h-2.5 rounded-full bg-leaf" />CGST @ {r / 2}%</dt><dd className="font-semibold">{inr.format(gst / 2)}</dd></div>
                      <div className="flex justify-between"><dt className="flex items-center gap-2 text-indigo-100"><span className="w-2.5 h-2.5 rounded-full bg-leaf" />SGST @ {r / 2}%</dt><dd className="font-semibold">{inr.format(gst / 2)}</dd></div>
                    </>
                  )}
                </dl>
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed">Indicative only. The applicable rate depends on the goods or service (HSN/SAC). Contact us to confirm the right rate for your business.</p>
            </div>
          </Reveal>
        </div>
      </Container>
      <Wave fill={COLORS.white} />
    </section>
  );
};

/* ---------- process ---------- */

const Process = () => (
  <section className="relative bg-white pt-8 pb-28">
    <Container>
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Eyebrow center>How we work</Eyebrow>
          <Heading>Simple, clear and dependable</Heading>
        </div>
      </Reveal>
      <Reveal>
        <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
          <div aria-hidden="true" className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-1 rounded-full bg-royal/10 overflow-hidden">
            <div className="line-grow h-full w-full rounded-full bg-gradient-to-r from-royal via-sky to-leaf" />
          </div>
          {PROCESS.map((p, i) => (
            <div key={p.title} className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center">
              <span className="relative z-10 shrink-0 w-16 h-16 rounded-full bg-white ring-4 ring-mist grid place-items-center">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-royal to-sky text-white grid place-items-center font-serif text-lg shadow-lg shadow-royal/30">{i + 1}</span>
              </span>
              <div className="md:mt-6">
                <h3 className="font-serif text-xl text-ink mb-2">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed text-[15px] md:px-3">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Container>
  </section>
);

/* ---------- why us ---------- */

const WhyChooseUs = () => (
  <section className="relative bg-ink-900 text-white pt-32 pb-40 overflow-hidden">
    <Backdrop art={GRID_ART} photo="why.jpg" photoClass="opacity-15" />
    <div aria-hidden="true" className="absolute -top-20 right-0 w-[30rem] h-[30rem] rounded-full bg-royal/40 blur-3xl" />
    <Wave fill={COLORS.white} position="top" />
    <Container className="relative">
      <Reveal>
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-14">
          <div>
            <Eyebrow light>Why choose us</Eyebrow>
            <Heading light>Expertise You Can Count On</Heading>
          </div>
          <p className="text-indigo-100/80 text-lg leading-relaxed lg:pl-10">We bring decades of expertise and a commitment to professional excellence to every client relationship.</p>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_US.map((item, idx) => (
          <Reveal key={item.title} delay={(idx % 3) * 90}>
            <div className="group h-full rounded-3xl bg-white/[0.06] ring-1 ring-white/15 p-7 transition-all duration-300 hover:bg-white/[0.12] hover:-translate-y-1.5 hover:ring-leaf/50">
              <span className="w-12 h-12 rounded-2xl bg-leaf/15 text-mint grid place-items-center mb-5 transition-all duration-500 group-hover:bg-leaf group-hover:text-white group-hover:rotate-6">
                <Icon name={item.icon} size={24} stroke={1.5} />
              </span>
              <h3 className="font-serif text-xl mb-2">{item.title}</h3>
              <p className="text-indigo-100/70 leading-relaxed text-[15px]">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
    <Wave fill={COLORS.white} />
  </section>
);

/* ---------- training ---------- */

const Training = ({ onEnquire }) => (
  <section id="training" className="bg-white pb-28">
    <Container>
      <Reveal from="zoom">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink via-royal-dark to-royal text-white shadow-2xl shadow-royal/30">
          <Backdrop art={GRID_ART} photo="training.jpg" photoClass="opacity-15" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-leaf/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12 lg:p-16">
            <div>
              <span className="w-14 h-14 rounded-2xl bg-white/10 ring-1 ring-white/25 text-mint grid place-items-center mb-6"><Icon name="cap" size={28} stroke={1.4} /></span>
              <Eyebrow light>Training for freshers</Eyebrow>
              <Heading light className="mb-6">Start your career with practical experience</Heading>
              <p className="text-indigo-100/90 text-lg leading-relaxed mb-6">
                Kocheethra Associates provides comprehensive training opportunities for freshers who want to build practical knowledge in taxation, GST, accounting and related professional areas.
              </p>
              <p className="flex gap-3 rounded-2xl bg-white/10 ring-1 ring-white/15 p-4 text-indigo-50 mb-9">
                <span className="text-mint mt-0.5 shrink-0"><Icon name="checkCircle" size={22} /></span>
                Our training programs help freshers develop practical skills, with our trainees going on to secure placements at reputed companies.
              </p>
              <button onClick={() => onEnquire('training')} className="btn-shine inline-flex items-center gap-2 rounded-full bg-white text-ink font-semibold px-8 py-4 hover:-translate-y-1 transition-transform shadow-xl shadow-ink/30">
                Enquire about training <Icon name="arrow" size={18} />
              </button>
            </div>
            <StairsArt />
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

/* ---------- FAQ ---------- */

const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative bg-mist pt-28 pb-40">
      <Wave fill={COLORS.white} position="top" />
      <Container className="max-w-3xl">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow center>FAQ</Eyebrow>
            <Heading>Questions we are often asked</Heading>
          </div>
        </Reveal>
        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className={`rounded-2xl bg-white ring-1 transition-all ${on ? 'ring-royal/30 shadow-lg shadow-royal/10' : 'ring-royal/10'}`}>
                  <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="w-full flex items-center justify-between gap-4 text-left px-6 py-5">
                    <span className="font-serif text-lg text-ink">{f.q}</span>
                    <span className={`shrink-0 w-8 h-8 rounded-full grid place-items-center transition-all duration-300 ${on ? 'bg-leaf text-white rotate-45' : 'bg-mist text-royal'}`}><Icon name="plus" size={18} stroke={2} /></span>
                  </button>
                  <div className={`grid transition-all duration-300 ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden"><p className="px-6 pb-6 text-slate-600 leading-relaxed">{f.a}</p></div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
      <Wave fill={COLORS.cream} />
    </section>
  );
};

/* ---------- contact ---------- */

const fieldClass = 'w-full rounded-xl border border-royal/15 bg-mist/50 px-4 py-3.5 text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-royal focus:ring-2 focus:ring-royal/25 transition';
const labelClass = 'block text-sm font-medium text-ink mb-1.5';

const isOfficeOpen = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const part = (type) => parts.find((item) => item.type === type)?.value;
  const currentMinutes = Number(part('hour')) * 60 + Number(part('minute'));
  return part('weekday') !== 'Sun' && currentMinutes >= 8 * 60 && currentMinutes < 18 * 60;
};

const OfficeStatus = () => {
  const [open, setOpen] = useState(isOfficeOpen);

  useEffect(() => {
    const timer = window.setInterval(() => setOpen(isOfficeOpen()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span aria-live="polite" className={`inline-flex items-center gap-2 text-sm font-semibold ${open ? 'text-leaf-dark' : 'text-red-700'}`}>
      <span className={`h-2 w-2 rounded-full ${open ? 'bg-leaf' : 'bg-red-600'}`} />
      {open ? 'Open now' : 'Closed now'}
    </span>
  );
};

const Contact = ({ enquiry }) => {
  const [formStatus, setFormStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [service, setService] = useState('');

  useEffect(() => {
    if (enquiry.service) setService(enquiry.service);
  }, [enquiry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return; // honeypot
    const label = SERVICE_LABELS[data.service] || data.service;
    setErrorMsg('');
    setFormStatus('submitting');
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: data.name, phone: data.phone, email: data.email, service: label, message: data.message, _subject: `Website enquiry: ${label}` }),
        });
        if (!res.ok) throw new Error('Request failed');
      } else {
        const text = ['Hello Kocheethra Associates,', '', `Name: ${data.name}`, `Phone: ${data.phone}`, data.email ? `Email: ${data.email}` : null, `Service: ${label}`, '', data.message]
          .filter((l) => l !== null)
          .join('\n');
        window.open(`https://wa.me/91${CONTACT_INFO.phones[0]}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      }
      setFormStatus('success');
      form.reset();
      setService('');
      setTimeout(() => setFormStatus('idle'), 8000);
    } catch (err) {
      setFormStatus('idle');
      setErrorMsg('Sorry, something went wrong. Please call us or message us on WhatsApp.');
    }
  };

  const info = [
    { icon: 'phone', title: 'Call us', body: (<div className="flex flex-col gap-1">{CONTACT_INFO.phones.map((p) => <a key={p} href={`tel:${p}`} className="text-slate-600 hover:text-royal transition-colors">{p}</a>)}</div>) },
    { icon: 'mail', title: 'Email us', body: (<div className="flex flex-col gap-1">{CONTACT_INFO.emails.map((m) => <a key={m} href={`mailto:${m}`} className="text-slate-600 hover:text-royal break-all transition-colors">{m}</a>)}</div>) },
    { icon: 'pin', title: 'Visit our office', body: (<><p className="text-slate-600 mb-2">{CONTACT_INFO.location}</p><div className="flex flex-col items-start gap-1 mb-3"><OfficeStatus /><p className="text-sm text-slate-500">Monday–Saturday, 8:00 AM–6:00 PM IST; closed Sundays</p></div><a href={CONTACT_INFO.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:gap-3 transition-all">Get directions <Icon name="arrow" size={16} /></a></>) },
  ];

  return (
    <section id="contact" className="relative bg-cream pt-24 pb-40">
      <Container>
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow center>Contact us</Eyebrow>
            <Heading className="mb-5">Get in touch</Heading>
            <p className="text-slate-600 text-lg leading-relaxed">Reach out for professional consultation, service enquiries, or training opportunities.</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-5">
            {info.map((c, i) => (
              <Reveal key={c.title} delay={i * 90} from="left">
                <div className="group flex gap-5 rounded-3xl bg-white p-6 ring-1 ring-royal/10 shadow-[0_14px_40px_-26px_rgba(17,13,71,.45)] transition-all hover:-translate-y-1 hover:ring-royal/30">
                  <span className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-royal to-sky text-white grid place-items-center shadow-lg shadow-royal/25 transition-transform duration-500 group-hover:rotate-6"><Icon name={c.icon} size={22} /></span>
                  <div>
                    <h3 className="font-serif text-lg text-ink mb-2">{c.title}</h3>
                    {c.body}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal from="right" delay={100} className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-7 sm:p-10 ring-1 ring-royal/10 shadow-2xl shadow-royal/15">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-royal via-sky to-leaf" />
              <h3 className="font-serif text-2xl text-ink mb-7">Book a consultation</h3>
              {formStatus === 'success' ? (
                <div className="flex items-start gap-4 rounded-2xl bg-leaf/10 ring-1 ring-leaf/30 p-5 text-ink">
                  <span className="text-leaf-dark shrink-0"><Icon name="checkCircle" size={26} /></span>
                  <div>
                    <p className="font-semibold mb-1">Thank you!</p>
                    <p className="text-sm text-slate-600">{FORM_ENDPOINT ? 'Your enquiry has been sent. We will get back to you shortly.' : 'WhatsApp has opened with your enquiry. Please press send to complete it.'}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" />
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full name</label>
                      <input type="text" id="name" name="name" autoComplete="name" required className={fieldClass} placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone number</label>
                      <input type="tel" id="phone" name="phone" autoComplete="tel" required className={fieldClass} placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className={labelClass}>Email address</label>
                      <input type="email" id="email" name="email" autoComplete="email" className={fieldClass} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label htmlFor="service" className={labelClass}>Service required</label>
                      <select id="service" name="service" required value={service} onChange={(e) => setService(e.target.value)} className={`${fieldClass} cursor-pointer`}>
                        <option value="" disabled>Select a service…</option>
                        {Object.entries(SERVICE_LABELS).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>Your message</label>
                    <textarea id="message" name="message" rows="4" required className={`${fieldClass} resize-none`} placeholder="How can we help you?" />
                  </div>
                  {errorMsg && <p role="alert" className="text-sm text-red-700">{errorMsg}</p>}
                  <button type="submit" disabled={formStatus === 'submitting'} className={`btn-shine w-full rounded-full py-4 px-8 font-semibold text-white transition-all ${formStatus === 'submitting' ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-royal to-royal-dark shadow-lg shadow-royal/30 hover:-translate-y-0.5 hover:shadow-xl'}`}>
                    {formStatus === 'submitting' ? 'Sending…' : FORM_ENDPOINT ? 'Submit enquiry' : 'Send enquiry via WhatsApp'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
      <Wave fill={COLORS.ink} />
    </section>
  );
};

/* ---------- footer & floating ---------- */

const Footer = () => (
  <footer className="bg-ink-900 text-indigo-100/70">
    <Container className="pt-12 pb-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-14">
        <div className="lg:col-span-4">
          <span className="inline-block bg-white rounded-xl px-3 py-2 mb-6"><Logo className="h-10" /></span>
          <p className="text-sm leading-relaxed mb-6 max-w-sm">25+ years of trusted tax &amp; financial expertise. Providing practical support to businesses and individuals in Kottayam and Changanacherry.</p>
          <AssocLogo />
        </div>
        <div className="lg:col-span-2 lg:col-start-6">
          <h4 className="text-white text-xs font-semibold uppercase tracking-[0.18em] mb-5">Quick links</h4>
          <ul className="space-y-3 text-sm">
            {NAV.map((l) => (<li key={l.name}><a href={l.href} className="hover:text-mint transition-colors">{l.name}</a></li>))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h4 className="text-white text-xs font-semibold uppercase tracking-[0.18em] mb-5">Services</h4>
          <ul className="space-y-3 text-sm">
            {['GST Registration & Filing', 'Income Tax Consulting', 'Daybook & Ledger Accounting', 'Tally, Winman & Vyapar Support', 'E-Way Bill Services', 'Digital Signatures', 'Financial Consulting'].map((s) => (<li key={s}>{s}</li>))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h4 className="text-white text-xs font-semibold uppercase tracking-[0.18em] mb-5">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><Icon name="pin" size={18} className="text-mint mt-0.5 shrink-0" /> {CONTACT_INFO.location}</li>
            <li className="flex gap-3">
              <Icon name="phone" size={18} className="text-mint mt-0.5 shrink-0" />
              <span className="flex flex-col gap-1">
                <a href={`tel:${CONTACT_INFO.phones[0]}`} className="hover:text-white">{CONTACT_INFO.phones[0]}</a>
                <a href={`tel:${CONTACT_INFO.phones[1]}`} className="hover:text-white">{CONTACT_INFO.phones[1]}</a>
              </span>
            </li>
            <li className="flex gap-3"><Icon name="mail" size={18} className="text-mint mt-0.5 shrink-0" /><a href={`mailto:${CONTACT_INFO.emails[0]}`} className="hover:text-white break-all">{CONTACT_INFO.emails[0]}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 text-sm text-indigo-100/50">&copy; {new Date().getFullYear()} Kocheethra Associates. All rights reserved.</div>
    </Container>
  </footer>
);

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);
  const [showContact, setShowContact] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 700);
      setShowContact(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className={`w-11 h-11 rounded-full bg-white text-royal shadow-lg ring-1 ring-royal/15 grid place-items-center transition-all duration-300 hover:-translate-y-1 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
        <Icon name="up" size={20} stroke={2} />
      </button>
      <a href={`tel:${CONTACT_INFO.phones[0]}`} aria-label="Call us" className={`lg:hidden w-12 h-12 rounded-full bg-royal text-white shadow-lg grid place-items-center transition-all duration-300 ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
        <Icon name="phone" size={22} />
      </a>
      <a href={`https://wa.me/91${CONTACT_INFO.phones[0]}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={`relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl grid place-items-center hover:scale-105 transition-all duration-300 lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <Icon name="whatsapp" size={26} stroke={1.8} />
      </a>
    </div>
  );
};

export default function App() {
  const [enquiry, setEnquiry] = useState({ service: '', n: 0 });
  const onEnquire = (service) => {
    setEnquiry((e) => ({ service, n: e.n + 1 }));
    goTo('contact');
  };
  return (
    <div className="min-h-screen font-sans text-slate-700 bg-white selection:bg-royal selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services onEnquire={onEnquire} />
        <Process />
        <WhyChooseUs />
        <Training onEnquire={onEnquire} />
        <Faq />
        <Contact enquiry={enquiry} />
        <GstCalculator />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
