'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Gem, Crown, Stars, Globe, Users, Heart, Award, 
  Phone, Instagram, Mail, MapPin, ArrowRight, 
  CheckCheck, Loader2, Menu, X, ImageOff 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-STAT
// Typography Personality: refined

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-dark/80 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = {
    name: "Iyenemi Beads Collection",
    tagline: "Where Heritage Meets Elegance",
    description: "Exquisite traditional beadwork and cultural wedding styling for royalty, celebrities, and discerning families across the globe.",
    region: "nigeria",
    industry: "fashion"
  };

  const colors = {
    primary: "#B04B3D",
    secondary: "#FDFBF7",
    accent: "#D4AF37"
  };

  const navLinks = [
    { name: "The Collection", href: "#products" },
    { name: "Our Heritage", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Consultation", href: "#contact" }
  ];

  const products = [
    { name: "Signature Royal Chieftaincy Set", price: "₦850,000", description: "Multi-layered polished coral neckpiece with matching wrist beads and anklets.", url: "https://images.unsplash.com/photo-1758995115659-06a6cb5787eb?auto=format&fit=crop&q=80" },
    { name: "Luxury Bridal Ostrich Fan", price: "₦180,000", description: "Hand-beaded custom bridal fan featuring premium ostrich feathers and intricate crystal detailing.", url: "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?auto=format&fit=crop&q=80" },
    { name: "The Iyenemi Heritage Suite", price: "₦550,000", description: "Complete bridal bead ensemble including crown, necklace, and waist beads.", url: "https://images.unsplash.com/photo-1661332426053-bc396192b0d3?auto=format&fit=crop&q=80" },
    { name: "Celebrity Milestone Collection", price: "₦1,200,000", description: "Bespoke, heavy-gauge coral arrangements designed specifically for red carpet moments.", url: "https://images.unsplash.com/photo-1630533597763-81319c3e4d3c?auto=format&fit=crop&q=80" }
  ];

  const features = [
    { title: "Bespoke Artistry", description: "Every bead is hand-selected and strung to create a unique narrative for each client.", icon: Gem },
    { title: "Cultural Styling", description: "Professional heritage consultation to ensure your look is as authentic as it is elegant.", icon: Crown },
    { title: "Celebrity Trusted", description: "The choice of families and celebrities for significant cultural milestones and weddings.", icon: Stars },
    { title: "Global Logistics", description: "Exporting the beauty of Nigerian heritage to clients in the UK, US, and beyond.", icon: Globe }
  ];

  const testimonials = [
    { name: "Adunni Ade", role: "Celebrity Client", text: "The beads were the highlight of my wedding. The weight and the shine of the corals are unlike anything I have seen before." },
    { name: "Dr. Amaka Ihejirika", role: "Lagos Bride", text: "Iyenemi's attention to detail is unmatched. She understood my cultural requirements perfectly and delivered a masterpiece." },
    { name: "Chief Tonye Douglas", role: "Traditional Leader", text: "True professional. The chieftaincy set was heavy, authentic, and commanded respect at the ceremony." }
  ];

  const stats = [
    { number: "63k", label: "Global Followers" },
    { number: "500+", label: "Brides Styled" },
    { number: "15+", label: "Years Experience" }
  ];

  // --- Section Reveals ---
  const heroReveal = useScrollReveal(0.1);
  const featureReveal = useScrollReveal(0.15);
  const galleryReveal = useScrollReveal(0.15);
  const productReveal = useScrollReveal(0.15);
  const aboutReveal = useScrollReveal(0.15);
  const testimonialReveal = useScrollReveal(0.15);
  const contactReveal = useScrollReveal(0.15);

  return (
    <main className="bg-dark min-h-screen text-white/90 selection:bg-accent selection:text-black">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-5 ${scrolled ? 'bg-dark/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold tracking-tighter text-white">IYENEMI</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-medium leading-none">Beads Collection</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} className="text-xs uppercase tracking-widest font-semibold hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all">
              Book Call
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-dark transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-2xl font-bold">IYENEMI</span>
            <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32}/></button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} onClick={() => setMobileMenu(false)} className="text-3xl font-heading font-medium hover:text-accent">
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-12 border-t border-white/10">
            <a href="#contact" onClick={() => setMobileMenu(false)} className="w-full bg-primary text-white py-5 flex items-center justify-center font-bold uppercase tracking-widest text-sm rounded-xl">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section (HR-A) */}
      <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-dark via-dark to-primary/20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 max-w-4xl max-h-[60vh] rounded-[4rem] overflow-hidden rotate-3 pointer-events-none">
          <SafeImage src="https://images.unsplash.com/photo-1757924870923-01769ed123ee?auto=format&fit=crop&q=80" alt={brand.name} fill className="object-cover" priority />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <h1 className={`font-heading text-6xl md:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            The Sovereign <br/> Standard of <span className="shimmer-text italic">Cultural Luxury</span>
          </h1>
          <p className={`text-white/50 mt-10 text-xl max-w-2xl mx-auto leading-relaxed delay-300 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {brand.description}
          </p>
          <div className={`flex flex-col sm:flex-row gap-5 justify-center mt-12 delay-500 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a href="#contact" className="bg-accent text-black px-12 py-5 font-black text-sm uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all rounded-full shadow-2xl shadow-accent/20">
              Book a Consultation
            </a>
            <a href="#products" className="border border-white/20 text-white px-12 py-5 font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all rounded-full">
              Explore Collection
            </a>
          </div>
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-accent py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
          {stats.map((s, i) => (
            <div key={i} className="py-8 md:py-0 px-8">
              <p className="text-5xl font-black text-black tracking-tighter font-heading">{s.number}</p>
              <p className="text-black/60 text-xs mt-2 font-bold uppercase tracking-[0.3em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features (F-BENTO) */}
      <section id="features" ref={featureReveal.ref} className="py-32 px-6 bg-secondary text-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">The Distinction</span>
              <h2 className="font-heading text-5xl md:text-7xl font-black leading-[1.1]">Impeccable Craft meets <span className="text-primary italic">Tradition</span></h2>
            </div>
            <p className="text-dark/50 text-lg max-w-sm mb-2">Sharp delivery, nationwide. We handle your heritage with the royalty it deserves.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-white rounded-3xl p-12 border border-dark/5 flex flex-col justify-between group min-h-[400px] transition-all duration-700 ${featureReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Gem size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-dark mb-4">{features[0].title}</h3>
                <p className="text-dark/60 text-lg leading-relaxed max-w-md">{features[0].description}</p>
              </div>
            </div>
            {features.slice(1).map((f, i) => (
              <div key={i} style={{ transitionDelay: `${(i + 1) * 150}ms` }} className={`bg-white rounded-3xl p-10 border border-dark/5 flex flex-col justify-between min-h-[400px] transition-all duration-700 ${featureReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <f.icon size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-dark mb-3">{f.title}</h3>
                  <p className="text-dark/50 text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (Bonus - Masonry) */}
      <section id="gallery" ref={galleryReveal.ref} className="py-32 px-6 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white">The Royal Portfolio</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden transition-all duration-1000 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                <SafeImage 
                  src={`https://images.unsplash.com/photo-1649677874593-a04cb075c7a0?auto=format&fit=crop&q=80&idx=${idx}`} 
                  alt="Gallery styling" 
                  width={600} height={800}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products (P-STAGGER) */}
      <section id="products" ref={productReveal.ref} className="py-32 px-6 bg-secondary text-dark overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-40">
          <div className="text-center">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Exclusives</span>
            <h2 className="font-heading text-5xl md:text-7xl font-black">The Masterpiece Collection</h2>
          </div>

          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}>
              <div className={`w-full md:w-1/2 relative transition-all duration-1000 ${productReveal.isVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'}`}>
                <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl group">
                  <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-primary/10 rounded-full -z-10 blur-[80px]`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'} transition-all duration-1000 delay-300 ${productReveal.isVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20'}`}>
                <span className="font-bold text-accent text-sm tracking-[0.3em] uppercase mb-4 block">Item 0{i + 1}</span>
                <h3 className="font-heading text-4xl md:text-6xl font-black leading-tight mb-6">{p.name}</h3>
                <p className="text-dark/60 text-xl leading-relaxed mb-8">{p.description}</p>
                <div className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'} gap-6`}>
                  <span className="text-4xl font-black text-primary font-heading tracking-tighter">{p.price}</span>
                  <a href="#contact" className="bg-dark text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all">
                    Commission This Piece
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section (Split Layout) */}
      <section id="about" ref={aboutReveal.ref} className="min-h-screen grid md:grid-cols-2 items-center bg-dark overflow-hidden">
        <div className="relative h-[60vh] md:h-full order-2 md:order-1">
          <SafeImage src="https://images.unsplash.com/photo-1744060603078-9c47af4a2f8f?auto=format&fit=crop&q=80" alt="Iyenemi Heritage" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </div>
        <div className="p-12 md:p-24 order-1 md:order-2">
          <h2 className={`font-heading text-6xl font-black mb-10 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The Story of <span className="text-accent italic">Iyenemi</span>
          </h2>
          <p className={`text-white/50 text-xl leading-relaxed mb-12 delay-200 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Founded in Port Harcourt, Iyenemi Beads Collection has become a beacon of cultural excellence. We don't just string beads; we weave the history, pride, and elegance of Nigerian heritage into every piece. From the royal courts of the South-South to modern celebrity weddings, our work is a testament to the timelessness of coral.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className={`p-8 rounded-3xl border border-white/10 glass-panel delay-400 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h4 className="text-accent font-heading text-3xl font-black mb-1">Authenticity</h4>
              <p className="text-white/40 text-sm">We source directly from the most reputable bead artisans in Benin and beyond.</p>
            </div>
            <div className={`p-8 rounded-3xl border border-white/10 glass-panel delay-600 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h4 className="text-accent font-heading text-3xl font-black mb-1">Heritage</h4>
              <p className="text-white/40 text-sm">Preserving traditional stringing techniques passed down through generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (T-SLIDER) */}
      <section ref={testimonialReveal.ref} className="py-32 bg-secondary overflow-hidden border-y border-dark/5">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-dark text-center">Royal Commendations</h2>
        </div>
        <div className="w-full">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white border border-dark/5 rounded-[2.5rem] p-12 shadow-sm">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-accent" />)}
                </div>
                <p className="text-dark/70 text-xl leading-relaxed italic mb-10 font-heading">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-dark/5 pt-8">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-dark text-lg leading-none">{t.name}</p>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (C2) */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
              Commission Your <span className="text-accent italic">Masterpiece</span>
            </h2>
            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent group-hover:text-black transition-all">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/30 font-bold mb-1">Social</p>
                  <p className="text-xl font-bold">@iyenemibeadscollection</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent group-hover:text-black transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/30 font-bold mb-1">WhatsApp</p>
                  <p className="text-xl font-bold">+234 701 865 4882</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent group-hover:text-black transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/30 font-bold mb-1">Atelier</p>
                  <p className="text-xl font-bold max-w-xs">13 Oludi Street Oroazi, Port Harcourt</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer (F2) */}
      <footer className="bg-[#080808] border-t border-white/5 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          <div className="md:col-span-1">
            <span className="font-heading text-3xl font-bold tracking-tighter text-white">IYENEMI</span>
            <p className="text-white/40 mt-6 text-sm leading-relaxed max-w-xs uppercase tracking-widest">
              Where Heritage Meets Elegance. Exquisite traditional beadwork for the global elite.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-accent text-xs uppercase tracking-widest mb-8">Navigation</h4>
            <div className="flex flex-col gap-4">
              {navLinks.map((l, i) => <a key={i} href={l.href} className="text-white/40 hover:text-white transition-colors text-sm">{l.name}</a>)}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-accent text-xs uppercase tracking-widest mb-8">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-white/40">
              <p>+234 701 865 4882</p>
              <p>Port Harcourt, Nigeria</p>
              <p>@iyenemibeadscollection</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-accent text-xs uppercase tracking-widest mb-8">Newsletter</h4>
            <p className="text-white/40 text-xs mb-6">Join our royal circle for exclusive collection previews.</p>
            <div className="relative">
              <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs outline-none focus:border-accent" />
              <button className="absolute right-2 top-2 bottom-2 bg-accent text-black px-4 rounded-full font-black text-[10px]">JOIN</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Iyenemi Beads Collection. Crafted in Nigeria.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-accent transition-all"><Instagram size={18} /></a>
            <a href="#" className="text-white/20 hover:text-accent transition-all"><Phone size={18} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-primary rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-50" />
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-8 border border-white/30 relative z-10">
          <CheckCheck size={40} className="text-white" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Submission Received</h3>
        <p className="text-white/80 max-w-sm text-lg relative z-10 font-medium">Thank you for choosing Iyenemi. Our concierge will contact you within 24 hours to begin your custom design.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 glass-panel p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-black text-white mb-10">Commission Inquiry</h3>
        <div className="space-y-5">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent"
            />
          ))}
          <textarea 
            rows={4} 
            placeholder="Tell us about your event and preferred cultural style..."
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-accent"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 hover:shadow-2xl hover:shadow-primary/30 transition-all disabled:opacity-60 flex justify-center items-center gap-3 group">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} /> SENDING...
            </span>
          ) : (
            <>
              Submit Commission <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}