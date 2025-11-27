import React, { useRef, useEffect } from 'react';
import { ArrowRight, Globe, Smartphone, Wand2, PenTool, ShieldCheck, Rocket, Clock, Users, FileText, Hash } from 'lucide-react';

const steps = [
  { 
    id: "01",
    title: "Web Development",
    subtitle: "Build for Scale",
    desc: "High-performance websites crafted for speed, security, and conversions using modern frameworks.",
    duration: "4–8 Weeks",
    team: ["Full Stack Dev"],
    icon: <Globe className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-600",
    borderColor: "group-hover:border-blue-500/30",
    fileType: "website_core.tsx"
  },
  { 
    id: "02",
    title: "App Development",
    subtitle: "Mobile First",
    desc: "Building seamless, intuitive mobile experiences for iOS, Android, and cross-platform using React Native.",
    duration: "6–12 Weeks",
    team: ["App Developer"],
    icon: <Smartphone className="w-5 h-5" />,
    color: "bg-purple-50 text-purple-600",
    borderColor: "group-hover:border-purple-500/30",
    fileType: "app_build.ts"
  },
  { 
    id: "03",
    title: "UI/UX Design",
    subtitle: "Design That Converts",
    desc: "Human-centered design for interfaces that look stunning and feel effortless, increasing engagement.",
    duration: "2–4 Weeks",
    team: ["UI/UX Designer"],
    icon: <PenTool className="w-5 h-5" />,
    color: "bg-pink-50 text-pink-600",
    borderColor: "group-hover:border-pink-500/30",
    fileType: "design_system.fig"
  },
  { 
    id: "04",
    title: "SEO & Performance",
    subtitle: "Visibility That Matters",
    desc: "Boost your rankings with technical SEO, performance optimization, and content structuring.",
    duration: "1–3 Months (Ongoing)",
    team: ["SEO Specialist"],
    icon: <Rocket className="w-5 h-5" />,
    color: "bg-orange-50 text-orange-600",
    borderColor: "group-hover:border-orange-500/30",
    fileType: "seo_report.pdf"
  },
  { 
    id: "05",
    title: "Branding",
    subtitle: "Identity That Sticks",
    desc: "Your brand’s visual language—logo, colors, typography, and messaging—designed with precision.",
    duration: "3–6 Weeks",
    team: ["Brand Designer"],
    icon: <Wand2 className="w-5 h-5" />,
    color: "bg-green-50 text-green-600",
    borderColor: "group-hover:border-green-500/30",
    fileType: "brand_guide.pdf"
  },
  { 
    id: "06",
    title: "Maintenance & Support",
    subtitle: "Always Up & Running",
    desc: "Continuous monitoring, updates, bug fixes, and enhancements to keep your product performing.",
    duration: "Monthly",
    team: ["Support Engineer"],
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "bg-gray-50 text-gray-600",
    borderColor: "group-hover:border-gray-500/30",
    fileType: "update_logs.json"
  }
];

