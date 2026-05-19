"use client";
import React, { useState, useEffect } from 'react';
import {
  X, Phone, Mail, MapPin, Bed, Wifi, Camera, Dumbbell,
  BookOpen, Shield, Moon, Utensils, Check, Menu, ChevronDown, ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { User, Home, MessageSquare, Send } from 'lucide-react';
import bed from '../../../public/bed.jpeg';
import kitchen from '../../../public/kitchen.jpeg';
import cctv from '../../../public/cctv.jpeg';
import study from '../../../public/study.jpeg';
import wifi from '../../../public/wifi.jpeg';
import gym from '../../../public/gym.jpeg';

/* ── Decorative Islamic star SVG ── */
const StarPattern = ({ className = '' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="currentColor" aria-hidden>
    <path opacity=".18" d="M100 10l11.8 36.3H148l-29.1 21.2 11.1 34.2L100 80.4 70 101.7l11.1-34.2L52 46.3h36.2z"/>
    <path opacity=".10" d="M100 40l7 21.5H127l-17.2 12.5 6.5 20.2L100 82.5l-16.3 11.7 6.5-20.2L73 61.5h20z"/>
    <circle opacity=".07" cx="100" cy="100" r="88"/>
    <circle opacity=".05" cx="100" cy="100" r="72"/>
  </svg>
);

/* ── Thin divider with diamond ── */
const Divider = () => (
  <div className="flex items-center gap-3 my-2">
    <div className="flex-1 h-px bg-[#c8972a]/30"/>
    <div className="w-2 h-2 rotate-45 bg-[#c8972a]/50"/>
    <div className="flex-1 h-px bg-[#c8972a]/30"/>
  </div>
);

export default function Landing() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen]     = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [activeTab, setActiveTab]         = useState(0);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', roomType: '5-bed', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // 1. Send to our local backend
      const backendRes = await fetch('http://localhost:5224/api/inquiries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // 2. Also send to FormSubmit (as backup/notification)
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k === 'roomType' ? 'room_type' : k, v));
      fd.append('_subject', 'New Hostel Inquiry from KGF Website');
      fd.append('_captcha', 'false');
      fd.append('_template', 'table');
      
      const res = await fetch('https://formsubmit.co/ajax/kgf@gmail.com', { method: 'POST', body: fd });
      const result = await res.json();
      
      if (backendRes.ok || (res.ok && result.success)) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', roomType: '5-bed', message: '' });
        setTimeout(() => { setIsInquiryOpen(false); setSubmitStatus(null); }, 2200);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) { 
      console.error('Submission error:', err);
      setSubmitStatus('error'); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const plans = [
    { beds: 5, orig: 6000, final: 4500, tag: 'Best Value',   featured: false },
    { beds: 4, orig: 6500, final: 5000, tag: 'Most Popular', featured: true  },
    { beds: 3, orig: 7000, final: 5500, tag: 'Premium',      featured: false },
  ];

  const features = [
    { icon: Shield,   text: 'Strict KGF Representative Supervision' },
    { icon: Bed,      text: '75 Beds · 18 Dormitory Rooms' },
    { icon: BookOpen, text: 'Dedicated Study Room & Library' },
    { icon: Shield,   text: 'Warden & Security Guard On-Site' },
    { icon: Moon,     text: 'Prayer Room Available' },
    { icon: Wifi,     text: 'High-Speed WiFi Throughout' },
    { icon: Dumbbell, text: 'Recreation Gym & Room' },
    { icon: Camera,   text: 'Complete CCTV Surveillance' },
    { icon: Check,    text: 'Islamic Aesthetics Ensured' },
    { icon: Check,    text: 'Hygienic & Studious Ambience' },
  ];

  const amenities = [
    'Comfortable Single Beds', 'Personal Cupboards',
    'Washing Machine', 'Electric Hotplate',
    'Fridge & Microwave Oven', 'Bathroom Geyser',
    'Dining Hall', 'Electricity Charges Included',
  ];

  const tabs = [
    { label: 'Bedrooms',   img: bed,     icon: Bed,      iconColor: '#1a5c3a', heading: 'Comfortable Single Beds',        body: 'Premium orthopedic mattresses, individual cupboards, and a dedicated study table in every room — designed for restorative sleep and focused study.', pts: ['Orthopedic mattresses', 'Individual storage cupboards', 'Study table & chair per room'] },
    { label: 'Kitchen',    img: kitchen, icon: Utensils, iconColor: '#b45309', heading: 'Modern Kitchen Facilities',       body: 'Fully equipped common kitchen with microwave, refrigerator, electric hotplate, and washing machine — everything for convenient daily cooking.', pts: ['Microwave oven', 'Refrigerator for food storage', 'Electric hotplate & washing machine'] },
    { label: 'Study Room', img: study,   icon: BookOpen, iconColor: '#6d28d9', heading: 'Dedicated Study Room & Library',  body: 'A serene, well-lit study room with curated reference books and extended access hours — the ideal environment for academic excellence.', pts: ['Quiet study atmosphere', 'Reference books & materials', 'Extended study hours'] },
    { label: 'Gym',        img: gym,     icon: Dumbbell, iconColor: '#b91c1c', heading: 'Recreation Gym & Room',           body: 'Modern gym equipment and an indoor recreation room to maintain physical fitness and unwind after intensive study sessions.', pts: ['Modern gym equipment', 'Indoor games & activities', 'Relaxation & entertainment area'] },
    { label: 'WiFi',       img: wifi,    icon: Wifi,     iconColor: '#0e7490', heading: 'High-Speed WiFi & Power Backup',  body: 'Unlimited high-speed internet across the entire hostel, with inverter backup ensuring no disruption to your online classes.', pts: ['Unlimited high-speed internet', 'Inverter power backup', 'Zero electricity outage concerns'] },
    { label: 'Security',   img: cctv,    icon: Camera,   iconColor: '#92400e', heading: 'Complete CCTV Surveillance',      body: '24/7 camera coverage, trained security guards, and experienced wardens — a protected environment where families can have complete peace of mind.', pts: ['24/7 CCTV monitoring', 'Dedicated security personnel', 'Experienced warden supervision'] },
  ];

  const navLinks = ['Home', 'Facilities', 'Features', 'Pricing', 'Contact'];
  const inputCls = "w-full bg-white border-2 border-[#e8e0d0] focus:border-[#1a5c3a] text-[#1a2e1a] placeholder-[#b0a898] pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-colors";

  return (
    <div className="min-h-screen font-sans" style={{ background: '#faf8f3', color: '#1a2e1a' }}>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{
        background:    scrolled ? 'rgba(250,248,243,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom:  scrolled ? '1px solid rgba(200,151,42,0.2)' : '1px solid transparent'
      }} className="fixed w-full top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <StarPattern className="absolute inset-0 text-[#c8972a] w-full h-full"/>
                <Image src="/kgf_2.svg" alt="KGF" fill className="object-contain p-1" priority/>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: '#1a5c3a', letterSpacing: '-0.03em' }}>KGF</span>
                  <span className="text-base sm:text-lg font-bold text-[#1a2e1a]">Boys Hostel</span>
                </div>
                <p className="text-[9px] tracking-[0.18em] uppercase font-medium" style={{ color: '#c8972a' }}>Kokan Global Foundation</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium transition-colors duration-200 hover:text-[#1a5c3a]" style={{ color: '#4a6741' }}>{l}</a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => setIsLoginOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl border-2 transition-all duration-200 hover:bg-[#1a5c3a] hover:text-white"
                style={{ borderColor: '#1a5c3a', color: '#1a5c3a' }}>
                <User className="w-4 h-4"/> Login
              </button>
              <button onClick={() => setIsInquiryOpen(true)}
                className="text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-white transition-all hover:scale-105 shadow-lg"
                style={{ background: 'linear-gradient(135deg,#1a5c3a,#2d7a50)', boxShadow: '0 4px 18px rgba(26,92,58,0.35)' }}>
                Inquiry Now
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-1" style={{ color: '#4a6741' }}>
                {mobileOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: '#faf8f3', borderTop: '1px solid rgba(200,151,42,0.2)' }} className="lg:hidden px-4 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm font-medium border-b last:border-0"
                  style={{ color: '#4a6741', borderColor: 'rgba(200,151,42,0.15)' }}>{l}</a>
              ))}
              <button onClick={() => { setIsLoginOpen(true); setMobileOpen(false); }}
                className="mt-3 border-2 py-2.5 rounded-xl text-sm font-semibold"
                style={{ borderColor: '#1a5c3a', color: '#1a5c3a' }}>Login</button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(160deg,#f0ebe0 0%,#faf8f3 55%,#e8f4ed 100%)' }}/>
        <StarPattern className="absolute -top-12 -right-12 w-[340px] h-[340px] text-[#c8972a] opacity-40"/>
        <StarPattern className="absolute bottom-0 -left-16 w-[260px] h-[260px] text-[#1a5c3a] opacity-20"/>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-semibold border"
                style={{ background: 'rgba(200,151,42,0.12)', borderColor: 'rgba(200,151,42,0.4)', color: '#92681a' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#c8972a' }}/>
                Grand Opening — 30% Discount
              </div>

              <h1 className="font-black leading-[1.05] mb-5" style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', color: '#0f2e1a' }}>
                Premium Student<br/>
                <span style={{ color: '#1a5c3a' }}>Living</span>
                <span style={{ color: '#c8972a' }}> At Panvel</span>
              </h1>

              <Divider/>

              <p className="text-base sm:text-lg leading-relaxed mt-5 mb-2 max-w-lg" style={{ color: '#4a5e4a' }}>
                Kokan Global Foundation's boys hostel — where Islamic values meet modern comfort. 75 beds, world-class amenities, and a disciplined studious environment.
              </p>
              <p className="font-semibold mb-8 text-sm" style={{ color: '#1a5c3a' }}>
                Starting from <span style={{ color: '#c8972a' }}>1st October 2025</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <button onClick={() => setIsInquiryOpen(true)}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#1a5c3a,#2d7a50)', boxShadow: '0 8px 28px rgba(26,92,58,0.38)' }}>
                  Book Your Seat <ArrowRight className="w-5 h-5"/>
                </button>
                <a href="#pricing"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base border-2 transition-all hover:bg-[rgba(200,151,42,0.1)]"
                  style={{ borderColor: '#c8972a', color: '#92681a' }}>
                  View Pricing <ChevronDown className="w-4 h-4"/>
                </a>
              </div>

              <div className="flex gap-8 pt-6" style={{ borderTop: '1px solid rgba(200,151,42,0.25)' }}>
                {[['75+','Beds Available'],['18','Rooms'],['24/7','Security']].map(([n,l])=>(
                  <div key={l}>
                    <p className="text-3xl font-black" style={{ color: '#1a5c3a' }}>{n}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: '#7a9070' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -inset-6 rounded-[2.5rem]" style={{ background: 'linear-gradient(135deg,rgba(26,92,58,0.12),rgba(200,151,42,0.10))' }}/>
              <div className="relative rounded-3xl overflow-hidden border-4" style={{ borderColor: 'rgba(200,151,42,0.3)' }}>
                <img src="/hostel.jpg" alt="KGF Hostel" className="w-full h-[420px] object-cover"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(15,46,26,0.7) 0%,transparent 55%)' }}/>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl p-4 flex items-center justify-between"
                    style={{ background: 'rgba(250,248,243,0.92)', backdropFilter: 'blur(8px)', border: '1px solid rgba(200,151,42,0.3)' }}>
                    <div>
                      <p className="font-bold text-sm" style={{ color: '#0f2e1a' }}>KGF Boys Hostel</p>
                      <p className="text-xs" style={{ color: '#7a9070' }}>Panvel, Maharashtra</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl text-xs font-black text-white" style={{ background: '#c8972a' }}>30% OFF</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black shadow-xl"
                style={{ background: '#1a5c3a', color: 'white', boxShadow: '0 8px 24px rgba(26,92,58,0.4)' }}>
                <span className="text-2xl leading-none">75</span>
                <span className="text-[9px] tracking-widest uppercase opacity-80">Beds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FACILITIES ═══ */}
      <section id="facilities" className="py-16 sm:py-24" style={{ background: '#f4f0e6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#c8972a' }}>Explore Our Facilities</p>
            <h2 className="text-3xl sm:text-5xl font-black mb-3" style={{ color: '#0f2e1a' }}>World-Class Amenities</h2>
            <p className="text-base" style={{ color: '#5a7060' }}>Every detail crafted for student success</p>
            <Divider/>
          </div>

          {/* Tab nav */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeTab === i ? '#1a5c3a' : 'rgba(255,255,255,0.7)',
                  color:      activeTab === i ? '#fff'    : '#4a6741',
                  border:     `1.5px solid ${activeTab === i ? '#1a5c3a' : 'rgba(200,151,42,0.25)'}`,
                  boxShadow:  activeTab === i ? '0 4px 14px rgba(26,92,58,0.3)' : 'none',
                }}>
                <t.icon className="w-4 h-4"/> {t.label}
              </button>
            ))}
          </div>

          {/* Tab content panel */}
          <div className="grid lg:grid-cols-2 gap-0 items-stretch rounded-3xl overflow-hidden"
            style={{ background: '#fff', border: '1.5px solid rgba(200,151,42,0.2)', boxShadow: '0 12px 48px rgba(26,92,58,0.10)' }}>
            <div className="relative h-72 sm:h-96 lg:h-full min-h-72 overflow-hidden">
              <Image src={tabs[activeTab].img} alt={tabs[activeTab].label} fill className="object-cover transition-all duration-500"/>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(15,46,26,0.55) 0%,transparent 50%)' }}/>
              <div className="absolute bottom-5 left-5">
                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full" style={{ background: 'rgba(200,151,42,0.85)' }}>
                  {tabs[activeTab].label}
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-10">
              <div className="inline-flex p-3 rounded-2xl mb-5" style={{ background: `${tabs[activeTab].iconColor}18` }}>
                {React.createElement(tabs[activeTab].icon, { className: 'w-6 h-6', style: { color: tabs[activeTab].iconColor } })}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: '#0f2e1a' }}>{tabs[activeTab].heading}</h3>
              <p className="leading-relaxed mb-6 text-sm sm:text-base" style={{ color: '#5a7060' }}>{tabs[activeTab].body}</p>
              <ul className="space-y-3 mb-8">
                {tabs[activeTab].pts.map((p, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-medium" style={{ color: '#2e4e34' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,92,58,0.12)' }}>
                      <Check className="w-3 h-3" style={{ color: '#1a5c3a' }}/>
                    </div>
                    {p}
                  </li>
                ))}
              </ul>
              <button onClick={() => setIsInquiryOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#1a5c3a,#2d7a50)', boxShadow: '0 4px 16px rgba(26,92,58,0.35)' }}>
                Book Your Seat <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          </div>

          {/* CTA band */}
          <div className="mt-14 rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#0f2e1a,#1a5c3a)' }}>
            <StarPattern className="absolute -top-10 -right-10 w-64 h-64 text-white opacity-5"/>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#c8972a' }}>Limited Time Offer</p>
            <h3 className="text-2xl sm:text-4xl font-black text-white mb-3">Ready to Experience Premium Living?</h3>
            <p className="mb-8 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>Book now and enjoy 30% off on grand opening — first come, first served</p>
            <button onClick={() => setIsInquiryOpen(true)}
              className="px-10 py-4 rounded-2xl font-black text-base transition-all hover:scale-105"
              style={{ background: '#c8972a', color: '#0f2e1a', boxShadow: '0 6px 24px rgba(200,151,42,0.5)' }}>
              Book Your Seat Now
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-16 sm:py-24" style={{ background: '#faf8f3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#c8972a' }}>Why Choose KGF</p>
            <h2 className="text-3xl sm:text-5xl font-black" style={{ color: '#0f2e1a' }}>Hostel Salient Features</h2>
            <Divider/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((f, i) => (
              <div key={i} className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ background: '#fff', border: '1.5px solid rgba(200,151,42,0.18)', boxShadow: '0 2px 12px rgba(26,92,58,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='rgba(26,92,58,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(200,151,42,0.18)'}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(26,92,58,0.08)' }}>
                  <f.icon className="w-5 h-5" style={{ color: '#1a5c3a' }}/>
                </div>
                <p className="text-sm font-semibold leading-snug" style={{ color: '#2e4e34' }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AMENITIES ═══ */}
      <section style={{ background: '#f0ebe0' }} className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#c8972a' }}>Fully Furnished</p>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: '#0f2e1a' }}>Everything Included</h2>
            <p className="text-sm mt-2" style={{ color: '#5a7060' }}>Nothing extra to buy or arrange</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {amenities.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-200 cursor-default"
                style={{ background: '#fff', border: '1.5px solid rgba(200,151,42,0.18)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(26,92,58,0.35)'; e.currentTarget.style.background='#f5faf5'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(200,151,42,0.18)'; e.currentTarget.style.background='#fff'; }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,92,58,0.1)' }}>
                  <Check className="w-3.5 h-3.5" style={{ color: '#1a5c3a' }}/>
                </div>
                <span className="text-sm font-medium" style={{ color: '#2e4e34' }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-16 sm:py-24 relative overflow-hidden" style={{ background: '#faf8f3' }}>
        <StarPattern className="absolute top-0 right-0 w-80 h-80 text-[#c8972a] opacity-20"/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#c8972a' }}>Limited Time</p>
            <h2 className="text-3xl sm:text-5xl font-black" style={{ color: '#0f2e1a' }}>Special Opening Discount</h2>
            <p className="mt-3 text-sm" style={{ color: '#5a7060' }}>First come, first served — Limited seats available</p>
            <Divider/>
          </div>

          {/* Student-only notice */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-2xl px-5 py-4"
              style={{ background: 'rgba(200,151,42,0.10)', border: '1.5px solid rgba(200,151,42,0.35)' }}>
              <span className="flex-shrink-0 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-white" style={{ background: '#c8972a' }}>Notice</span>
              <p className="text-sm leading-relaxed" style={{ color: '#92681a' }}>
                <span className="font-bold" style={{ color: '#6b4c10' }}>30% discount exclusively for full-time students only.</span>
                {' '}Yeh offer internship students ya working professionals ke liye applicable nahi hai. Valid student ID required at booking.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((p, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: p.featured ? 'linear-gradient(160deg,#0f2e1a,#1a5c3a)' : '#fff',
                  border:     p.featured ? '2px solid #c8972a' : '1.5px solid rgba(200,151,42,0.22)',
                  boxShadow:  p.featured ? '0 16px 48px rgba(26,92,58,0.35)' : '0 4px 20px rgba(26,92,58,0.08)',
                }}>
                {p.featured && <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg,transparent,#c8972a,transparent)' }}/>}
                <div className="p-7 sm:p-8">
                  <span className="inline-block text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                    style={{ background: p.featured ? '#c8972a' : 'rgba(26,92,58,0.1)', color: p.featured ? '#0f2e1a' : '#1a5c3a' }}>
                    {p.tag}
                  </span>
                  <h3 className="text-2xl font-black mb-1" style={{ color: p.featured ? '#fff' : '#0f2e1a' }}>{p.beds} Bed Room</h3>
                  <p className="text-xs uppercase tracking-widest mb-6" style={{ color: p.featured ? 'rgba(255,255,255,0.5)' : '#7a9070' }}>per bed sharing</p>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-black" style={{ fontSize: 'clamp(2rem,5vw,2.8rem)', color: p.featured ? '#c8972a' : '#1a5c3a' }}>₹{p.final.toLocaleString()}</span>
                      <span className="text-sm" style={{ color: p.featured ? 'rgba(255,255,255,0.5)' : '#7a9070' }}>/mo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="line-through text-sm" style={{ color: p.featured ? 'rgba(255,255,255,0.35)' : '#b0a898' }}>₹{p.orig.toLocaleString()}</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background:'rgba(34,197,94,0.15)', color:'#15803d', border:'1px solid rgba(34,197,94,0.3)' }}>Save 30%</span>
                    </div>
                  </div>
                  <div className="my-5" style={{ height:'1px', background: p.featured ? 'rgba(255,255,255,0.1)' : 'rgba(200,151,42,0.15)' }}/>
                  <ul className="space-y-2.5 mb-7">
                    {['All amenities included','Electricity charges included','High-speed WiFi'].map(pt=>(
                      <li key={pt} className="flex items-center gap-2.5 text-xs font-medium" style={{ color: p.featured ? 'rgba(255,255,255,0.7)' : '#4a6741' }}>
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: p.featured ? '#c8972a' : '#1a5c3a' }}/> {pt}
                      </li>
                    ))}
                    <li className="flex items-center gap-2.5 text-xs font-medium" style={{ color: p.featured ? 'rgba(200,151,42,0.85)' : '#c8972a' }}>
                      <Shield className="w-3.5 h-3.5 flex-shrink-0"/> Students only · ID required
                    </li>
                  </ul>
                  <button onClick={() => setIsInquiryOpen(true)}
                    className="w-full py-3.5 rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                    style={p.featured
                      ? { background:'#c8972a', color:'#0f2e1a', boxShadow:'0 4px 18px rgba(200,151,42,0.45)' }
                      : { background:'linear-gradient(135deg,#1a5c3a,#2d7a50)', color:'#fff', boxShadow:'0 4px 14px rgba(26,92,58,0.3)' }}>
                    Book Your Seat →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-10 max-w-2xl mx-auto leading-relaxed" style={{ color: '#a09080' }}>
            * Discount valid for full-time students only. Internship students aur working professionals ke liye regular pricing applicable hogi.
          </p>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-16 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#0f2e1a,#1a5c3a)' }}>
        <StarPattern className="absolute -top-10 -right-10 w-80 h-80 text-white opacity-5"/>
        <StarPattern className="absolute -bottom-10 -left-10 w-64 h-64 text-[#c8972a] opacity-10"/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#c8972a' }}>Get In Touch</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Reach Out To Us</h2>
            <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>We're here to answer all your questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Phone,  label:'Call Us',  lines:['+91 75100 12346','+91 73900 12346'], href:'tel:+917510012346' },
              { icon: Mail,   label:'Email Us', lines:['kgf@gmail.com'],                    href:'mailto:kgf@gmail.com' },
              { icon: MapPin, label:'Visit Us', lines:['Panvel, Maharashtra'],               href:'https://maps.app.goo.gl/KowWiWN1GAkK4kLe6', external:true },
            ].map((c,i)=>(
              <a key={i} href={c.href} target={c.external?'_blank':undefined} rel={c.external?'noopener noreferrer':undefined}
                className="group rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
                style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(8px)' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(200,151,42,0.5)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background:'rgba(200,151,42,0.18)' }}>
                  <c.icon className="w-7 h-7" style={{ color:'#c8972a' }}/>
                </div>
                <h4 className="text-white font-bold text-lg mb-3">{c.label}</h4>
                {c.lines.map(l=><p key={l} className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>{l}</p>)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 sm:py-10" style={{ background:'#060e07', borderTop:'1px solid rgba(200,151,42,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <div className="relative w-7 h-7">
              <StarPattern className="absolute inset-0 text-[#c8972a] w-full h-full"/>
              <Image src="/kgf_2.svg" alt="KGF" fill className="object-contain p-0.5"/>
            </div>
            <span className="font-black text-sm tracking-[0.15em]" style={{ color:'#c8972a' }}>KGF BOYS HOSTEL</span>
          </div>
          <p className="text-sm italic mb-1" style={{ color:'rgba(255,255,255,0.3)' }}>"Let's Join Hands… Form Unity, Form Strength"</p>
          <p className="text-xs" style={{ color:'rgba(255,255,255,0.2)' }}>© 2025 Kokan Global Foundation. All rights reserved.</p>
        </div>
      </footer>

      {/* ═══ INQUIRY MODAL ═══ */}
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          style={{ background:'rgba(15,46,26,0.75)', backdropFilter:'blur(10px)' }}>
          <div className="rounded-3xl max-w-lg w-full shadow-2xl relative max-h-[95vh] overflow-y-auto"
            style={{ background:'#faf8f3', scrollbarWidth:'none' }}>
            <div className="px-6 sm:px-8 pt-7 pb-5 relative"
              style={{ borderBottom:'1px solid rgba(200,151,42,0.2)', background:'linear-gradient(135deg,#0f2e1a,#1a5c3a)', borderRadius:'1.5rem 1.5rem 0 0' }}>
              <StarPattern className="absolute -top-4 -right-4 w-32 h-32 text-white opacity-8"/>
              <button onClick={()=>setIsInquiryOpen(false)}
                className="absolute top-5 right-5 rounded-xl p-1.5"
                style={{ background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.7)' }}>
                <X className="w-4 h-4"/>
              </button>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">Get In Touch</h3>
              <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>Fill out the form and we'll contact you shortly</p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-4">
              {[
                { label:'Full Name',     name:'name',  type:'text',  placeholder:'John Doe',         Icon:User  },
                { label:'Email Address', name:'email', type:'email', placeholder:'john@example.com',  Icon:Mail  },
                { label:'Phone Number',  name:'phone', type:'tel',   placeholder:'+91 XXXXX XXXXX',   Icon:Phone },
              ].map(({label,name,type,placeholder,Icon})=>(
                <div key={name}>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#4a6741' }}>{label}</label>
                  <div className="relative">
                    <input type={type} name={name} value={formData[name]} onChange={handleChange} required placeholder={placeholder} className={inputCls}/>
                    <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:'#a09070' }}/>
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#4a6741' }}>Room Type</label>
                <div className="relative">
                  <select name="roomType" value={formData.roomType} onChange={handleChange} className={inputCls + ' appearance-none cursor-pointer'}>
                    <option value="5-bed">5 Bed Room — ₹4,500/month</option>
                    <option value="4-bed">4 Bed Room — ₹5,000/month</option>
                    <option value="3-bed">3 Bed Room — ₹5,500/month</option>
                  </select>
                  <Home className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#a09070' }}/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color:'#4a6741' }}>
                  Message <span className="font-normal normal-case" style={{ color:'#b0a898' }}>(optional)</span>
                </label>
                <div className="relative">
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="3"
                    placeholder="Any questions or requirements?" className={inputCls + ' resize-none pt-3'}/>
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5" style={{ color:'#a09070' }}/>
                </div>
              </div>

              {submitStatus==='success' && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ background:'rgba(26,92,58,0.1)', border:'1.5px solid rgba(26,92,58,0.3)', color:'#1a5c3a' }}>
                  <Check className="w-4 h-4 flex-shrink-0"/> Inquiry submitted! We'll contact you soon.
                </div>
              )}
              {submitStatus==='error' && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ background:'rgba(185,28,28,0.08)', border:'1.5px solid rgba(185,28,28,0.25)', color:'#b91c1c' }}>
                  <X className="w-4 h-4 flex-shrink-0"/> Failed. Please call us directly.
                </div>
              )}

              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
                style={{ background:'linear-gradient(135deg,#1a5c3a,#2d7a50)', boxShadow:'0 6px 20px rgba(26,92,58,0.38)' }}>
                {isSubmitting
                  ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting...</>
                  : <><span>Submit Inquiry</span><Send className="w-4 h-4"/></>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══ LOGIN MODAL ═══ */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background:'rgba(15,46,26,0.75)', backdropFilter:'blur(10px)' }}>
          <div className="flex items-start justify-center min-h-full p-4 py-8">
            <div className="rounded-3xl max-w-3xl w-full shadow-2xl relative p-6 sm:p-10 my-auto"
              style={{ background:'#faf8f3', border:'1.5px solid rgba(200,151,42,0.25)' }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background:'linear-gradient(90deg,#1a5c3a,#c8972a,#1a5c3a)' }}/>
              <button onClick={()=>setIsLoginOpen(false)}
                className="absolute top-5 right-5 rounded-xl p-1.5"
                style={{ background:'rgba(26,92,58,0.08)', color:'#4a6741' }}>
                <X className="w-4 h-4"/>
              </button>
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-black mb-1" style={{ color:'#0f2e1a' }}>Login Portal</h3>
                <p className="text-sm" style={{ color:'#7a9070' }}>Select your account type to continue</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { href:'https://kokanglobal.org/parent',  icon:User,     label:'Parent Login',  desc:'Access parent portal',  color:'#1a5c3a', light:'rgba(26,92,58,0.08)' },
                  { href:'https://kokanglobal.org/student', icon:BookOpen, label:'Student Login', desc:'Access student portal', color:'#c8972a', light:'rgba(200,151,42,0.10)' },
                  { href:'https://kokanglobal.org/warden',  icon:Shield,   label:'Warden Login',  desc:'Access warden portal',  color:'#6d28d9', light:'rgba(109,40,217,0.08)' },
                ].map((item,i)=>(
                  <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="group rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1"
                    style={{ background:'#fff', border:'1.5px solid rgba(200,151,42,0.2)', boxShadow:'0 2px 12px rgba(26,92,58,0.06)' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=item.color}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(200,151,42,0.2)'}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background:item.light }}>
                      <item.icon className="w-8 h-8" style={{ color:item.color }}/>
                    </div>
                    <h4 className="font-bold text-base mb-1" style={{ color:'#0f2e1a' }}>{item.label}</h4>
                    <p className="text-xs mb-4" style={{ color:'#7a9070' }}>{item.desc}</p>
                    <span className="text-xs font-bold flex items-center justify-center gap-1" style={{ color:item.color }}>
                      Login Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}