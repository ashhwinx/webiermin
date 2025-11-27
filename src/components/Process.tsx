import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  { 
    id: "01",
    title: "Discovery",
    subtitle: "The Foundation",
    desc: "We don't start with code; we start with questions. We immerse ourselves in your ecosystem to uncover the raw truths of your business. This isn't just about requirements gathering—it's about understanding the 'why' behind the 'what'.",
    tags: ["Market Research", "Stakeholder Interviews", "Competitor Audit"]
  },
  { 
    id: "02",
    title: "Strategy",
    subtitle: "The Blueprint",
    desc: "Data meets intuition. We build a strategic roadmap that defines not just where we're going, but exactly how we'll get there. We define user personas, map out journeys, and establish the technical architecture.",
    tags: ["User Journey Maps", "Information Architecture", "Tech Stack Selection"]
  },
  { 
    id: "03",
    title: "Design",
    subtitle: "Visual Language",
    desc: "We strip away the noise to reveal the signal. Our design phase focuses on creating intuitive, beautiful interfaces that feel inevitable. We prototype, test, and iterate until every interaction feels natural.",
    tags: ["UI/UX Design", "Design Systems", "Interactive Prototyping"]
  },
  { 
    id: "04",
    title: "Development",
    subtitle: "The Engine",
    desc: "Clean, scalable, and secure. We translate designs into fluid digital experiences using modern architectures. We prioritize performance, accessibility, and clean code that scales with your business.",
    tags: ["React / Next.js", "API Integration", "Performance Optimization"]
  },
  { 
    id: "05",
    title: "Launch",
    subtitle: "Liftoff",
    desc: "Deployment is just the beginning. We manage the launch process with military precision, ensuring zero downtime. Post-launch, we monitor analytics and user feedback to continuously refine the product.",
    tags: ["QA Testing", "Cloud Deployment", "Analytics Setup"]
  }
];

const Process = () => {
  return (
    <section 
      className="relative w-full bg-[#f6f6fa] text-black py-24 px-4 md:px-12 lg:px-24"
      id="process"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header - Signature Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-black/10 pb-8">
            <div>
                <h2 className="font-display text-7xl md:text-9xl font-black uppercase tracking-tighter text-black leading-[0.85]">
                Our <br/>
                <span className="text-transparent" style={{ WebkitTextStroke: "1px black" }}>Process</span>
                </h2>
            </div>
            <div className="flex items-center gap-4 mt-8 md:mt-0">
                <span className="w-2 h-2 bg-[#3533cd] rounded-full animate-ping"></span>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50">
                    / Workflow Engine
                </p>
            </div>
        </div>

        {/* Simple Syllabus List Layout */}
        <div className="flex flex-col border-t border-black/10">
            {steps.map((step) => (
                <div 
                    key={step.id} 
                    className="group relative border-b border-black/10 transition-all duration-500 hover:bg-white"
                >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-20 py-16 px-4">
                        
                        {/* 01. Number */}
                        <div className="flex-shrink-0">
                             <span className="font-display text-6xl md:text-8xl font-black text-black/5 group-hover:text-[#3533cd] transition-colors duration-300 select-none">
                                {step.id}
                             </span>
                        </div>
                        
                        {/* 02. Content */}
                        <div className="flex-1 flex flex-col pt-2">
                             <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-6">
                                <h3 className="font-display text-4xl md:text-5xl font-bold text-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                                    {step.title}
                                </h3>
                                <span className="font-serif italic text-xl text-black/40">
                                    {step.subtitle}
                                </span>
                             </div>

                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <p className="font-sans text-lg md:text-xl text-black/60 leading-relaxed font-light">
                                    {step.desc}
                                </p>
                                
                                {/* Deliverables Tags */}
                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-black/30 mb-4">
                                        Deliverables
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {step.tags.map((tag, i) => (
                                            <span 
                                                key={i}
                                                className="px-3 py-1 bg-[#f6f6fa] border border-black/5 rounded-full font-mono text-xs uppercase tracking-wide text-black/60 group-hover:border-[#3533cd]/20 group-hover:text-[#3533cd] transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* 03. Icon Arrow */}
                        <div className="hidden lg:block pt-4">
                             <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#3533cd] group-hover:border-transparent transition-all duration-300">
                                <ArrowUpRight className="text-black/40 group-hover:text-white transition-colors" size={24} />
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

export default Process;