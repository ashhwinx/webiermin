import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas & Physics Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Physics Configuration
    const GRID_SPACING = 40;
    const MOUSE_RADIUS = 200; 
    const MOUSE_FORCE = 1.5; 
    const SPRING_STIFFNESS = 0.08; 
    const FRICTION = 0.90; 
    
    // Dot Configuration
    const BASE_RADIUS = 1.5;
    const MAX_RADIUS = 4.5; 
    
    const mouse = { x: -1000, y: -1000 };

    class Dot {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      
      constructor(x: number, y: number) {
        this.x = this.originX = x;
        this.y = this.originY = y;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // 1. Calculate Distance to Mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        // 2. Repulsion (Push) if within radius
        if (distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
          const dist = Math.sqrt(distSq);
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS; 
          
          const push = force * MOUSE_FORCE;
          
          this.vx -= Math.cos(angle) * push;
          this.vy -= Math.sin(angle) * push;
        }

        // 3. Spring (Pull back to origin)
        const dxOrigin = this.originX - this.x;
        const dyOrigin = this.originY - this.y;
        
        this.vx += dxOrigin * SPRING_STIFFNESS;
        this.vy += dyOrigin * SPRING_STIFFNESS;

        // 4. Friction (Dampen oscillation)
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        // 5. Update Position
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(context: CanvasRenderingContext2D) {
        // Calculate displacement for styling
        const dX = this.x - this.originX;
        const dY = this.y - this.originY;
        const displacement = Math.sqrt(dX * dX + dY * dY);
        
        const factor = Math.min(displacement / 30, 1);

        // Interpolate Size
        const size = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * factor;

        // Interpolate Color
        // Base: 0, 0, 0, 0.15
        // Target: Accent2 (#3533cd) -> 53, 51, 205
        const r = 53 * factor;
        const g = 51 * factor;
        const b = 205 * factor;
        const a = 0.15 + (0.85 * factor);

        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        
        context.beginPath();
        context.arc(this.x, this.y, size, 0, Math.PI * 2);
        context.fill();
      }
    }

    let dots: Dot[] = [];

    const init = () => {
      dots = [];
      const cols = Math.floor(width / GRID_SPACING) + 2;
      const rows = Math.floor(height / GRID_SPACING) + 2;
      const offsetX = (width - ((cols - 1) * GRID_SPACING)) / 2;
      const offsetY = (height - ((rows - 1) * GRID_SPACING)) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GRID_SPACING + offsetX;
          const y = r * GRID_SPACING + offsetY;
          dots.push(new Dot(x, y));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < dots.length; i++) {
        dots[i].update();
        dots[i].draw(ctx);
      }
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    handleResize();
    const animId = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Text Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 }); // Wait 0.5s as requested

      // Cinematic Blur-In Effect
      // Initial state is handled by CSS or gsap.set effectively by the 'from' tween
      tl.from('.hero-title-char', {
        opacity: 0,
        filter: 'blur(20px)',
        scale: 1.15,
        y: 10,
        duration: 2,
        ease: 'power4.out',
        stagger: 0.1, // Slight stagger for character-by-character focus
      })
      .from('.hero-tagline', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'power3.out'
      }, '-=1.5')
      .from('.hero-desc-container', {
        opacity: 0,
        x: -20,
        duration: 1.5,
        ease: 'power3.out'
      }, '-=1.5')
      .from('.hero-meta', {
        opacity: 0,
        y: -10,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=1.5');

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-[#f6f6fa] overflow-hidden text-primary"
    >
      {/* Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none select-none">
        
        {/* Top Meta Details */}
        <div className="absolute top-28 w-full max-w-[90vw] flex justify-between font-display text-xs md:text-sm font-semibold tracking-widest uppercase opacity-40 hero-meta">
          <span>Est. 2025</span>
          <span>Global Digital Agency</span>
        </div>

        {/* Massive Headline */}
        <div className="flex flex-col items-center mix-blend-multiply">
          <h1 className="font-display font-bold text-[18vw] leading-[0.8] tracking-tighter text-black transform scale-x-125 origin-center hero-title overflow-visible whitespace-nowrap">
            {/* Split characters for granular control */}
            {['W','E','B','I','E','R'].map((char, i) => (
              <span 
                key={i} 
                className="hero-title-char inline-block will-change-[filter,transform,opacity]"
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
        
        {/* Sub-content Container */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 max-w-4xl mix-blend-multiply">
            
            <h2 className="hero-tagline font-display font-bold text-lg md:text-xl text-accent2 tracking-[0.25em] uppercase md:w-1/3 text-right pt-2">
            Beyond Digital<br/>Boundaries
            </h2>
            
            <div className="hidden md:block w-[1px] h-20 bg-black/20 hero-desc-container"></div>

            <div className="hero-desc-container md:w-2/3 pl-4 md:border-l-0">
              <p className="font-display font-medium text-lg md:text-2xl text-black leading-relaxed">
                We exist to disrupt the ordinary. Crafting immersive digital ecosystems where strategy meets pure aesthetic chaos.
              </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;