import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Splitting & Setup
      const words = textRef.current.innerText.split(' ');
      textRef.current.innerHTML = words
        .map((word) => `<span class="word inline-block opacity-10 cursor-default transition-colors duration-200" style="transform-origin: center bottom;">${word}&nbsp;</span>`)
        .join('');

      const wordElements = textRef.current.querySelectorAll('.word');

      // 2. Main Scroll Animation (The Reveal)
      // Title slide up
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Line expansion
      gsap.fromTo(lineRef.current,
        { width: 0 },
        {
          width: "4rem",
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Paragraph Stagger Reveal
      gsap.fromTo(wordElements, 
        { 
          opacity: 0.1, 
          y: 20, // Start slightly lower for a "float up" effect
          filter: "blur(4px)" // Cinematic blur start
        },
        {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 1, // Smooth scrubbing
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          color: '#000000', // Target text color
          stagger: 0.05,
          ease: "power2.out"
        }
      );

      // 3. Hover Interactions (The "Cool" Factor)
      wordElements.forEach((word) => {
        word.addEventListener('mouseenter', () => {
          gsap.to(word, {
            color: '#3533cd', // Change to Primary Blue
            y: -5,            // Lift up
            scale: 1.1,       // Slight zoom
            skewX: -10,       // Italic/Tech skew
            textShadow: "0px 5px 10px rgba(53, 51, 205, 0.3)", // Glow
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });

        word.addEventListener('mouseleave', () => {
          gsap.to(word, {
            color: '#000000', // Back to Black
            y: 0,
            scale: 1,
            skewX: 0,
            textShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 4. Mouse Follower Gradient Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glowRef.current, {
        x: x,
        y: y,
        duration: 1, // Laggy follow for smoothness
        ease: "power2.out"
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-[#f6f6fa] overflow-hidden"
    >
      {/* Background Interactive Glow */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#148ac4] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column: Title */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 
              ref={titleRef}
              className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter text-[#148ac4] leading-none"
            >
              The <br/>
              <span className="text-[#000000]">Philosophy</span>
            </h2>
            {/* Animated Divider Line */}
            <div ref={lineRef} className="h-1.5 bg-[#3533cd] mt-6 rounded-full"></div>
          </div>
        </div>
        
        {/* Right Column: Interactive Text */}
        <div className="lg:col-span-8">
          <p
            ref={textRef}
            className="font-sans text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] text-[#000000] tracking-tight"
          >
            We believe that digital products should be more than just functional. They should be intuitive, immersive, and memorable. We blend strategy with art to create websites that don't just load—they live.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;