const Services = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          animateCards();
          ticking = false;
        });
        ticking = true;
      }
    };

    const animateCards = () => {
      const cards = cardsRef.current;
      
      cards.forEach((card, index) => {
        if (!card) return;
        
        const nextCard = cards[index + 1];
        const cardInner = card.querySelector('.process-card-inner');
        
        if (!cardInner) return;

        // Reset state if no next card
        if (!nextCard) {
          cardInner.style.transform = `scale(1) translateY(0)`;
          cardInner.style.opacity = `1`;
          cardInner.style.filter = `brightness(1)`;
          return;
        }

        const rect = card.getBoundingClientRect();
        const nextRect = nextCard.getBoundingClientRect();
        
        const distance = nextRect.top - rect.top;
        const startSquashDistance = 800; 

        if (distance < startSquashDistance && distance > 0) {
          const progress = 1 - (distance / startSquashDistance);
          const safeProgress = Math.max(0, Math.min(progress, 1));
          
          const scale = 1 - (safeProgress * 0.05); 
          // FIX: Opacity ko '1' rakha hai taaki card transparent na ho
          const opacity = 1; 
          const brightness = 1 - (safeProgress * 0.1); // Thoda dark hoga depth ke liye, par transparent nahi
          const y = safeProgress * 10; 

          cardInner.style.transform = `scale(${scale}) translateY(${y}px)`;
          cardInner.style.opacity = `${opacity}`;
          cardInner.style.filter = `brightness(${brightness})`;
        } else if (distance <= 0) {
             // Sirf tab hide kare jab poora cover ho jaye
             cardInner.style.opacity = `0`;
        } else {
            cardInner.style.transform = `scale(1) translateY(0)`;
            cardInner.style.opacity = `1`;
            cardInner.style.filter = `brightness(1)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animateCards(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen font-sans bg-slate-50"
      id="process"
    >
      {/* 1. Header Section */}
      <div className="relative w-full bg-slate-100 py-24 px-4 md:px-8 lg:px-12 border-b border-slate-200 z-20">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end">
            <div>
                <h2 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter text-slate-900 leading-[0.85]">
                Our <br/>
                <span className="text-transparent" style={{ WebkitTextStroke: "1px #0f172a" }}>Process</span>
                </h2>
            </div>
            
            <div className="flex items-center gap-4 mt-8 md:mt-0">
                <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></span>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                    / Workflow Engine
                </p>
            </div>
         </div>
      </div>

      {/* 2. Scrolling Section */}
      <div className="relative w-full bg-slate-100 py-20 px-4 md:px-8 lg:px-12 pb-40">
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
            {steps.map((step, index) => (
                <div 
                    key={step.id}
                    ref={el => cardsRef.current[index] = el}
                    className="sticky w-full"
                    style={{ 
                        // Overlap logic
                        top: `calc(120px + ${index * 15}px)`, 
                        zIndex: index + 1,
                        marginBottom: '40px' 
                    }}
                >
                    <div className={`process-card-inner group relative bg-white rounded-xl border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out will-change-transform overflow-hidden ${step.borderColor}`}>
                        
                        {/* Mac Window Header */}
                        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-slate-50/80 backdrop-blur-md select-none">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/5" /> 
                                <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/5" /> 
                                <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/5" /> 
                            </div>
                            <div className="flex items-center gap-2 opacity-50">
                                <Hash size={12} />
                                <span className="font-mono text-[11px] font-medium text-slate-500">
                                    {step.fileType}
                                </span>
                            </div>
                            <div className="w-10"></div> 
                        </div>

                        {/* Content Layout */}
                        <div className="flex flex-col lg:flex-row min-h-[400px]">
                            
                            {/* LEFT SIDEBAR */}
                            <div className="w-full lg:w-1/3 bg-slate-50/30 border-b lg:border-b-0 lg:border-r border-slate-100 p-8 flex flex-col justify-between relative">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${step.color.replace('text', 'bg').split(' ')[0]}`}></div>
                                
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                         <span className="font-display text-7xl font-bold text-slate-200 leading-none select-none">
                                            {step.id}
                                        </span>
                                        <div className={`p-3 rounded-xl ${step.color} bg-opacity-10 border border-slate-200/60`}>
                                            {step.icon}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <Clock size={16} className="text-slate-400 mt-1" />
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Timeline</p>
                                                <p className="font-sans text-sm font-semibold text-slate-700">{step.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <Users size={16} className="text-slate-400 mt-1" />
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Specialists</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {step.team.map((person, i) => (
                                                        <span key={i} className="text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm">{person}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 lg:mt-0">
                                     <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group/link">
                                        <FileText size={12} className="group-hover/link:text-blue-600" /> View_Specs.pdf
                                     </button>
                                </div>
                            </div>

                            {/* RIGHT CONTENT */}
                            <div className="w-full lg:w-2/3 p-8 md:p-12 flex flex-col bg-white justify-center">
                                <div>
                                    <span className={`inline-block px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest mb-6 ${step.color.replace('text', 'bg').replace('bg-', 'bg-opacity-10 ')}`}>
                                        {step.subtitle}
                                    </span>
                                    
                                    <h3 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-[1.1]">
                                        {step.title}
                                    </h3>
                                    
                                    <p className="font-sans text-lg text-slate-500 leading-relaxed max-w-xl mb-10 font-normal">
                                        {step.desc}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 group/btn cursor-pointer w-fit">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover/btn:bg-slate-900 group-hover/btn:text-white group-hover/btn:border-transparent transition-all duration-300 shadow-sm">
                                            <ArrowRight size={20} />
                                        </div>
                                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400 group-hover/btn:text-slate-900 transition-colors">
                                            Explore Phase
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;