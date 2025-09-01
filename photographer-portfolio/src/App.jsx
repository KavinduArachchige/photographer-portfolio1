import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Camera,
  Video,
  BookOpen,
  Music2,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import heroImage from "./assets/hero.jpg";


/**
 * Timeless Bliss – Photographer Portfolio (React + Tailwind v4, no TS)
 * Shiny black theme, full‑color media, rich animations.
 */

// ====== CONFIG ======
const BRAND = {
  photographer: "Sheshan",
  studioName: "Timeless Bliss",
  tagline: "Vibrant stories in living color – cinematic and timeless.",
};

const WHATSAPP_NUMBER = "94771234567"; // change to real number (no +)

const HERO_IMAGE = heroImage;


const CONTACT_INFO = {
  phone: "+94 77 123 4567",
  email: "hello@timelessbliss.com",
  location: "Colombo, Sri Lanka",
};

const PHOTO_CATEGORIES = [
  "All",
  "Wedding",
  "Birthday",
  "Preshoot",
  "Party",
  "All kinds of events",
];

const VIDEO_CATEGORIES = PHOTO_CATEGORIES;

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1600&q=80", category: "Wedding" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80", category: "Birthday" },
  { src: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=1600&q=80", category: "Preshoot" },
  { src: "https://images.unsplash.com/photo-1558980394-0c28b4c70efd?w=1600&q=80", category: "Party" },
  { src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=1600&q=80", category: "All kinds of events" },
  { src: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=1600&q=80", category: "Wedding" },
];

const SAMPLE_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";
const VIDEOS = [
  { src: SAMPLE_VIDEO, category: "Wedding", poster: "https://images.unsplash.com/photo-1593011950781-7b0de71ee2c3?w=1600&q=80" },
  { src: SAMPLE_VIDEO, category: "Birthday", poster: "https://images.unsplash.com/photo-1542382257-80dedb725088?w=1600&q=80" },
  { src: SAMPLE_VIDEO, category: "Preshoot", poster: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80" },
  { src: SAMPLE_VIDEO, category: "Party", poster: "https://images.unsplash.com/photo-1528715471579-d1ba1f3b73c7?w=1600&q=80" },
  { src: SAMPLE_VIDEO, category: "All kinds of events", poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80" },
];

// ====== Animations ======
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ====== Fancy helpers ======
function useParallax(intensity = 0.03) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tx = useTransform(x, (v) => `${v * intensity}px`);
  const ty = useTransform(y, (v) => `${v * intensity}px`);
  function onMove(e) {
    const { innerWidth, innerHeight } = window;
    const nx = (e.clientX / innerWidth) * 2 - 1;
    const ny = (e.clientY / innerHeight) * 2 - 1;
    x.set(nx * 100);
    y.set(ny * 100);
  }
  return { tx, ty, onMove };
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress((scrolled / height) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-black/40">
      <div className="h-full bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400" style={{ width: `${progress}%` }} />
    </div>
  );
}

function GlobalShinyBackground() {
  // glossy black with animated highlights + subtle grid
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(255,0,128,0.25),transparent),radial-gradient(900px_500px_at_90%_-10%,rgba(99,102,241,0.25),transparent),#050505]" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.04)_1px),linear-gradient(90deg,transparent,rgba(255,255,255,0.04)_1px)] bg-[size:24px_24px] opacity-30" />
      <motion.div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-white/5 blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  );
}

// Shimmer utility for buttons/cards
function ShimmerBorder({ className = "", children }) {
  return (
    <div className={`relative rounded-2xl p-[1px] ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.35),transparent)] animate-[spin_4s_linear_infinite]" />
      <div className="relative rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10">
        {children}
      </div>
    </div>
  );
}

// ====== UI ======
function Navbar() {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-lg font-semibold">
          <div className="size-8 rounded-full bg-white/90 text-black flex items-center justify-center shadow">
            <Camera size={18} />
          </div>
          <span>{BRAND.studioName}</span>
        </motion.div>
        <nav className="hidden md:flex gap-6 text-sm">
          {items.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="text-white/80 hover:text-white transition">
              {n.label}
            </button>
          ))}
        </nav>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden size-10 inline-flex items-center justify-center rounded-xl border border-white/15">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-3 bg-black/80">
          {items.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="block w-full text-left py-3 text-white/90 border-b border-white/5">
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { tx, ty, onMove } = useParallax(0.06);
  return (
    <section id="home" onMouseMove={onMove} className="min-h-[92vh] flex items-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center relative">
        <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hi, I'm {BRAND.photographer}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl">{BRAND.tagline}</p>
          <motion.div variants={stagger} className="mt-7 flex gap-4">
            <motion.a variants={zoomIn} href={`https://wa.me/${WHATSAPP_NUMBER}`} className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300 hover:scale-[1.03] transition">
              <span className="absolute inset-0 bg-white/40 mix-blend-overlay animate-pulse" />
              <MessageCircle size={18} /> Chat on WhatsApp
            </motion.a>
            <motion.a variants={zoomIn} href="#gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
              View Gallery <ChevronDown size={18} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div style={{ translateX: tx, translateY: ty }} initial="hidden" whileInView="show" variants={zoomIn} viewport={{ once: true }} className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={HERO_IMAGE} alt="Sheshan portrait" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-6">
          {["10+ years of colorful stories", "4K cinema gear", "Same‑week sneak peeks"].map((point, i) => (
            <motion.div key={i} variants={fadeUp}>
              <ShimmerBorder>
                <div className="p-6 rounded-2xl">
                  <p className="text-white/90">{point}</p>
                </div>
              </ShimmerBorder>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: <Camera />, title: "Photography", desc: "Weddings, birthdays, preshoots, parties & more." },
    { icon: <Video />, title: "Videography", desc: "Highlight films & full features in 4K." },
    { icon: <BookOpen />, title: "Album Designing", desc: "Elegant, archival photo books." },
    { icon: <Music2 />, title: "Music Video", desc: "From concept to final cut, cinematic." },
  ];
  return (
    <section id="services" className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-12">Services</motion.h2>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((s, i) => (
            <motion.div key={i} variants={zoomIn} whileHover={{ y: -6 }} className="group">
              <ShimmerBorder>
                <div className="p-6 rounded-2xl">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-fuchsia-400 to-purple-400 text-black flex items-center justify-center shadow-lg group-hover:rotate-3 transition">
                    {s.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-white/70 text-sm">{s.desc}</p>
                </div>
              </ShimmerBorder>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Tabs({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-white/10 p-1 bg-white/5">
      {options.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)} className={`px-4 py-2 rounded-lg text-sm transition ${value === opt ? "bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300 text-black" : "text-white/80 hover:text-white"}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function Gallery() {
  const [mode, setMode] = useState("Photos");
  const [photoCat, setPhotoCat] = useState(PHOTO_CATEGORIES[0]);
  const [videoCat, setVideoCat] = useState(VIDEO_CATEGORIES[0]);

  const filteredPhotos = useMemo(() => (photoCat === "All" ? PHOTOS : PHOTOS.filter((p) => p.category === photoCat)), [photoCat]);
  const filteredVideos = useMemo(() => (videoCat === "All" ? VIDEOS : VIDEOS.filter((v) => v.category === videoCat)), [videoCat]);

  const data = mode === "Photos" ? filteredPhotos : filteredVideos;

  return (
    <section id="gallery" className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-10">Gallery</motion.h2>

        <div className="flex items-center justify-center gap-4 mb-6">
          <Tabs options={["Photos", "Videos"]} value={mode} onChange={setMode} />
          {mode === "Photos" ? (
            <Tabs options={PHOTO_CATEGORIES} value={photoCat} onChange={setPhotoCat} />
          ) : (
            <Tabs options={VIDEO_CATEGORIES} value={videoCat} onChange={setVideoCat} />
          )}
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.map((item, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.03 }} className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl group bg-black/40">
              {mode === "Photos" ? (
                <img src={item.src} alt={`${item.category} ${i + 1}`} className="h-72 w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
              ) : (
                <video src={item.src} poster={item.poster} className="h-72 w-full object-cover" muted playsInline controls />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-2 left-2 text-xs tracking-wider px-2 py-1 rounded-full bg-black/70 border border-white/10">
                {mode === "Photos" ? item.category : `${item.category} • video`}
              </div>
              <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.35),transparent)] animate-[spin_3s_linear_infinite]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-4">
          {[{ icon: <Phone size={18} />, label: "Phone", value: CONTACT_INFO.phone }, { icon: <Mail size={18} />, label: "Email", value: CONTACT_INFO.email }, { icon: <Camera size={18} />, label: "Location", value: CONTACT_INFO.location }].map((row, i) => (
            <motion.div key={i} variants={fadeUp}>
              <ShimmerBorder>
                <div className="p-5 rounded-2xl flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-gradient-to-br from-fuchsia-400 to-purple-400 text-black flex items-center justify-center">{row.icon}</div>
                  <div>
                    <div className="text-sm text-white/60">{row.label}</div>
                    <div className="font-medium">{row.value}</div>
                  </div>
                </div>
              </ShimmerBorder>
            </motion.div>
          ))}

          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300 hover:scale-[1.03] transition">
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </motion.div>

        <motion.form onSubmit={(e) => e.preventDefault()} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="Your name" className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
            <input placeholder="Email or phone" className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
          </div>
          <input placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <textarea placeholder="Tell us about your event…" rows={5} className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <button className="w-full px-5 py-3 rounded-xl font-medium text-black bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300 border border-white/10 hover:scale-[1.02]">
            Send (demo)
          </button>
          <p className="text-xs text-white/50">Hook this to your Node.js email API (Nodemailer) or Formspree.</p>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-white/10 text-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-sm">© {new Date().getFullYear()} {BRAND.studioName}. All rights reserved.</div>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center size-14 rounded-full bg-green-500 text-white shadow-2xl border-4 border-white/10 hover:scale-110 transition">
      <MessageCircle />
    </a>
  );
}

export default function App() {
  useEffect(() => {
    document.body.style.fontFamily = "'Poppins', ui-sans-serif, system-ui";
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <div className="relative">
      <GlobalShinyBackground />
      <ScrollProgress />
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
} 
