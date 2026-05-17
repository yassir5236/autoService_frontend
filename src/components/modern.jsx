import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// Brand logos as SVG shapes (approximating the screenshot's car brand icons)
const brandLogos = [
  { name: "Lamborghini", icon: "🔷" },
  { name: "BMW", icon: "◎" },
  { name: "Tesla", icon: "⟡" },
  { name: "Cadillac", icon: "◈" },
  { name: "Porsche", icon: "🛡" },
  { name: "Mercedes", icon: "☆" },
  { name: "Lexus", icon: "⬡" },
  { name: "Ferrari", icon: "⚡" },
];

// Floating dot positions
const floatingDots = [
  { x: "38%", y: "18%", size: 5, delay: 0 },
  { x: "55%", y: "12%", size: 4, delay: 0.3 },
  { x: "70%", y: "22%", size: 6, delay: 0.6 },
  { x: "80%", y: "35%", size: 4, delay: 0.9 },
  { x: "62%", y: "60%", size: 5, delay: 1.2 },
  { x: "48%", y: "55%", size: 3, delay: 0.5 },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: "calc(100vh - 80px)" }}>
      {/* Dot grid background on right side */}
      <div
        className="dot-grid absolute right-0 top-0 h-full"
        style={{ width: "55%", opacity: 0.5 }}
      />

      {/* Floating decoration dots */}
      {floatingDots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-neutral-300"
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Arrow / location pin decoration */}
      <motion.div
        className="absolute"
        style={{ left: "42%", top: "30%" }}
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 12L12 5L19 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 5V19" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 px-8 md:px-12 pt-12 pb-0 flex flex-col md:flex-row items-start justify-between max-w-7xl mx-auto">
        {/* Left: Text */}
        <div className="flex-1 max-w-lg pt-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-black leading-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
              lineHeight: 1.08,
            }}
          >
            Premium
            <br />
            Car Rental
            <br />
            in New York
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-neutral-500 mt-5 leading-relaxed max-w-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}
          >
            Don't deny yourself the pleasure of driving the best premium cars from around the world here and now
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white px-7 py-3.5 rounded-full text-sm font-medium flex items-center gap-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Explore Fleet
              <FaArrowRight className="text-xs" />
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Car image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex items-end justify-end mt-8 md:mt-0"
          style={{ maxWidth: "58%" }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=90&auto=format&fit=crop"
            alt="Premium Porsche Boxster"
            className="w-full object-contain drop-shadow-2xl"
            style={{ maxHeight: "420px", objectPosition: "bottom" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Brand logos bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 flex items-center gap-8 px-8 md:px-12 py-6 mt-2 border-t border-neutral-100 overflow-x-auto"
        style={{ maxWidth: "100%" }}
      >
        {[
          { label: "Lamborghini", svg: <LamborghiniIcon /> },
          { label: "BMW", svg: <BMWIcon /> },
          { label: "Tesla", svg: <TeslaIcon /> },
          { label: "Cadillac", svg: <CadillacIcon /> },
          { label: "Porsche", svg: <PorscheIcon /> },
          { label: "Mercedes", svg: <MercedesIcon /> },
          { label: "Lexus", svg: <LexusIcon /> },
          { label: "Ferrari", svg: <FerrariIcon /> },
        ].map(({ label, svg }, i) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.15 }}
            className="flex items-center justify-center flex-shrink-0 cursor-pointer"
            style={{ width: 36, height: 36, opacity: 0.55 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 0.6 + i * 0.06 }}
          >
            {svg}
          </motion.div>
        ))}

        <motion.div
          whileHover={{ x: 4 }}
          className="ml-2 flex-shrink-0 cursor-pointer text-neutral-400 hover:text-black transition-colors"
        >
          <FaArrowRight />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Minimal brand icon components
function LamborghiniIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
      <polygon points="20,4 36,20 20,36 4,20" stroke="#333" strokeWidth="1.8" fill="none"/>
      <polygon points="20,10 30,20 20,30 10,20" stroke="#333" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}
function BMWIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <circle cx="20" cy="20" r="17" stroke="#333" strokeWidth="1.8" fill="none"/>
      <circle cx="20" cy="20" r="11" stroke="#333" strokeWidth="1.2" fill="none"/>
      <path d="M20 3 L20 29" stroke="#333" strokeWidth="1.4"/>
      <path d="M3 20 L29 20" stroke="#333" strokeWidth="1.4"/>
      <path d="M9,9 L31,31" stroke="none"/>
    </svg>
  );
}
function TeslaIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
      <path d="M20 8 C14 8 8 11 8 14 C12 14 18 15 20 36 C22 15 28 14 32 14 C32 11 26 8 20 8Z" stroke="#333" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      <path d="M8 14 L32 14" stroke="#333" strokeWidth="1.8"/>
    </svg>
  );
}
function CadillacIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
      <rect x="8" y="12" width="24" height="16" rx="1" stroke="#333" strokeWidth="1.8"/>
      <line x1="20" y1="12" x2="20" y2="28" stroke="#333" strokeWidth="1.2"/>
      <line x1="8" y1="20" x2="32" y2="20" stroke="#333" strokeWidth="1.2"/>
    </svg>
  );
}
function PorscheIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
      <path d="M20 5 L20 35 M5 20 L35 20 M9 9 L31 31 M31 9 L9 31" stroke="none"/>
      <circle cx="20" cy="20" r="16" stroke="#333" strokeWidth="1.8" fill="none"/>
      <path d="M20 4 L20 36" stroke="#333" strokeWidth="1.4"/>
      <path d="M4 20 L20 20 L20 4" stroke="none"/>
      <rect x="12" y="12" width="8" height="8" stroke="#333" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}
function MercedesIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
      <circle cx="20" cy="20" r="16" stroke="#333" strokeWidth="1.8" fill="none"/>
      <line x1="20" y1="4" x2="20" y2="20" stroke="#333" strokeWidth="1.5"/>
      <line x1="20" y1="20" x2="6.1" y2="28" stroke="#333" strokeWidth="1.5"/>
      <line x1="20" y1="20" x2="33.9" y2="28" stroke="#333" strokeWidth="1.5"/>
    </svg>
  );
}
function LexusIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
      <ellipse cx="20" cy="20" rx="16" ry="12" stroke="#333" strokeWidth="1.8" fill="none"/>
      <path d="M8 20 Q14 8 20 20 Q26 32 32 20" stroke="#333" strokeWidth="1.4" fill="none"/>
    </svg>
  );
}
function FerrariIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
      <rect x="10" y="5" width="20" height="30" rx="2" stroke="#333" strokeWidth="1.8" fill="none"/>
      <line x1="10" y1="15" x2="30" y2="15" stroke="#333" strokeWidth="1.2"/>
      <line x1="10" y1="25" x2="30" y2="25" stroke="#333" strokeWidth="1.2"/>
    </svg>
  );
}