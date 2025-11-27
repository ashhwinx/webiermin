import React, { useEffect ,useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Process from './components/Process';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false);

    // Initialize Lenis Smooth Scroll
    useEffect(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });
  
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      // Integrate Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
  
      
  
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
  
      gsap.ticker.lagSmoothing(0);
  
      // Simulate loading for entry animations
      setTimeout(() => setIsLoading(false), 500);
  
      return () => {
        lenis.destroy();
        gsap.ticker.remove(lenis.raf);
      };
    }, []);
  
    if (isLoading) {
      return (
        <div className="fixed inset-0 bg-bg z-50 flex items-center justify-center">
          <div className="animate-pulse">
            <h1 className="font-display text-4xl text-primary tracking-tighter">WEBIER</h1>
          </div>
        </div>
      );
    }

  return (
    <div className="bg-bg text-dark min-h-screen relative font-sans selection:bg-accent-cyan selection:text-white">
      {/* <CustomCursor /> */}
      <Navbar />
      
      <main>
        <Hero />
        <Philosophy/>
        <Services />
        <Process />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;





