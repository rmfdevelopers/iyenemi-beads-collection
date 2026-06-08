'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Crown, 
  Gem, 
  Globe, 
  Users, 
  Heart, 
  MapPin, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Phone, 
  Mail, 
  Instagram, 
  Menu, 
  X,
  ImageOff
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: refined

// --- Helpers & Hooks ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-secondary/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
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

// --- Data ---

const brand = {
  name: "Iyenemi Beads Collection",
  tagline: "Heritage Meets Royal Elegance",
  description: "Handcrafted cultural masterpieces for the modern royalty. We specialize in bespoke bridal beads, luxury handfans, and artisanal accessories that celebrate heritage.",
  industry: "Fashion",
  region: "Nigeria"
};

const contact = {
  whatsapp: "2347018654882",
  instagram: "@iyenemibeadscollection",
  email: "",
  address: "13 Oludi Street Oroazi, Port Harcourt Nigeria"
};

const products = [
  { name: "Royal Coral Heritage Set", description: "Exquisite multi-layered authentic coral beads with gold-plated filigree accents.", price: "₦550,000", url: "https://images.unsplash.com/photo-1661332426053-bc396192b0d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "Embellished Bridal Handfan", description: "Ostrich feather luxury handfan featuring intricate beadwork and personalized detailing.", price: "₦95,000", url: "https://images.unsplash.com/photo-1656788104365-579240e279a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "The Queen's Auto Gele", description: "Pre-tied luxury headtie with hand-stitched Swarovski crystals and pearls.", price: "₦75,000", url: "https://images.unsplash.com/photo-1587221966814-f775a6749831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "Artisanal Walking Stick", description: "Hand-carved ceremonial walking stick fully encrusted with traditional seed beads.", price: "₦150,000", url: "https://images.unsplash.com/photo-1526235558992-e3a1810dd7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
];

const features = [
  { title: "Bespoke Artistry", description: "Every piece is custom-designed to match your unique bridal or ceremonial vision.", icon: Crown },
  { title: "Cultural Heritage", description: "We preserve age-old bead-making techniques passed down through generations.", icon: Gem },
  { title: "Global Logistics", description: "From Port Harcourt to the world, we ship our royal treasures across the globe.", icon: Globe }
];

const gallery = [
  "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1649677874593-a04cb075c7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1648329933601-01d1875f0b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1737649507334-92c9fa4beb7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1744060603078-9c47af4a2f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1767929820565-1f82e8d7b66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
];

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-7'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
            <span className="text-accent font-heading font-black text-xl">I</span>
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-white">IYENEMI</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Features', 'Collection', 'Legacy', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-secondary font-medium text-sm transition-colors uppercase tracking-widest">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-secondary text-accent px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
            Consultation
          </a>
        </div>

        <button onClick={() => setMobileOpen(true)} className="md:hidden text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-accent/90 backdrop-blur-2xl z-[60] transition-all duration-500 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 h-full w-[80%] bg-primary shadow-2xl p-10 flex flex-col transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => setMobileOpen(false)} className="self-end text-white/50 hover:text-white mb-10">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Home', 'Features', 'Collection', 'Legacy', 'Contact'].map(link => (
              <a key={link} onClick={() => setMobileOpen(false)} href={`#${link.toLowerCase()}`} className="text-white text-3xl font-heading font-bold">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="bg-secondary text-accent px-8 py-4 rounded-xl font-black text-center mt-10">
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" ref={ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-accent px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="absolute inset-0 opacity-15 overflow-hidden">
        <SafeImage 
          src="https://images.unsplash.com/photo-1770777355107-2e7f51ad320a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
          alt="Regal Bride" 
          fill 
          className="object-cover scale-110 animate-float" 
          priority
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter">
            Where Tradition <br/> <span className="text-secondary italic">Wears a Crown</span>
          </h1>
          <p className="text-white/60 mt-8 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
            Luxury cultural accessories for those born to lead. Handcrafted in the heart of Port Harcourt for the global stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#contact" className="bg-secondary text-accent px-12 py-5 font-black text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl">
              Claim Your Royalty
            </a>
            <a href="#collection" className="border border-white/20 backdrop-blur-md text-white px-12 py-5 font-medium text-lg hover:bg-white/10 transition-all duration-300 rounded-full">
              Explore Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Divider = ({ type }: { type: 'RULE' | 'STAT' }) => {
  if (type === 'RULE') {
    return (
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto overflow-hidden">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <span className="text-secondary font-sans text-xs tracking-[0.5em] uppercase whitespace-nowrap opacity-70">
          Heritage • Luxury • Artistry
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      </div>
    );
  }
  return (
    <div className="bg-secondary py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-accent/20 text-center">
        {[
          { number: '63.9k', label: 'Royal Followers' },
          { number: '5k+', label: 'Brides Adorned' },
          { number: '15+', label: 'Countries Shipped' }
        ].map((s, i) => (
          <div key={i} className="px-8 py-6 md:py-0">
            <p className="text-5xl font-heading font-black text-accent tracking-tighter">{s.number}</p>
            <p className="text-accent/60 text-xs mt-2 font-bold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="features" ref={ref} className="py-28 bg-accent px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className={`font-heading text-5xl md:text-6xl font-black text-white mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          The Pillars of Excellence
        </h2>
        <div className="space-y-6">
          {features.map((f, idx) => (
            <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
              <div className="bg-primary/20 backdrop-blur-2xl rounded-[2rem] p-10 border border-white/10 shadow-2xl group-hover:border-secondary/30 transition-all duration-500 flex flex-col md:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform duration-500">
                  <f.icon className="text-accent" size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-3xl font-bold text-white">{f.title}</h3>
                    <span className="text-secondary/20 font-heading text-4xl font-black">0{idx + 1}</span>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="legacy" ref={ref} className="py-28 px-6 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none">The Royal Archive</h2>
            <p className="text-white/40 mt-6 text-xl max-w-xl">An editorial showcase of our most iconic commissions, reflecting a legacy of Nigerian craftsmanship.</p>
          </div>
          <a href="#contact" className="text-secondary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
            Request Custom Piece <ArrowRight size={20} />
          </a>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {gallery.map((src, i) => (
            <div key={i} 
              className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <SafeImage src={src} alt={`Archive item ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent scale-50 group-hover:scale-100 transition-transform">
                  <Gem size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="collection" ref={ref} className="py-28 px-6 bg-accent">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white max-w-sm leading-none">The Collection</h2>
          <p className="text-white/40 max-w-xs text-right hidden md:block italic">Indulge in artisanal luxury designed to last a lifetime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Product */}
          <div className={`md:col-span-7 group relative rounded-3xl overflow-hidden min-h-[500px] transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <SafeImage src={products[0].url} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/20 to-transparent" />
            <div className="absolute bottom-0 p-10 w-full">
              <span className="bg-secondary text-accent px-4 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">Best Seller</span>
              <h3 className="font-heading text-4xl font-black text-white">{products[0].name}</h3>
              <p className="text-white/60 mt-3 max-w-md line-clamp-2">{products[0].description}</p>
              <div className="flex items-center justify-between mt-8">
                <span className="text-secondary font-black text-3xl">{products[0].price}</span>
                <a href="#contact" className="bg-white text-accent px-8 py-3 rounded-full font-black hover:bg-secondary transition-colors">Begin Order</a>
              </div>
            </div>
          </div>
          
          {/* Secondary Products */}
          <div className="md:col-span-5 grid grid-rows-2 gap-6">
            {products.slice(1, 3).map((p, i) => (
              <div key={i} className={`group relative rounded-3xl overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/40 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-secondary font-black text-xl">{p.price}</span>
                    <a href="#contact" className="text-white/60 hover:text-white transition-colors text-sm font-bold border-b border-white/20 pb-1">Enquire →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final Row Item */}
          <div className={`md:col-span-12 group flex flex-col md:flex-row items-center gap-10 bg-primary/10 p-8 rounded-3xl border border-white/5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-full md:w-1/3 relative h-64 rounded-2xl overflow-hidden">
               <SafeImage src={products[3].url} alt={products[3].name} fill className="object-cover" />
            </div>
            <div className="flex-1">
               <h3 className="font-heading text-3xl font-bold text-white mb-2">{products[3].name}</h3>
               <p className="text-white/50 text-lg">{products[3].description}</p>
               <div className="flex items-center gap-8 mt-6">
                 <span className="text-secondary font-black text-2xl">{products[3].price}</span>
                 <a href="#contact" className="bg-secondary text-accent px-10 py-3 rounded-full font-black">Secure Yours</a>
               </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-12 text-white/30 text-sm font-medium tracking-widest uppercase">Sharp delivery, nationwide.</p>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="legacy" ref={ref} className="py-28 px-6 bg-accent overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl">
            <SafeImage 
              src="https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
              alt="Legacy Image" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/2 -left-8 -translate-y-1/2 bg-secondary p-8 rounded-2xl shadow-2xl hidden md:block">
            <Gem size={40} className="text-accent" />
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <span className="text-secondary font-bold tracking-[0.4em] uppercase text-sm mb-6 block">A Legacy of Elegance</span>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8">
            Handcrafted Legacies <br/> for the <span className="italic text-secondary">Elite</span>
          </h2>
          <p className="text-white/60 text-xl leading-relaxed mb-10">
            Founded on the principles of heritage and luxury, Iyenemi Beads Collection has become the gold standard for cultural adornment. We don't just make jewelry; we craft legacies that are passed from mothers to daughters, celebrating the rich tapestry of Nigerian royalty.
          </p>
          <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div>
              <p className="text-3xl font-heading font-black text-white">15+</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Countries Shipped</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-black text-white">5k+</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Brides Adorned</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    { name: "Oluwatoyin Adeyemi", text: "The beads for my wedding were breathtaking. I felt like a true queen. The weight and quality are unmatched.", role: "Verified Bride" },
    { name: "Nneka Okoro", text: "I ordered an auto gele and a purse for a gala. The attention to detail on the beadwork is simply divine.", role: "Luxury Collector" },
    { name: "Amina Abubakar", text: "The craftsmanship of the beaded walking stick for my father's 70th was the highlight of the event.", role: "Repeat Client" }
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-black text-white text-center mb-20">Notes from Royalty</h2>
        <div className="columns-1 md:columns-3 gap-6 space-y-6">
          {reviews.map((t, i) => (
            <div key={i} className={`break-inside-avoid bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-secondary/30 transition-all duration-500 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
              style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-secondary" />)}
              </div>
              <p className="text-white/80 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-black text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-accent">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-20 items-start">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <h2 className="font-heading text-6xl font-black text-white mb-8">Begin Your Commission</h2>
          <p className="text-white/50 text-xl leading-relaxed mb-12">Every masterpiece begins with a conversation. Let us bring your royal vision to life.</p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-white/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">WhatsApp Concierge</p>
                <a href={`https://wa.me/${contact.whatsapp}`} className="text-white text-xl font-medium hover:text-secondary transition-colors">+{contact.whatsapp}</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-white/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary transition-colors">
                <Instagram size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Instagram Showcase</p>
                <a href={`https://instagram.com/${contact.instagram.replace('@','')}`} className="text-white text-xl font-medium hover:text-secondary transition-colors">{contact.instagram}</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-white/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">The Atelier</p>
                <p className="text-white text-xl font-medium">{contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          {sent ? (
            <div className="bg-primary/20 backdrop-blur-3xl p-12 rounded-[3rem] border border-white/10 text-center animate-scaleIn">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-8 border border-secondary/40">
                <CheckCheck size={40} className="text-secondary" />
              </div>
              <h3 className="font-heading text-4xl font-black text-white mb-4">Request Received</h3>
              <p className="text-white/60 text-lg max-w-sm mx-auto">One of our master artisans will contact you shortly to begin the design process.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-primary/10 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text" placeholder="Your Name" required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-secondary transition-all"
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                  <input
                    type="text" placeholder="Phone Number" required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-secondary transition-all"
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <input
                  type="email" placeholder="Email Address" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-secondary transition-all"
                  onChange={e => setForm({...form, email: e.target.value})}
                />
                <textarea
                  placeholder="Tell us about your event or piece vision..." rows={5} required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-secondary transition-all resize-none"
                  onChange={e => setForm({...form, message: e.target.value})}
                />
                <button type="submit" disabled={loading} className="bg-secondary text-accent py-5 rounded-2xl font-black text-lg hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-3 transition-all group">
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-accent border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl">
                <span className="text-accent font-heading font-black text-2xl">I</span>
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white uppercase">Iyenemi Beads</span>
            </div>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed italic">
              &ldquo;Heritage Meets Royal Elegance. Handcrafted for the modern royalty.&rdquo;
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Navigation</h4>
            <div className="flex flex-col gap-4">
              {['Home', 'Collection', 'Legacy', 'Consultation'].map(l => (
                <a key={l} href={`#${l === 'Consultation' ? 'contact' : l.toLowerCase()}`} className="text-white/40 hover:text-secondary transition-colors text-sm">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Follow Royalty</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-secondary hover:text-secondary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-secondary hover:text-secondary transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-medium tracking-widest uppercase">
            © {new Date().getFullYear()} Iyenemi Beads Collection. All Rights Reserved.
          </p>
          <p className="text-white/20 text-xs font-medium tracking-widest uppercase">
            Crafted in Port Harcourt, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="bg-accent">
      <Navbar />
      <Hero />
      <Divider type="RULE" />
      <Features />
      <Divider type="STAT" />
      <Gallery />
      <Products />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}