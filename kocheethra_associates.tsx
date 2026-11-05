import React, { useState, useEffect, useRef } from 'react';

const Icons = {
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  WhatsApp: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg>,
  Truck: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
  Signature: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 4v16a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h17a1 1 0 0 1 1 1z"></path><line x1="6.5" y1="17.5" x2="17.5" y2="17.5"></line><path d="M12.5 13.5c-2.5-3-2.5-7 0-7 2.5 0 2.5 4 0 7-2.5 3-5.5 3-5.5 3"></path></svg>,
  PieChart: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>,
  GraduationCap: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  Receipt: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 17.5v-11"></path></svg>,
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  Award: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
};

const CONTACT_INFO = {
  phones: ['9645077781', '9447208332', '9400533998', '8281312264', '0481-2722649'],
  emails: ['kagst@gmail.com', 'kocheethraassociates@gmail.com'],
  location: 'Kottayam / Changanacherry, Kerala',
  mapLink: 'https://share.google/Rs5eclWJP8Dj6N0qe'
};

const SERVICES = [
  { id: 1, title: 'GST Services', icon: Icons.FileText, desc: 'Comprehensive GST registration, return filing, compliance, and professional advisory.', features: ['Registration', 'Return Filing', 'Advisory'] },
  { id: 2, title: 'Income Tax Services', icon: Icons.Calculator, desc: 'Expert income tax filing, consulting, tax planning, and advisory for individuals and businesses.', features: ['Filing', 'Consulting', 'Tax Planning'] },
  { id: 3, title: 'Sales Tax Services', icon: Icons.Receipt, desc: 'Dedicated sales tax consulting, compliance, and related assistance.', features: ['Consulting', 'Compliance', 'Assistance'] },
  { id: 4, title: 'E-Way Bill Services', icon: Icons.Truck, desc: 'Seamless E-Way bill generation and compliance support for goods transportation.', features: ['Generation', 'Compliance', 'Support'] },
  { id: 5, title: 'Digital Signature', icon: Icons.Signature, desc: 'Secure digital signature assistance, DSC-related services, and documentation support.', features: ['Assistance', 'DSC Services', 'Documentation'] },
  { id: 6, title: 'Financial Consulting', icon: Icons.PieChart, desc: 'Strategic financial and tax consulting to support business growth and compliance.', features: ['Financial', 'Tax', 'Business Advisory'] }
];

const CLIENTS = [
  "Edimannical Jewellery", "Alfa Group", "Toms", "Western", "N3 Spices", "Niranazhi"
];

