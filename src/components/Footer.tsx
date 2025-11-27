import React, { useRef, useState } from "react";
import { ArrowUpRight, Copy, Check, Twitter, Instagram, Linkedin, Dribbble, Github } from "lucide-react";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "hello@webier.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-[#3533cd] text-white  pb-24 overflow-hidden">

      {/* Ticker (Still works but inside normal flow) */}
      <div className="w-full py-6 bg-black/20 border-b border-white/10 backdrop-blur-sm overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="font-display text-4xl font-bold uppercase tracking-tight text-white/90">
                Let's Create Impact
              </span>
              <StarIcon />
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-28">

        {/* CONTACT CTA */}
       

        {/* GRID */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-20">

          {/* manifesto */}
          <div className="flex flex-col gap-8 max-w-xl">
            <h3 className="font-display text-6xl md:text-7xl font-black leading-[0.9]">
              Webier<br />Agency.
            </h3>
            <p className="font-sans text-white/80 text-xl leading-relaxed max-w-md font-light">
              We exist to eliminate the gap between <span className="font-bold">human intent</span> and <span className="font-bold">digital execution</span>.
            </p>
          </div>

          {/* columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
            <FooterColumn title="Navigation" links={["Work", "Services", "Agency", "Careers"]} />
            <FooterColumn title="Socials" links={["Instagram", "Twitter", "LinkedIn", "Awwwards"]} />
            <FooterColumn title="Legal" links={["Privacy", "Terms"]} />
          </div>
        </div>

        {/* bottom icons */}
        <div className="flex gap-6 mt-20">
          <MagneticSocialIcon icon={<Instagram size={20} />} />
          <MagneticSocialIcon icon={<Twitter size={20} />} />
          <MagneticSocialIcon icon={<Linkedin size={20} />} />
          <MagneticSocialIcon icon={<Dribbble size={20} />} />
          <MagneticSocialIcon icon={<Github size={20} />} />
        </div>

      </div>

      {/* Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center opacity-10 pointer-events-none">
        <h1 className="font-display font-black text-[22vw] tracking-tighter text-white leading-none translate-y-[20%]">
          WEBIER
        </h1>
      </div>

    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-6">
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">{title}</span>
    {links.map((item) => (
      <a key={item} href="#" className="text-2xl md:text-3xl font-bold text-white/90 hover:text-white transition">
        {item}
      </a>
    ))}
  </div>
);

const StarIcon = () => (
  <svg width="24" height="24" fill="currentColor" className="text-white/50">
    <path d="M12 0L14.6 9.4 24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6L12 0z" />
  </svg>
);

const MagneticSocialIcon = ({ icon }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <a
      href="#"
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        setPos({
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.5,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.5,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#3533cd] transition-all"
    >
      {icon}
    </a>
  );
};

export default Footer;
