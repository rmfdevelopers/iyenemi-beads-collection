'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Crown, Gem, Truck, Palette, Phone, Instagram, Mail, MapPin, 
  CheckCheck, ArrowRight, Loader2, ImageOff, Menu, X, Users, Heart, Award
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: refined

const brand = {
  name: "Iyenemi Beads Collection",
  tagline: "Where Heritage Meets Elegance",
  description: "Port Harcourt's premier destination for regal cultural adornments, specializing in bespoke bridal beads, hand fans, and heritage styling for the modern queen.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦"
};

const colors = {
  primary: "#600010",
  secondary: "#1A1A1A",
  accent: "#D4AF37"
};

const contact = {
  whatsapp: "2347018654882",
  instagram: "@iyenemibeadscollection",
  email: "",
  address: "13 Oludi Street Oroazi, Port Harcourt, Nigeria"
};

const products = [
  {
    name: "The Royal Igalia Set",
    description: "Heavy-weight authentic coral neckpiece and crown set, handcrafted for Kalabari and Edo royalty.",
    price: "₦650,000",
    url: "https://images.unsplash.com/photo-1649677874593-a04cb075c7a0?q=80&w=1080"
  },
  {
    name: "Majestic Bridal Hand Fan",
    description: "Bespoke ostrich feather fan encrusted with premium crystals and heritage beadwork.",
    price: "₦125,000",
    url: "https://images.unsplash.com/photo-1771621041686-855f4b23fd67?q=80&w=1080"
  },
  {
    name: "Signature Waist Bead Tier",
    description: "Seven-strand gold-infused glass beads designed for traditional elegance and silhouette definition.",
    price: "₦180,000",
    url: "https://images.unsplash.com/photo-1770777352681-2fb5f5677d0f?q=80&w=1080"
  },
  {
    name: "The Heritage Headpiece",
    description: "An architectural beaded crown designed to frame the face with regal sophistication.",
    price: "₦320,000",
    url: "https://images.unsplash.com/photo-1649677874593-a04cb075c7a0?q=80&w=1080"
  }
];

const features = [
  { title: "Cultural Artistry", description: "Every bead is hand-strung following generations of traditional craftsmanship.", icon: Crown },
  { title: "Bespoke Styling", description: "One-on-one cultural wedding styling to ensure every bride looks like a monarch.", icon: Palette },
  { title: "Premium Sourcing", description: "We use only the finest authentic corals and precious stones from around the globe.", icon: Gem },
  { title: "Nationwide Delivery", description: "Sharp delivery, nationwide. Securely shipping royal heritage from PH to the world.", icon: Truck }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?q=80&w=800",
  "https://images.unsplash.com/photo-1649677874593-a04cb075c7a0?q=80&w=800",
  "https://images.unsplash.com/photo-1661332426053-bc396192b0d3?q=80&w=800",
  "https://images.unsplash.com/photo-1737649507334-92c9fa4beb7c?q=80&w=800",
  "https://images.unsplash.com/photo-1744060603078-9c47af4a2f8f?q=80&w=800",
  "https://images.unsplash.com/photo-1648329933601-01d1875f0b7e?q=80&w=800"
];