const WHY_US = [
  { icon: Icons.Award, title: "25+ Years Experience", desc: "Decades of practical experience in taxation and financial services." },
  { icon: Icons.Shield, title: "Professional Expertise", desc: "Specialized support for GST, income tax, sales tax and related compliance." },
  { icon: Icons.PieChart, title: "Business-Focused", desc: "Practical assistance designed around the needs of businesses and professionals." },
  { icon: Icons.FileText, title: "Comprehensive Services", desc: "Multiple taxation, compliance and financial services under one roof." },
  { icon: Icons.CheckCircle, title: "Trusted Relationships", desc: "Serving businesses and individuals with a professional and dependable approach." },
  { icon: Icons.GraduationCap, title: "Career Development", desc: "Practical training opportunities for freshers to develop accounting skills." }
];

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    
    .animate-float { animation: float 8s ease-in-out infinite; }
    .animate-float-delayed { animation: float 10s ease-in-out 4s infinite; }
    .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
    
    .marquee-container {
      display: flex;
      width: 200%;
      animation: marquee 35s linear infinite;
    }
    .hover-pause:hover .marquee-container { animation-play-state: paused; }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .glass-dark {
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f8fafc; }
    ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #64748b; }
    
    html { scroll-behavior: smooth; }
  `}} />
);

// Simplified and robust Intersection Observer hook
const useScrollReveal = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(currentRef); // Ensures it triggers only once
      }
    }, options);

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [options.threshold]);

  return { ref, isVisible };
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime = null;
    let animationFrame;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Reveal = ({ children, delay = 0, className = "", direction = "up", scale = true }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  
  let transformClass = "translate-y-12";
  if (direction === "left") transformClass = "-translate-x-12";
  if (direction === "right") transformClass = "translate-x-12";
  if (direction === "none") transformClass = "";

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-none' 
          : `opacity-0 ${transformClass} ${scale ? 'scale-95' : ''} blur-[4px]`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Clients', href: '#clients' },
    { name: 'Training', href: '#training' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-effect shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-4">
            <a href="#home" className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <img 
                src="LOGO ...Kocheethra Assocaitaes_2.jpg" 
                alt="KOCHEETHRA ASSOCIATES" 
                className="relative h-10 md:h-12 w-auto object-contain bg-white rounded p-1 shadow-sm transition-transform duration-500 hover:scale-[1.02]"
              />
            </a>
            <div className={`hidden sm:block h-8 w-px mx-2 transition-colors duration-500 ${scrolled ? 'bg-slate-300' : 'bg-white/30'}`}></div>
            <div className={`hidden sm:block text-xs font-semibold tracking-wide transition-colors duration-500 ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>
              25+ Years of<br/>Trusted Expertise
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={`text-sm font-semibold tracking-wide transition-colors ${scrolled ? 'text-slate-700 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`}>
                {link.name}
              </a>
            ))}
            <a href="#contact" className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 bg-blue-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[marquee_1s_ease-in-out]"></span>
              <span className="relative">Consult Us</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`focus:outline-none transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}>
              {isOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full glass-effect transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 border-t border-slate-200/50 opacity-100 shadow-xl' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-100/50 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 text-white min-h-[90vh] flex items-center">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-90 z-0"></div>
      
      {/* Floating Animated Blobs */}
      <div className="absolute top-20 right-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-[5%] w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[120px] animate-float pointer-events-none z-0"></div>
      
      {/* Subtle Texture/Image overlay */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Professional Finance Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center py-1.5 px-4 rounded-full bg-white/5 text-slate-200 text-xs font-semibold tracking-widest mb-8 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              ESTABLISHED TAX & FINANCIAL FIRM
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
              Trusted Tax & Financial Expertise for Over 25 Years.
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
              KOCHEETHRA ASSOCIATES provides professional GST, income tax, sales tax, digital signature, E-Way Bill and financial consulting services for individuals and businesses.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#contact" className="group relative inline-flex justify-center items-center px-8 py-4 text-base font-bold rounded-lg text-slate-900 bg-white overflow-hidden transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative flex items-center">Get in Touch <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><Icons.ChevronRight /></span></span>
              </a>
              <a href="#services" className="inline-flex justify-center items-center px-8 py-4 border border-white/20 text-base font-semibold rounded-lg text-white hover:bg-white/10 transition-all backdrop-blur-sm hover:border-white/40">
                Explore Our Services
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Decorative Bottom Edge */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { number: 25, suffix: "+", label: "Years Experience" },
    { number: 1000, suffix: "+", label: "Clients & Cases" },
    { textOnly: "Professional", label: "Tax & GST Support" },
    { textOnly: "Trusted", label: "By Businesses & Individuals" }
  ];

  return (
    <section className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="glass-effect rounded-2xl shadow-xl shadow-slate-200/50 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        {stats.map((stat, idx) => (
          <Reveal key={idx} delay={idx * 150} className={`text-center flex flex-col items-center justify-center ${idx !== 0 ? 'pt-6 sm:pt-0' : ''}`}>
            <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2 font-serif bg-clip-text text-transparent bg-gradient-to-br from-blue-900 to-slate-700">
              {stat.textOnly ? stat.textOnly : <AnimatedCounter end={stat.number} suffix={stat.suffix} />}
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-blue-600"></span>
                <h2 className="text-blue-700 font-bold tracking-widest uppercase text-xs">About Us</h2>
              </div>
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                Practical, Dependable, and Professional Support.
              </h3>
            </Reveal>
            <Reveal delay={100}>
              <div className="prose prose-lg text-slate-600 mb-8 font-light">
                <p className="mb-4 text-slate-800 font-medium">
                  KOCHEETHRA ASSOCIATES is a professional taxation and financial consulting firm serving clients in and around Kottayam and Changanacherry.
                </p>
                <p className="mb-4">
                  With more than 25 years of experience, the firm specializes in GST, income tax, sales tax, E-Way Bill, digital signature services, and comprehensive financial consulting.
                </p>
                <p>
                  We focus on providing practical and dependable support to both businesses and individuals, ensuring compliance and peace of mind in complex financial landscapes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {['Local Expertise', 'Taxation Services', 'Individual Support', 'Business Consulting'].map((item, i) => (
                  <div key={i} className="flex items-center text-slate-700 font-medium group">
                    <span className="text-blue-600 mr-3 bg-blue-50 p-1.5 rounded-full transition-transform group-hover:scale-110"><Icons.CheckCircle /></span> 
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          
          <Reveal direction="left" delay={200} className="relative">
            {/* Image wrapper with inner parallax/scale effect */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group bg-white p-2 transform transition-transform duration-700 hover:-translate-y-2">
              <div className="aspect-w-4 aspect-h-5 sm:aspect-w-3 sm:aspect-h-4 relative rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                  alt="Professional Office Environment" 
                  className="object-cover w-full h-full transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                {/* Founder details reveal */}
                <div className="absolute bottom-0 left-0 p-8 text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-1 bg-blue-500 mb-4 rounded-full"></div>
                  <h4 className="text-2xl font-serif font-bold mb-1">Mr. Vinod Mathew</h4>
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">Head of Kocheethra Associates</p>
                  <p className="text-slate-200 text-sm border-t border-white/20 pt-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Leading the firm with 25+ Years of Experience in Taxation, GST & Financial Consulting.
                  </p>
                </div>
              </div>
            </div>
            {/* Floating decorative dot block */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:16px_16px]"></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, idx }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  const Icon = service.icon;

  return (
    <Reveal delay={idx * 100} className="h-full">
      <div 
        className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm transition-all duration-500 h-full flex flex-col overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transform: isHovered ? 'translateY(-6px)' : 'translateY(0)', boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '' }}
      >
        {/* Dynamic Glow Effect */}
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.08), transparent 40%)`,
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-blue-600/30">
            <Icon />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-3 font-serif">{service.title}</h4>
          <p className="text-slate-600 mb-6 flex-grow leading-relaxed font-light">
            {service.desc}
          </p>
          <ul className="space-y-2 mb-2 border-t border-slate-50 pt-4 opacity-70 group-hover:opacity-100 transition-opacity">
            {service.features.map((feature, fIdx) => (
              <li key={fIdx} className="text-sm text-slate-500 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-px bg-blue-600"></span>
              <h2 className="text-blue-700 font-bold tracking-widest uppercase text-xs">Core Services</h2>
              <span className="w-8 h-px bg-blue-600"></span>
            </div>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Comprehensive Financial Solutions
            </h3>
            <p className="text-lg text-slate-600 font-light">
              Expert assistance for businesses and individuals, ensuring seamless compliance and strategic financial management.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <Reveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-blue-500"></span>
                <h2 className="text-blue-400 font-bold tracking-widest uppercase text-xs">Why Choose Us</h2>
              </div>
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                The Kocheethra Advantage
              </h3>
              <p className="text-slate-400 mb-10 font-light leading-relaxed text-lg">
                We bring decades of expertise and a commitment to professional excellence to every client relationship.
              </p>
              <a href="#contact" className="inline-flex items-center text-white font-semibold group transition-all">
                <span className="border-b border-transparent group-hover:border-white pb-1 transition-all">Book a Consultation</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300 ml-2 bg-white/10 p-2 rounded-full group-hover:bg-blue-600"><Icons.ChevronRight /></span>
              </a>
            </Reveal>
          </div>
          
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-10 gap-y-12">
            {WHY_US.map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="relative pl-6 group">
                  <div className="absolute left-0 top-1 w-px h-full bg-slate-800 group-hover:bg-blue-500 transition-colors duration-500 origin-top transform group-hover:scale-y-100"></div>
                  
                  <div className="absolute left-[-11px] top-0 w-6 h-6 rounded-full bg-slate-800 border-4 border-slate-900 group-hover:bg-blue-500 transition-colors duration-500"></div>
                  
                  <div className="pl-4">
                    <h4 className="text-xl font-bold mb-2 font-serif text-slate-100 group-hover:text-blue-300 transition-colors">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Clients = () => {
  // Triple the array to ensure seamless infinite scroll visually
  const scrollItems = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section id="clients" className="py-20 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4">Trusted By Established Brands</h3>
            <p className="text-slate-600 max-w-2xl mx-auto font-light">
              Serving a diverse portfolio of reputed businesses and individuals, including well-known personalities for income tax and digital signature services.
            </p>
          </Reveal>
        </div>
        
        {/* CSS Marquee container */}
        <div className="relative flex overflow-x-hidden hover-pause [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-container gap-6 md:gap-8 px-4">
            {scrollItems.map((client, idx) => (
              <div 
                key={idx} 
                className="bg-white px-8 py-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center min-w-[220px] transition-all duration-300 hover:shadow-md cursor-default hover:border-blue-200 group"
              >
                <span className="font-bold text-slate-700 tracking-tight text-lg group-hover:text-blue-700 transition-colors">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Training = () => {
  return (
    <section id="training" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 flex flex-col lg:flex-row relative">
            
            {/* Background elements within card */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]"></div>
            
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 glass-dark rounded-xl text-blue-400 mb-8 border border-white/10">
                <Icons.GraduationCap />
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                Start Your Career With Practical Experience
              </h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light">
                Kocheethra Associates provides comprehensive training opportunities for freshers who want to build practical knowledge in taxation, GST, accounting and related professional areas.
              </p>
              <div className="glass-dark rounded-xl p-5 mb-10 border-l-4 border-l-blue-500">
                <p className="text-white font-medium flex items-start text-sm">
                  <span className="text-blue-400 mr-3 mt-0.5"><Icons.CheckCircle /></span>
                  Our training programs help freshers develop practical skills, with our trainees going on to secure placements at reputed companies.
                </p>
              </div>
              <div>
                <a href="#contact" className="inline-flex justify-center items-center px-8 py-4 text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg hover:-translate-y-1">
                  Enquire About Training
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Professional Career Training" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent"></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-px bg-blue-600"></span>
              <h2 className="text-blue-700 font-bold tracking-widest uppercase text-xs">Contact Us</h2>
              <span className="w-8 h-px bg-blue-600"></span>
            </div>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Get In Touch
            </h3>
            <p className="text-lg text-slate-600 font-light">
              Reach out for professional consultation, service inquiries, or training opportunities.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-6">
            <Reveal delay={100}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Icons.Phone />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 font-serif text-lg">Call Us</h4>
                  <div className="flex flex-col space-y-1">
                    {CONTACT_INFO.phones.map(phone => (
                      <a key={phone} href={`tel:${phone}`} className="text-slate-600 hover:text-blue-600 transition-colors font-medium">{phone}</a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Icons.Mail />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 font-serif text-lg">Email Us</h4>
                  <div className="flex flex-col space-y-1">
                    {CONTACT_INFO.emails.map(email => (
                      <a key={email} href={`mailto:${email}`} className="text-slate-600 hover:text-blue-600 transition-colors break-all font-medium">{email}</a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Icons.MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 font-serif text-lg">Visit Our Office</h4>
                  <p className="text-slate-600 mb-4 leading-relaxed">{CONTACT_INFO.location}</p>
                  <a href={CONTACT_INFO.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group">
                    Get Directions on Map <span className="transform group-hover:translate-x-1 transition-transform ml-1"><Icons.ChevronRight /></span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <Reveal delay={200} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
              
              <h4 className="text-2xl font-serif font-bold text-slate-900 mb-8 relative z-10">Book a Consultation</h4>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 flex items-center mb-6 animate-[pulse_0.5s_ease-in-out]">
                  <div className="mr-4 text-green-500 bg-white p-2 rounded-full shadow-sm"><Icons.CheckCircle /></div>
                  <div>
                    <h5 className="font-bold mb-1">Message Sent Successfully</h5>
                    <p className="text-sm">Thank you for reaching out. We will get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input type="text" id="name" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                      <input type="tel" id="phone" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input type="email" id="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">Service Required</label>
                      <select id="service" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-slate-50 focus:bg-white text-slate-700 cursor-pointer">
                        <option value="">Select a service...</option>
                        <option value="gst">GST Services</option>
                        <option value="income-tax">Income Tax</option>
                        <option value="sales-tax">Sales Tax</option>
                        <option value="eway-bill">E-Way Bill</option>
                        <option value="dsc">Digital Signature</option>
                        <option value="consulting">Financial Consulting</option>
                        <option value="training">Training</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                    <textarea id="message" rows="4" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-slate-50 focus:bg-white resize-none" placeholder="How can we help you?"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-4 px-8 rounded-xl text-white font-bold text-lg transition-all shadow-md hover:shadow-xl ${formStatus === 'submitting' ? 'bg-slate-400 cursor-not-allowed shadow-none' : 'bg-slate-900 hover:bg-blue-600 transform hover:-translate-y-1'}`}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Submit Enquiry'}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a href={`https://wa.me/91${CONTACT_INFO.phones[0]}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative border-2 border-white" aria-label="WhatsApp">
        <Icons.WhatsApp />
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">WhatsApp Us</span>
      </a>
      <a href={`tel:${CONTACT_INFO.phones[0]}`} className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-white md:hidden" aria-label="Call">
        <Icons.Phone />
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 text-slate-400 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <img 
              src="LOGO ...Kocheethra Assocaitaes_2.jpg" 
              alt="KOCHEETHRA ASSOCIATES" 
              className="h-10 w-auto object-contain bg-white rounded p-1 mb-6"
            />
            <p className="text-sm mb-8 leading-relaxed font-light text-slate-400 pr-4">
              25+ Years of Trusted Tax & Financial Expertise. Providing practical support to businesses and individuals in Kottayam and Changanacherry.
            </p>
            <div className="flex gap-4">
              {/* Association Logo Placeholder */}
              <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-xs text-center font-semibold text-slate-500 backdrop-blur-sm">
                Assoc.<br/>Logo
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Clients', 'Training', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <span className="mr-2 text-blue-600 opacity-0 transform -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">▹</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4">
              {['GST Registration & Filing', 'Income Tax Consulting', 'Sales Tax Support', 'E-Way Bill Services', 'Digital Signatures', 'Financial Consulting'].map(service => (
                <li key={service} className="text-sm font-light hover:text-white transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact Info</h4>
            <ul className="space-y-5 text-sm font-light">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-0.5"><Icons.MapPin /></span>
                <span>{CONTACT_INFO.location}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-0.5"><Icons.Phone /></span>
                <div className="flex flex-col space-y-1">
                  <a href={`tel:${CONTACT_INFO.phones[0]}`} className="hover:text-white transition-colors">{CONTACT_INFO.phones[0]}</a>
                  <a href={`tel:${CONTACT_INFO.phones[1]}`} className="hover:text-white transition-colors">{CONTACT_INFO.phones[1]}</a>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-0.5"><Icons.Mail /></span>
                <a href={`mailto:${CONTACT_INFO.emails[0]}`} className="hover:text-white transition-colors break-all">{CONTACT_INFO.emails[0]}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-light text-slate-500">
            &copy; {new Date().getFullYear()} Kocheethra Associates. All Rights Reserved.
          </p>
          <div className="text-sm font-light text-slate-500">
            Designed for Professional Excellence
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <ServicesSection />
        <WhyChooseUs />
        <Clients />
        <Training />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}