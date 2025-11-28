import React, { useRef } from 'react';
import { Trophy, Globe, Users, Zap, Star, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Types
interface Stat {
  id: string;
  type: string;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  desc: string;
  colSpan: string;
  icon: React.ElementType | null;
}

// 2. Data
const stats: Stat[] = [
  { 
    id: "metric-01",
    type: "primary", 
    value: 40, 
    suffix: "M+", 
    label: "Economic Impact", 
    sub: "Revenue Unlocked",
    desc: "We don't just design; we drive growth. Our strategic interventions have unlocked over $40M in new value streams.",
    colSpan: "md:col-span-2",
    icon: Zap
  },
  { 
    id: "metric-02",
    type: "standard", 
    value: 50, 
    suffix: "+", 
    label: "Products Shipped", 
    sub: "Digital Experiences",
    desc: "From 0 to 1. Full-cycle product development.",
    colSpan: "md:col-span-1",
    icon: null
  },
  { 
    id: "metric-03",
    type: "standard", 
    value: 14, 
    suffix: "", 
    label: "Global Awards", 
    sub: "Industry Recognition",
    desc: "Awwwards, FWA & CSSDA winners.",
    colSpan: "md:col-span-1",
    icon: Trophy
  },
  { 
    id: "metric-04",
    type: "wide", 
    value: 8, 
    suffix: "", 
    label: "Global Footprint", 
    sub: "Countries Served",
    desc: "Our code runs in 12+ time zones. We build localized experiences with a global mindset, serving users from Tokyo to San Francisco.",
    colSpan: "md:col-span-2",
    icon: Globe
  },
  { 
    id: "metric-05",
    type: "standard", 
    value: 98, 
    suffix: "%", 
    label: "Retention Rate", 
    sub: "Client Satisfaction",
    desc: "Building legacy through long-term trust.",
    colSpan: "md:col-span-1",
    icon: Star
  },
  { 
    id: "metric-06",
    type: "standard", 
    value: 25, 
    suffix: "+", 
    label: "Team Experts", 
    sub: "Designers & Engineers",
    desc: "A multidisciplinary collective of obsessives.",
    colSpan: "md:col-span-1",
    icon: Users
  }
];

const Achievements = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Header Animation (Slide Up)
    gsap.from(".impact-header", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
      }
    });

    // 2. Cards Stagger Animation
    gsap.from(".bento-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 85%",
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-white text-[#1a1a1a] py-32 px-4 md:px-12 lg:px-24 font-sans overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- HEADER (Updated Layout) --- */}
        {/* Added: items-center (mobile), md:items-end (desktop), text-center (mobile), md:text-left (desktop) */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 border-b border-black/10 pb-8 text-center md:text-left">
          
          <div className="w-full md:w-auto">
            <h2 className="impact-header font-display text-7xl md:text-9xl font-black uppercase tracking-tighter text-[#3533CD] leading-[0.85]">
              Our <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Impact
              </span>
            </h2>
          </div>

          <div className="impact-header flex items-center gap-4 mt-8 md:mt-0">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FFC947] rounded-full animate-ping"></span>
                <span className="w-2 h-2 bg-[#FFC947] rounded-full absolute"></span>
             </div>
             <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50">
               / Performance 2024
             </p>
          </div>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <BentoCard key={stat.id} stat={stat} />
          ))}
        </div>

      </div>
    </section>
  );
};

/* --------------------------------------------------
   SUB-COMPONENT: BENTO CARD
   Handles its own hover logic & number counting
-------------------------------------------------- */
const BentoCard = ({ stat }: { stat: Stat }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // GSAP Animations for Card
  useGSAP(() => {
    const card = cardRef.current;
    const numberEl = numberRef.current;
    if (!card || !numberEl) return;

    // 1. Number Counter Animation using ScrollTrigger
    gsap.fromTo(numberEl, 
      { textContent: 0 },
      {
        textContent: stat.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 }, // Snap to whole numbers
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        }
      }
    );

    // 2. Mouse Move Spotlight Effect
    const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(x);
      yTo(y);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={cardRef}
      id='impact'
      className={`
        bento-card group relative 
        bg-[#fcfcfc] border border-black/5 rounded-[2rem] 
        p-8 md:p-10 flex flex-col justify-between overflow-hidden
        transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-black/10
        ${stat.colSpan}
      `}
    >
      {/* SPOTLIGHT GRADIENT */}
      <div 
        ref={spotlightRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3533cd]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* TOP: Header Info */}
      <div className="relative z-10 flex justify-between items-start mb-12">
        <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40 border border-black/5 px-2 py-1 rounded-md w-fit group-hover:bg-[#3533cd] group-hover:text-white group-hover:border-transparent transition-colors duration-300">
                {stat.sub}
            </span>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#1a1a1a]">
                {stat.label}
            </h3>
        </div>
        
        {/* Icon Container */}
        {stat.icon && (
            <div className="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[#1a1a1a] group-hover:bg-[#3533cd] group-hover:text-white transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                <stat.icon size={20} />
            </div>
        )}
      </div>

      {/* MIDDLE: Huge Number */}
      <div className="relative z-10 mb-8">
        <div className="flex items-baseline">
            <span 
              ref={numberRef}
              className={`font-display font-black tracking-tighter text-[#1a1a1a] leading-[0.9] group-hover:text-[#3533cd] transition-colors duration-300 ${stat.type === 'primary' ? 'text-7xl md:text-9xl' : 'text-6xl md:text-7xl'}`}
            >
                0
            </span>
            <span className={`font-display font-thin text-[#1a1a1a]/40 ml-1 ${stat.type === 'primary' ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>
                {stat.suffix}
            </span>
        </div>
      </div>

      {/* BOTTOM: Description */}
      <div className="relative z-10">
        <div className="w-full h-[1px] bg-black/5 mb-6 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        <p className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed font-medium max-w-md group-hover:text-[#1a1a1a] transition-colors duration-300">
            {stat.desc}
        </p>
      </div>
      
      {/* HOVER ARROW (Bottom Right) */}
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10">
         <div className="w-10 h-10 rounded-full bg-[#3533cd] text-white flex items-center justify-center shadow-lg">
            <ArrowUpRight size={20} />
         </div>
      </div>

    </div>
  );
};

export default Achievements;