// --- Utilities ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/50 ${className}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} 
      width={!fill ? width : undefined} 
      height={!fill ? height : undefined} 
      className={className} 
      priority={priority}
      onError={() => setError(true)}
    />
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
  }, []);
  return { ref, isVisible };
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-2xl py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-accent flex items-center justify-center font-heading text-xl font-bold text-accent">
            I
          </div>
          <span className="font-heading text-xl font-bold tracking-tighter text-white hidden sm:block">IYENEMI</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Collection', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-accent transition-colors text-xs font-medium uppercase tracking-[0.2em]">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-black px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all">
            Book Stylist
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-40 transition-transform duration-500 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {['Home', 'Collection', 'About', 'Contact'].map((link) => (
            <a key={link} onClick={() => setIsOpen(false)} href={`#${link.toLowerCase()}`} className="text-2xl font-heading text-white">
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center bg-primary px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <SafeImage 
          src="https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?q=80&w=1920" 
          alt="Regal Bride" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/60 to-primary" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-float" />

      <div ref={ref} className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-8">Established in Port Harcourt</p>
        <h1 className="font-heading text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8">
          Crafting the Legacy of <br />
          <span className="italic text-accent/90">the Cultural Bride</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12">
          Exquisite beadwork and royal styling for the woman who carries her heritage with pride.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a href="#contact" className="bg-accent text-black px-12 py-5 font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
            Book Your Consultation
          </a>
          <a href="#products" className="border border-white/20 text-white px-12 py-5 font-medium text-sm uppercase tracking-widest hover:bg-white/5 transition-all">
            View Collection
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 bg-secondary px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="font-heading text-5xl font-black text-white mb-6">The Iyenemi Standard</h2>
          <p className="text-white/40 text-lg">Excellence in every stitch and stone.</p>
        </div>
        <div className="space-y-4">
          {features.map((f, idx) => (
            <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
              <div className="bg-primary/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-accent/30 flex flex-col md:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:text-black transition-all duration-500 text-accent">
                  {idx === 0 && <Crown />}
                  {idx === 1 && <Palette />}
                  {idx === 2 && <Gem />}
                  {idx === 3 && <Truck />}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-3xl font-bold text-white">{f.title}</h3>
                    <span className="text-accent/20 font-mono text-lg">0{idx + 1}</span>
                  </div>
                  <p className="text-white/50 text-lg leading-relaxed max-w-xl">{f.description}</p>
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
    <section ref={ref} className="py-28 px-6 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className={`font-heading text-5xl font-black text-white mb-14 text-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          The Royal Portfolio
        </h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((src, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-95'}`}
            >
              <SafeImage 
                src={src} 
                alt={`Heritage Work ${i + 1}`} 
                width={800} 
                height={1000}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatDivider = () => {
  return (
    <div className="bg-accent py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
        {[
          { number: '63.9k', label: 'Royal Followers' },
          { number: '1000+', label: 'Brides Styled' },
          { number: '12 Years', label: 'of Craft' }
        ].map((s, i) => (
          <div key={i} className="px-8 py-6 md:py-0">
            <p className="text-5xl font-heading font-black text-black tracking-tight">{s.number}</p>
            <p className="text-black/60 text-xs mt-2 font-bold uppercase tracking-[0.3em]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="collection" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="font-heading text-6xl font-black text-white leading-tight">The Collection</h2>
            <p className="text-white/40 mt-4 text-xl font-light">Timeless pieces for your most sacred day.</p>
          </div>
          <div className="h-px flex-1 bg-white/10 hidden md:block mx-12 mb-4" />
          <span className="text-accent font-mono text-xs tracking-widest uppercase mb-4 shrink-0 opacity-60">Handcrafted Excellence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-primary/20">
                <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full bg-white text-black py-4 font-black text-xs uppercase tracking-widest hover:bg-accent transition-colors">
                    Enquire Now
                  </button>
                </div>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">{p.name}</h3>
              <p className="text-white/40 text-sm mb-4 line-clamp-2 leading-relaxed">{p.description}</p>
              <p className="text-accent font-black text-xl">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-primary overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden z-10 shadow-2xl border border-white/5">
            <SafeImage src="https://images.unsplash.com/photo-1744060603078-9c47af4a2f8f?q=80&w=1080" alt="Iyenemi Craft" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 border-[12px] border-accent/20 rounded-[3rem] -z-10" />
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6">Our Heritage</p>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-8 leading-tight">We Weave Stories of <span className="italic text-accent/80">Ancestry</span></h2>
          <p className="text-white/60 text-xl leading-relaxed font-light mb-10">
            Based in the heart of Port Harcourt, Iyenemi Beads Collection has spent over a decade redefining cultural luxury. We don't just make beads; we weave stories of ancestry, beauty, and power for the modern bride.
          </p>
          <div className="space-y-6">
            {['100% Authentic Corals', 'PH City Heritage Styling', 'Globally Sourced Stones'].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-white/80">
                <div className="w-6 h-6 rounded-full border border-accent flex items-center justify-center">
                  <CheckCheck size={12} className="text-accent" />
                </div>
                <span className="font-medium tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl font-black text-white mb-20">Voices of Royalty</h2>
        <div className="space-y-12">
          {[
            { name: "Adora Wike", role: "Port Harcourt Bride", text: "The weight and quality of the coral were unlike anything I've ever seen. I felt like a true queen on my traditional wedding day." },
            { name: "Nengi Braide", role: "Cultural Enthusiast", text: "Iyenemi's styling transformed my entire look. Her attention to cultural detail is unmatched in the industry." },
            { name: "Tari Ere", role: "Bayelsa Bride", text: "The hand fan was a masterpiece! Everyone at the wedding kept asking where I got it. Truly elite craftsmanship." }
          ].map((t, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 200}ms` }}
              className={`relative py-12 px-10 rounded-[3rem] border border-white/5 bg-primary/20 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-black font-black text-3xl font-heading">
                &ldquo;
              </div>
              <p className="text-white/80 text-2xl font-light italic leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</p>
              <div className="flex flex-col items-center">
                <p className="font-heading font-bold text-white text-xl">{t.name}</p>
                <p className="text-accent/50 text-xs uppercase tracking-[0.3em] mt-1">{t.role}</p>
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
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-20 items-start">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h2 className="font-heading text-6xl font-black text-white mb-8 leading-none">Begin Your <br /><span className="text-accent italic">Transformation</span></h2>
          <p className="text-white/45 text-xl leading-relaxed mb-12">Visit our PH City studio or schedule a remote consultation for your upcoming royal appearance.</p>
          
          <div className="space-y-8">
            <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">WhatsApp</p>
                <p className="text-white font-medium text-lg">+{contact.whatsapp}</p>
              </div>
            </a>
            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Our PH Studio</p>
                <p className="text-white font-medium text-lg leading-relaxed">{contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {sent ? (
            <div className="bg-secondary p-12 rounded-[3rem] border border-accent/20 text-center animate-scaleIn shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8 border border-accent/20">
                <CheckCheck size={40} className="text-accent" />
              </div>
              <h3 className="font-heading text-4xl font-bold text-white mb-4">Request Received</h3>
              <p className="text-white/50 text-lg">A royal stylist will reach out to you via WhatsApp shortly to confirm your booking.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-secondary p-10 md:p-14 rounded-[3rem] border border-white/5 shadow-2xl relative">
              <h3 className="font-heading text-3xl font-bold text-white mb-10">Send an Inquiry</h3>
              <div className="space-y-5">
                {['name', 'email', 'phone'].map(field => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 outline-none focus:border-accent transition-all duration-300"
                    onChange={e => setForm({...form, [field]: e.target.value})}
                  />
                ))}
                <textarea
                  rows={4}
                  placeholder="Tell us about your wedding date and cultural roots"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 outline-none focus:border-accent transition-all duration-300"
                  onChange={e => setForm({...form, message: e.target.value})}
                />
                <button type="submit" disabled={loading} className="w-full bg-accent text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:brightness-110 disabled:opacity-50 flex justify-center items-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : <>Request Consultation <ArrowRight size={18} /></>}
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
    <footer className="bg-secondary py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <div className="w-12 h-12 border-2 border-accent flex items-center justify-center font-heading text-2xl font-bold text-accent">I</div>
            <span className="font-heading text-2xl font-bold tracking-tighter text-white">IYENEMI</span>
          </div>
          <p className="text-white/30 text-sm tracking-widest uppercase">Where Heritage Meets Elegance</p>
        </div>

        <div className="flex gap-10">
          <a href={`https://instagram.com/${contact.instagram}`} className="text-white/40 hover:text-accent transition-all group">
            <Instagram size={28} className="group-hover:scale-110 transition-transform" />
          </a>
          <a href={`https://wa.me/${contact.whatsapp}`} className="text-white/40 hover:text-accent transition-all group">
            <Phone size={28} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Iyenemi Beads Collection.</p>
          <p className="text-white/20 text-xs mt-2 uppercase tracking-widest">Handcrafted in Port Harcourt</p>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="bg-primary selection:bg-accent selection:text-black">
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <StatDivider />
      <Products />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}