import { useState, useEffect, useRef, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAdminStats, getNotifications, markNotificationsRead, clearNotifications } from "../services/userService";
import { Client } from "@stomp/stompjs";

// ─── Theme ────────────────────────────────────────────────────────────────────
const ThemeContext = createContext({});

const themes = {
  dark: {
    bg:             "#070b14",
    sidebarBg:      "linear-gradient(180deg, #0b0f1a 0%, #070b14 100%)",
    sidebarBorder:  "rgba(30,111,255,.12)",
    headerBg:       "rgba(8,12,20,.6)",
    cardBg:         "linear-gradient(135deg, rgba(15,20,35,.9) 0%, rgba(10,14,26,.9) 100%)",
    cardBg2:        "linear-gradient(135deg, rgba(12,17,32,.95) 0%, rgba(8,12,24,.95) 100%)",
    cardBorder:     "rgba(255,255,255,.07)",
    rowBorder:      "rgba(255,255,255,.04)",
    text:           "#f1f5f9",
    textSub:        "#e2e8f0",
    textMuted:      "#94a3b8",
    textFaint:      "#64748b",
    textFaintest:   "#475569",
    inputBg:        "rgba(255,255,255,.05)",
    inputBorder:    "rgba(255,255,255,.08)",
    rowHover:       "rgba(255,255,255,.02)",
    scrollTrack:    "#080c14",
    scrollThumb:    "#1e3a6e",
    chipBg:         "rgba(255,255,255,.05)",
    chipBorder:     "rgba(255,255,255,.07)",
    statusBg:       "rgba(30,111,255,.08)",
    statusBorder:   "rgba(30,111,255,.15)",
    logoSub:        "#94a3b8",
    logoMain:       "#e2e8f0",
  },
  light: {
    bg:             "#f1f5f9",
    sidebarBg:      "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    sidebarBorder:  "rgba(30,111,255,.2)",
    headerBg:       "rgba(255,255,255,.92)",
    cardBg:         "linear-gradient(135deg, rgba(255,255,255,.97) 0%, rgba(248,250,252,.97) 100%)",
    cardBg2:        "linear-gradient(135deg, rgba(255,255,255,.97) 0%, rgba(248,250,252,.97) 100%)",
    cardBorder:     "rgba(0,0,0,.09)",
    rowBorder:      "rgba(0,0,0,.05)",
    text:           "#1e293b",
    textSub:        "#1e293b",
    textMuted:      "#475569",
    textFaint:      "#64748b",
    textFaintest:   "#94a3b8",
    inputBg:        "rgba(0,0,0,.04)",
    inputBorder:    "rgba(0,0,0,.1)",
    rowHover:       "rgba(0,0,0,.03)",
    scrollTrack:    "#e2e8f0",
    scrollThumb:    "#94a3b8",
    chipBg:         "rgba(0,0,0,.05)",
    chipBorder:     "rgba(0,0,0,.09)",
    statusBg:       "rgba(30,111,255,.07)",
    statusBorder:   "rgba(30,111,255,.2)",
    logoSub:        "#475569",
    logoMain:       "#1e293b",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTimeAgo(timestamp) {
  if (!timestamp) return "";
  const diff = Date.now() - new Date(timestamp).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60)  return "just now";
  const m = Math.floor(s / 60);
  if (m < 60)  return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}

// ─── Recharts (bundled via import) ───────────────────────────────────────────
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, Cell, PieChart, Pie,
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────
const salesData = [
  { date: "May 1",  value: 42000 },
  { date: "May 7",  value: 78000 },
  { date: "May 14", value: 142380 },
  { date: "May 21", value: 198000 },
  { date: "May 28", value: 349000 },
];

const categoryData = [
  { name: "Coupe",       value: 28, color: "#1e6fff" },
  { name: "Sedan",       value: 24, color: "#2e8bff" },
  { name: "SUV",         value: 20, color: "#3fa0ff" },
  { name: "Convertible", value: 15, color: "#5ab4ff" },
  { name: "Hybrid",      value: 8,  color: "#7fceff" },
  { name: "Other",       value: 5,  color: "#a8e0ff" },
];

const listings = [
  { id: 1, name: "2024 Lamborghini Huracan", category: "Coupe",  price: "$241,000", status: "Active",  date: "May 14, 2025", color: "#22c55e" },
  { id: 2, name: "2023 BMW M4 Competition",  category: "Coupe",  price: "$89,500",  status: "Active",  date: "May 14, 2025", color: "#22c55e" },
  { id: 3, name: "2024 Range Rover Sport",   category: "SUV",    price: "$112,000", status: "Pending", date: "May 13, 2025", color: "#f59e0b" },
  { id: 4, name: "2023 Audi RS7 Sportback",  category: "Sedan",  price: "$98,100",  status: "Sold",    date: "May 12, 2025", color: "#6b7280" },
];

const activities = [
  { icon: "👤", text: "New user registered:", highlight: "Olivia Carter",     time: "2 min ago" },
  { icon: "🚗", text: "New listing added:",   highlight: "Ferrari 488 GTB",   time: "15 min ago" },
  { icon: "📅", text: "Booking confirmed:",   highlight: "Porsche 911 Carrera S", time: "32 min ago" },
  { icon: "⭐", text: "Review received:",     highlight: "5 stars",           time: "1 hour ago" },
];

const navItems = [
  // { icon: DashIcon,     label: "Dashboard", active: true  },
  { icon: ListIcon,     label: "Listings",  active: false },
  { icon: UsersIcon,    label: "Users",     active: false },
  { icon: MsgIcon,      label: "Messages",  active: false },
  { icon: BookIcon,     label: "Bookings",  active: false },
  { icon: StarIcon,     label: "Reviews",   active: false },
  { icon: ChartIcon,    label: "Reports",   active: false },
  { icon: GearIcon,     label: "Settings",  active: false },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function DashIcon({ c }) { return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke={c} strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke={c} strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke={c} strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" stroke={c} strokeWidth="1.8"/></svg>; }
function ListIcon({ c }) { return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="2" rx="1" fill={c}/><rect x="3" y="11" width="18" height="2" rx="1" fill={c}/><rect x="3" y="17" width="12" height="2" rx="1" fill={c}/></svg>; }
function UsersIcon({ c }) { return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4" stroke={c} strokeWidth="1.8"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function MsgIcon({ c }) { return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>; }
function BookIcon({ c }) { return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function StarIcon({ c }) { return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>; }
function ChartIcon({ c }) { return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function GearIcon({ c }) { return <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.8"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function CarIcon({ c = "#3b82f6" }) { return <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2v-4l2-5h14l2 5v4a2 2 0 0 1-2 2h-2" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/><circle cx="7.5" cy="17.5" r="2.5" stroke={c} strokeWidth="1.6"/><circle cx="16.5" cy="17.5" r="2.5" stroke={c} strokeWidth="1.6"/></svg>; }
function UserIcon({ c = "#3b82f6" }) { return <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.6"/><path d="M4 20v-1a8 8 0 0 1 16 0v1" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>; }
function DollarIcon({ c = "#3b82f6" }) { return <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.6"/><path d="M12 6v12M9 9.5C9 8.12 10.34 7 12 7s3 1.12 3 2.5-1.34 2.5-3 2.5-3 1.12-3 2.5S10.34 17 12 17s3-1.12 3-2.5" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>; }
function EyeIcon({ c = "#3b82f6" }) { return <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={c} strokeWidth="1.6"/><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.6"/></svg>; }
function BellIcon() { return <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#94a3b8" strokeWidth="1.6" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round"/></svg>; }
function ChatIcon2() { return <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#94a3b8" strokeWidth="1.6" strokeLinejoin="round"/></svg>; }
function ChevronDown() { return <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ArrowRight({ c = "#fff" }) { return <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function TrendUp() { return <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M22 7l-8.5 8.5-5-5L2 17" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 7h6v6" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function SunIcon() { return <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="#f59e0b" strokeWidth="2"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/></svg>; }
function MoonIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="#c8d8e8" strokeWidth="2" strokeLinejoin="round"/></svg>; }
function StatusDot() { return <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}/>; }

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(14,17,23,.95)", border: "1px solid rgba(30,111,255,.3)", borderRadius: 6, padding: "8px 14px", backdropFilter: "blur(12px)" }}>
      <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#64748b", marginBottom: 2 }}>{label}</div>
      <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "#3b82f6" }}>
        ${Number(payload[0].value).toLocaleString()}
      </div>
    </div>
  );
}

// ─── Car SVG for hero ─────────────────────────────────────────────────────────
function HeroCar() {
  return (
    <svg viewBox="0 0 700 280" style={{ width: "100%", height: "100%", opacity: .92 }} fill="none">
      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#2a3a5c"/>
          <stop offset="100%" stopColor="#0a0e18"/>
        </radialGradient>
        <radialGradient id="glowR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e6fff" stopOpacity=".6"/>
          <stop offset="100%" stopColor="#1e6fff" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="shadowEl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity=".8"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="softglow"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="350" cy="245" rx="280" ry="22" fill="url(#shadowEl)" opacity=".7"/>

      {/* Headlight glow */}
      <ellipse cx="600" cy="175" rx="60" ry="30" fill="url(#glowR)" style={{ filter: "blur(18px)" }} opacity=".5"/>

      {/* Car body */}
      <path d="M80 200 L110 155 Q135 125 175 115 L240 105 Q295 98 360 96 L460 95 Q530 96 570 105 L620 118 Q655 130 665 150 L672 175 L672 205 L80 205 Z"
        fill="url(#bodyGrad)" stroke="rgba(60,100,180,.3)" strokeWidth="1"/>

      {/* Cabin / greenhouse */}
      <path d="M200 115 L230 90 Q255 72 300 68 L390 65 Q450 64 490 70 L540 82 Q565 90 575 105 L570 115 Z"
        fill="#111827" stroke="rgba(80,130,200,.2)" strokeWidth=".8"/>
      <path d="M225 113 L255 90 Q275 76 310 72 L390 69 Q440 68 475 74 L520 86 L515 113 Z"
        fill="rgba(30,60,120,.35)" stroke="rgba(80,140,220,.15)" strokeWidth=".5"/>

      {/* Wheel arches */}
      <path d="M100 205 Q100 175 135 165 Q175 155 200 175 Q218 188 218 205" fill="#080c14" stroke="rgba(30,111,255,.2)" strokeWidth="1"/>
      <path d="M490 205 Q490 170 525 162 Q568 154 592 173 Q610 186 610 205" fill="#080c14" stroke="rgba(30,111,255,.2)" strokeWidth="1"/>

      {/* Wheels */}
      <circle cx="162" cy="205" r="36" fill="#0a0d16" stroke="#1e3a6e" strokeWidth="2"/>
      <circle cx="162" cy="205" r="24" fill="#0e1525" stroke="#1e4a8e" strokeWidth="1.5"/>
      <circle cx="162" cy="205" r="10" fill="#1a2a4a" stroke="#3b82f6" strokeWidth="1" opacity=".8"/>
      <circle cx="162" cy="205" r="4" fill="#3b82f6" opacity=".7"/>
      {[0,60,120,180,240,300].map(a => (
        <line key={a} x1="162" y1="205"
          x2={162 + 20 * Math.cos(a * Math.PI / 180)}
          y2={205 + 20 * Math.sin(a * Math.PI / 180)}
          stroke="#1e3a6e" strokeWidth="1.5"/>
      ))}

      <circle cx="548" cy="205" r="36" fill="#0a0d16" stroke="#1e3a6e" strokeWidth="2"/>
      <circle cx="548" cy="205" r="24" fill="#0e1525" stroke="#1e4a8e" strokeWidth="1.5"/>
      <circle cx="548" cy="205" r="10" fill="#1a2a4a" stroke="#3b82f6" strokeWidth="1" opacity=".8"/>
      <circle cx="548" cy="205" r="4" fill="#3b82f6" opacity=".7"/>
      {[0,60,120,180,240,300].map(a => (
        <line key={a} x1="548" y1="205"
          x2={548 + 20 * Math.cos(a * Math.PI / 180)}
          y2={205 + 20 * Math.sin(a * Math.PI / 180)}
          stroke="#1e3a6e" strokeWidth="1.5"/>
      ))}

      {/* Front headlight */}
      <rect x="655" y="165" width="16" height="10" rx="2" fill="#3b82f6" opacity=".9" filter="url(#glow)"/>
      <rect x="651" y="168" width="4" height="6" rx="1" fill="#7dd3fc" opacity=".8"/>

      {/* Rear light */}
      <rect x="76" y="172" width="12" height="20" rx="2" fill="#dc2626" opacity=".6" filter="url(#glow)"/>

      {/* Hood crease */}
      <path d="M570 115 Q620 120 655 148" stroke="rgba(60,120,200,.25)" strokeWidth="1" fill="none"/>

      {/* Side crease */}
      <path d="M125 175 Q350 168 575 170" stroke="rgba(80,140,220,.2)" strokeWidth=".8" fill="none"/>

      {/* Blue ground glow */}
      <ellipse cx="350" cy="242" rx="200" ry="10" fill="#1e6fff" opacity=".08" style={{ filter: "blur(6px)" }}/>
    </svg>
  );
}

// ─── Mini car thumbnails ───────────────────────────────────────────────────────
function MiniCar({ color = "#1e3a6e", accent = "#3b82f6" }) {
  return (
    <svg viewBox="0 0 80 40" width="70" height="35" fill="none">
      <path d="M8 28 L12 18 Q16 12 22 10 L36 8 Q50 7 58 9 L68 13 Q74 16 75 22 L76 28 Z" fill={color} stroke={accent} strokeWidth=".8" opacity=".9"/>
      <path d="M22 10 L27 4 Q32 1 40 1 L52 1 Q58 2 62 7 L60 10 Z" fill={`${accent}33`} stroke={`${accent}44`} strokeWidth=".5"/>
      <circle cx="22" cy="28" r="7" fill="#0a0d16" stroke={accent} strokeWidth=".8"/>
      <circle cx="22" cy="28" r="4" fill="#1a2a4a" stroke={accent} strokeWidth=".5" opacity=".8"/>
      <circle cx="62" cy="28" r="7" fill="#0a0d16" stroke={accent} strokeWidth=".8"/>
      <circle cx="62" cy="28" r="4" fill="#1a2a4a" stroke={accent} strokeWidth=".5" opacity=".8"/>
    </svg>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ isOpen, onClose }) {
  const { dark, setDark, t } = useContext(ThemeContext);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: .5, ease: [.23, 1, .32, 1] }}
        style={{
          width: 200, flexShrink: 0, height: "100vh",
          background: t.sidebarBg,
          borderRight: `1px solid ${t.sidebarBorder}`,
          boxShadow: "4px 0 32px rgba(30,111,255,.06)",
          display: "flex", flexDirection: "column",
          position: "fixed", top: 0, left: 0, zIndex: 40,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
        className="lg:!transform-none lg:!translate-x-0 lg:sticky lg:top-0"
      >
      {/* Logo */}
      <div style={{ padding: "22px 20px 28px", borderBottom: `1px solid ${t.rowBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 30, height: 30, background: "linear-gradient(135deg, #1e6fff, #3b82f6)",
            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 900, color: "#fff", letterSpacing: "-.5px",
            boxShadow: "0 0 12px rgba(30,111,255,.5)",
          }}>B</div>
          <div style={{ display: "flex", gap: 3, alignItems: "baseline", flex: 1 }}>
            <span style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 700, color: t.logoSub, letterSpacing: ".15em" }}>BOX</span>
            <span style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 800, color: t.logoMain, letterSpacing: ".08em" }}>CARS</span>
          </div>
          {/* Mobile close */}
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white ml-auto" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: "12px", borderTop: `1px solid ${t.rowBorder}`, marginTop: "auto" }}>
        {/* System status */}
        <div style={{
          background: t.statusBg, border: `1px solid ${t.statusBorder}`,
          borderRadius: 8, padding: "10px 12px", marginBottom: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <StatusDot/>
            <span style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 600, color: t.textMuted }}>System Status</span>
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#22c55e", fontWeight: 500 }}>All Systems Operational</div>
        </div>

        {/* Theme toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 4px" }}>
          <SunIcon/>
          <div
            onClick={() => setDark(v => !v)}
            style={{
              width: 42, height: 22, borderRadius: 11,
              background: dark ? "linear-gradient(90deg, #1e6fff, #3b82f6)" : "rgba(148,163,184,.3)",
              position: "relative", cursor: "pointer",
              boxShadow: dark ? "0 0 10px rgba(30,111,255,.4)" : "none",
              transition: "all .3s ease",
            }}
          >
            <motion.div
              animate={{ x: dark ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{
                position: "absolute", top: 3, width: 16, height: 16,
                borderRadius: "50%", background: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,.3)",
              }}
            />
          </div>
          <MoonIcon/>
        </div>
      </div>
    </motion.aside>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ onMenuClick, notifications = [], onClearNotifications }) {
  const { t } = useContext(ThemeContext);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const unread = notifications.filter(n => !n.read).length;
  const total  = notifications.length;
  const notifRef = useRef(null);
  const bellRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ top: 0, right: 0 });

  // Close panel when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (
        notifRef.current && !notifRef.current.contains(e.target) &&
        bellRef.current  && !bellRef.current.contains(e.target)
      ) {
        setShowNotifPanel(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleBellClick = () => {
    if (bellRef.current) {
      const rect = bellRef.current.getBoundingClientRect();
      setPanelPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
    setShowNotifPanel(v => !v);
  };
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .4, delay: .1 }}
      style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "14px 16px 14px 20px",
        borderBottom: `1px solid ${t.rowBorder}`,
        background: t.headerBg,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Burger — mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden flex flex-col gap-1 p-1 mr-1"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ display: "block", width: 20, height: 2, background: t.textMuted, borderRadius: 2 }} />
        <span style={{ display: "block", width: 20, height: 2, background: t.textMuted, borderRadius: 2 }} />
        <span style={{ display: "block", width: 14, height: 2, background: t.textMuted, borderRadius: 2 }} />
      </button>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 400, position: "relative", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 12, opacity: .4 }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke={t.textMuted} strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <input
          placeholder="Search cars, users, listings..."
          style={{
            width: "100%", background: t.inputBg,
            border: `1px solid ${t.inputBorder}`, borderRadius: 8,
            padding: "9px 36px 9px 36px",
            fontFamily: "sans-serif", fontSize: 13, color: t.textMuted,
            outline: "none",
          }}
        />
        <div style={{
          position: "absolute", right: 10,
          background: t.chipBg, border: `1px solid ${t.chipBorder}`,
          borderRadius: 4, padding: "2px 7px",
          fontFamily: "sans-serif", fontSize: 11, color: t.textFaint,
        }}>/</div>
      </div>

      <div style={{ flex: 1 }}/>

      {/* Icons */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>

        {/* ─── Notification Bell ─── */}
        <div style={{ position: "relative" }}>
          <motion.div
            ref={bellRef}
            whileHover={{ scale: 1.1 }}
            onClick={handleBellClick}
            style={{
              width: 36, height: 36, borderRadius: 8, cursor: "pointer",
              background: showNotifPanel ? "rgba(59,130,246,.15)" : t.inputBg,
              border: showNotifPanel ? "1px solid rgba(59,130,246,.4)" : `1px solid ${t.inputBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "visible",
            }}
          >
            <BellIcon/>
            {total > 0 && (
              <div style={{
                position: "absolute", top: -6, right: -6,
                minWidth: 18, height: 18, borderRadius: 9,
                background: unread > 0 ? "#ef4444" : "#3b82f6",
                border: "2px solid #070b14",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "sans-serif", fontSize: 10, fontWeight: 800, color: "#fff",
                padding: "0 4px", zIndex: 10,
                boxShadow: unread > 0 ? "0 0 8px rgba(239,68,68,.6)" : "0 0 8px rgba(59,130,246,.5)",
              }}>{total > 99 ? "99+" : total}</div>
            )}
          </motion.div>

          {createPortal(
            <AnimatePresence>
              {showNotifPanel && (
                <motion.div
                  ref={notifRef}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position: "fixed", top: panelPos.top, right: panelPos.right,
                    width: 340, maxHeight: 480,
                    background: "rgba(10,14,26,.98)",
                    border: "1px solid rgba(59,130,246,.25)", borderRadius: 12,
                    boxShadow: "0 24px 64px rgba(0,0,0,.8), 0 0 30px rgba(30,111,255,.1)",
                    backdropFilter: "blur(20px)", zIndex: 99999,
                    overflow: "hidden", display: "flex", flexDirection: "column",
                  }}
                >
                  <div style={{
                    padding: "14px 16px 10px",
                    borderBottom: "1px solid rgba(255,255,255,.06)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>Notifications</div>
                      {unread > 0 && (
                        <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#3b82f6", marginTop: 1 }}>{unread} new</div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={onClearNotifications}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontFamily: "sans-serif", fontSize: 11, color: "#64748b",
                          padding: "4px 8px", borderRadius: 6, transition: "color .15s",
                        }}
                        onMouseEnter={e => e.target.style.color = "#3b82f6"}
                        onMouseLeave={e => e.target.style.color = "#64748b"}
                      >Clear all</button>
                    )}
                  </div>

                  {/* Notification List */}
                  <div style={{ overflowY: "auto", flex: 1 }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: "32px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{ fontSize: 28, opacity: .4 }}>🔔</div>
                        <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#475569" }}>No notifications yet</div>
                      </div>
                    ) : (
                      notifications.map((n, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                          style={{
                            display: "flex", gap: 12, padding: "12px 16px",
                            borderBottom: `1px solid ${t.rowBorder}`,
                            background: n.read ? "transparent" : "rgba(59,130,246,.05)",
                            cursor: "default", transition: "background .15s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.04)"}
                          onMouseLeave={e => e.currentTarget.style.background = n.read ? "transparent" : "rgba(59,130,246,.05)"}
                        >
                          {/* Icon */}
                          <div style={{
                            width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                            background: n.available
                              ? "rgba(34,197,94,.15)"
                              : "rgba(239,68,68,.15)",
                            border: n.available
                              ? "1px solid rgba(34,197,94,.3)"
                              : "1px solid rgba(239,68,68,.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 16,
                          }}>
                            🚗
                          </div>
                          {/* Content */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#cbd5e1", lineHeight: 1.4 }}>
                              <span style={{ fontWeight: 700, color: "#e2e8f0" }}>{n.username}</span>
                              {" changed availability of "}
                              <span style={{ fontWeight: 700, color: "#3b82f6" }}>{n.carName}</span>
                              {" to "}
                              <span style={{
                                fontWeight: 700,
                                color: n.available ? "#22c55e" : "#ef4444",
                              }}>
                                {n.available ? "AVAILABLE" : "NOT AVAILABLE"}
                              </span>
                            </div>
                            <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#475569", marginTop: 3 }}>
                              {n.timeAgo}
                            </div>
                          </div>
                          {/* Unread dot */}
                          {!n.read && (
                            <div style={{
                              width: 8, height: 8, borderRadius: "50%",
                              background: "#3b82f6",
                              boxShadow: "0 0 6px #3b82f6",
                              flexShrink: 0, marginTop: 4,
                            }}/>
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
        </div>

        <motion.div whileHover={{ scale: 1.1 }} style={{
          width: 36, height: 36, borderRadius: 8, cursor: "pointer",
          background: t.inputBg, border: `1px solid ${t.inputBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ChatIcon2/>
        </motion.div>
      </div>

      {/* Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 12, borderLeft: `1px solid ${t.rowBorder}`, cursor: "pointer" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #1e4080, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "#fff",
          boxShadow: "0 0 10px rgba(30,111,255,.35)",
        }}>EW</div>
        <div>
          <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 600, color: t.textSub, lineHeight: 1.2 }}>Yassir</div>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: t.textFaint }}>Administrator</div>
        </div>
        <ChevronDown/>
      </div>
    </motion.header>
  );
}

// ─── Hero Welcome Card ─────────────────────────────────────────────────────────
function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .2, duration: .6, ease: [.23, 1, .32, 1] }}
      style={{
        position: "relative", borderRadius: 14, overflow: "hidden",
        border: "1px solid rgba(30,111,255,.15)",
        boxShadow: "0 8px 40px rgba(0,0,0,.4), 0 0 30px rgba(30,111,255,.08)",
        minHeight: 200,
        background: "linear-gradient(135deg, #f0f0f0ff 0%, #0d1a35 40%, #425273ff 100%)",
      }}
    >
      {/* Atmospheric overlays */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 65% 50%, rgba(30,111,255,.08) 0%, transparent 70%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", right: 0, bottom: 0, width: "65%", height: "100%", pointerEvents: "none" }}>
        <HeroCar/>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(5,10,20,.95) 0%, rgba(5,10,20,.7) 35%, rgba(5,10,20,.1) 60%, transparent 100%)", pointerEvents: "none" }}/>


      {/* Bottom nav dots */}
      <div style={{ position: "absolute", bottom: 16, left: 32, display: "flex", gap: 6, zIndex: 3 }}>
        {[1,2,3,4,5].map((_, i) => (
          <div key={i} style={{ width: i === 0 ? 18 : 6, height: 6, borderRadius: 3, background: i === 0 ? "#3b82f6" : "rgba(255,255,255,.2)", transition: "all .3s" }}/>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────
function StatCards({ totalCars, totalUsers }) {
  const { t } = useContext(ThemeContext);
  const stats = [
    { label: "Total Listings", value: totalCars !== null ? totalCars.toLocaleString() : "...", change: "Live data", Icon: CarIcon },
    { label: "Total Users",    value: totalUsers !== null ? totalUsers.toLocaleString() : "...", change: "Live data", Icon: UserIcon },
    { label: "Total Sales",    value: "$2.49M", change: "+18.7% from last month", Icon: DollarIcon },
    { label: "Total Views",    value: "24.8K",  change: "+15.3% from last month", Icon: EyeIcon },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
      {stats.map(({ label, value, change, Icon }, i) => (
        <motion.div key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .3 + i * .07, duration: .5, ease: [.23, 1, .32, 1] }}
          whileHover={{ y: -3, boxShadow: "0 12px 36px rgba(0,0,0,.2), 0 0 20px rgba(30,111,255,.1)" }}
          style={{
            background: t.cardBg,
            border: `1px solid ${t.cardBorder}`,
            borderRadius: 12, padding: "18px 20px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0,0,0,.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ fontFamily: "sans-serif", fontSize: 12, color: t.textFaint, fontWeight: 500 }}>{label}</div>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: "rgba(30,111,255,.1)", border: "1px solid rgba(30,111,255,.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon c="#3b82f6"/>
            </div>
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 26, fontWeight: 800, color: t.text, marginBottom: 8, letterSpacing: "-.5px" }}>{value}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <TrendUp/>
            <span style={{ fontFamily: "sans-serif", fontSize: 11, color: "#22c55e" }}>{change}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Sales Chart ──────────────────────────────────────────────────────────────
function SalesChart() {
  const { t } = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .55, duration: .5 }}
      style={{
        background: t.cardBg2,
        border: `1px solid ${t.cardBorder}`, borderRadius: 12,
        padding: "20px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: t.textSub }}>Sales Overview</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
          background: t.inputBg, border: `1px solid ${t.inputBorder}`,
          borderRadius: 6, padding: "5px 10px",
        }}>
          <span style={{ fontFamily: "sans-serif", fontSize: 11, color: t.textFaint }}>This Month</span>
          <ChevronDown/>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={salesData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity=".35"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity=".02"/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke={t.rowBorder} vertical={false}/>
          <XAxis dataKey="date" tick={{ fontFamily: "sans-serif", fontSize: 11, fill: t.textFaintest }} axisLine={false} tickLine={false}/>
          <YAxis tickFormatter={v => `$${v / 1000}k`} tick={{ fontFamily: "sans-serif", fontSize: 11, fill: t.textFaintest }} axisLine={false} tickLine={false} width={45}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#blueGrad)"
            dot={{ fill: "#3b82f6", strokeWidth: 0, r: 4 }}
            activeDot={{ fill: "#3b82f6", strokeWidth: 2, stroke: "#fff", r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ─── Category Donut ────────────────────────────────────────────────────────────
function CategoryChart() {
  const { t } = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .6, duration: .5 }}
      style={{
        background: t.cardBg2,
        border: `1px solid ${t.cardBorder}`, borderRadius: 12,
        padding: "20px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,.1)",
      }}
    >
      <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: t.textSub, marginBottom: 16 }}>Listings by Category</div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {/* Donut */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <PieChart width={160} height={160}>
            <Pie data={categoryData} cx={75} cy={75} innerRadius={48} outerRadius={70}
              paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}
            >
              {categoryData.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
            </Pie>
          </PieChart>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
            <div style={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: 800, color: t.text, lineHeight: 1.1 }}>1,248</div>
            <div style={{ fontFamily: "sans-serif", fontSize: 10, color: t.textFaint }}>Total</div>
          </div>
        </div>
        {/* Legend */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {categoryData.map(({ name, value, color }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}`, flexShrink: 0 }}/>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, color: t.textMuted, flex: 1 }}>{name}</span>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 600, color: t.textSub }}>{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Recent Listings Table ─────────────────────────────────────────────────────
const carColors = ["#1e3a6e", "#2d1a50", "#1a3d1a", "#3d1a1a"];
const carAccents = ["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444"];

function RecentListings() {
  const { t } = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .65, duration: .5 }}
      style={{
        background: t.cardBg2,
        border: `1px solid ${t.cardBorder}`, borderRadius: 12,
        padding: "20px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: t.textSub }}>Recent Listings</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#3b82f6" }}>View All Listings</span>
          <ArrowRight c="#3b82f6"/>
        </div>
      </div>

      {/* Table header */}
      <div style={{ overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 8, padding: "8px 4px", marginBottom: 4, borderBottom: `1px solid ${t.rowBorder}`, minWidth: 480 }}>
        {["Car", "Category", "Price", "Status", "Date"].map(h => (
          <div key={h} style={{ fontFamily: "sans-serif", fontSize: 11, color: t.textFaintest, fontWeight: 500, letterSpacing: ".04em" }}>{h}</div>
        ))}
      </div>

      {/* Rows */}
      {listings.map((l, i) => (
        <motion.div key={l.id}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .7 + i * .06 }}
          whileHover={{ background: t.rowHover }}
          style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 8,
            padding: "10px 4px", borderBottom: `1px solid ${t.rowBorder}`,
            alignItems: "center", cursor: "pointer", borderRadius: 6, minWidth: 480,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 60, height: 34, borderRadius: 6, overflow: "hidden",
              background: `linear-gradient(135deg, ${carColors[i]}, #080c14)`,
              border: `1px solid ${t.cardBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <MiniCar color={carColors[i]} accent={carAccents[i]}/>
            </div>
            <span style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 600, color: t.textMuted }}>{l.name}</span>
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: t.textFaint }}>{l.category}</div>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 600, color: t.textSub }}>{l.price}</div>
          <div>
            <span style={{
              fontFamily: "sans-serif", fontSize: 11, fontWeight: 600, color: l.color,
              background: `${l.color}18`, borderRadius: 4, padding: "3px 8px",
              border: `1px solid ${l.color}30`,
            }}>{l.status}</span>
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: t.textFaintest }}>{l.date}</div>
        </motion.div>
      ))}
      </div> {/* close overflow-x-auto */}
    </motion.div>
  );
}

// ─── Recent Activity ──────────────────────────────────────────────────────────
const activityIcons = [
  <svg key="u" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#3b82f6" strokeWidth="1.8"/><path d="M4 20v-1a8 8 0 0 1 16 0v1" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="c" width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2v-4l2-5h14l2 5v4a2 2 0 0 1-2 2h-2" stroke="#22c55e" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="7.5" cy="17.5" r="2.5" stroke="#22c55e" strokeWidth="1.8"/><circle cx="16.5" cy="17.5" r="2.5" stroke="#22c55e" strokeWidth="1.8"/></svg>,
  <svg key="b" width="14" height="14" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#f59e0b" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  <svg key="s" width="14" height="14" fill="none" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="#f472b6" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
];
const activityColors = ["#3b82f6", "#22c55e", "#f59e0b", "#f472b6"];

function RecentActivity() {
  const { t } = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .7, duration: .5 }}
      style={{
        background: t.cardBg2,
        border: `1px solid ${t.cardBorder}`, borderRadius: 12,
        padding: "20px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,.1)",
      }}
    >
      <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: t.textSub, marginBottom: 16 }}>Recent Activity</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {activities.map(({ text, highlight, time }, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .75 + i * .07 }}
            style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < activities.length - 1 ? `1px solid ${t.rowBorder}` : "none", alignItems: "flex-start" }}
          >
            <div style={{
              width: 30, height: 30, borderRadius: 8, flexShrink: 0, marginTop: 1,
              background: `${activityColors[i]}18`, border: `1px solid ${activityColors[i]}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {activityIcons[i]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "sans-serif", fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>
                {text} <span style={{ color: t.textSub, fontWeight: 600 }}>{highlight}</span>
              </div>
              <div style={{ fontFamily: "sans-serif", fontSize: 11, color: t.textFaintest, marginTop: 3 }}>{time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.rowBorder}`, textAlign: "center", cursor: "pointer" }}>
        <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          View All Activity <ArrowRight c="#3b82f6"/>
        </span>
      </div>
    </motion.div>
  );
}

// ─── Quick Actions ─────────────────────────────────────────────────────────────
const actions = [
  { label: "Add New Listing", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg> },
  { label: "Manage Users",    icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4" stroke="#3b82f6" strokeWidth="1.8"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { label: "View Messages",   icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#3b82f6" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
  { label: "Generate Report", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round"/></svg> },
];

function QuickActions() {
  const { t } = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .72, duration: .5 }}
      style={{
        background: t.cardBg2,
        border: `1px solid ${t.cardBorder}`, borderRadius: 12,
        padding: "20px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,.1)",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: t.textSub, marginBottom: 14 }}>Quick Actions</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        {actions.map(({ label, icon }, i) => (
          <motion.button key={label}
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .78 + i * .06 }}
            whileHover={{ x: 3, background: "rgba(30,111,255,.1)", borderColor: "rgba(30,111,255,.3)" }}
            whileTap={{ scale: .97 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px", borderRadius: 8, cursor: "pointer",
              background: t.inputBg, border: `1px solid ${t.inputBorder}`,
              transition: "all .2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(30,111,255,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {icon}
              </div>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 500, color: t.textMuted }}>{label}</span>
            </div>
            <ArrowRight c={t.textFaintest}/>
          </motion.button>
        ))}
      </div>

      {/* Upgrade CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: 16, borderRadius: 10, padding: "14px 16px",
          background: "linear-gradient(135deg, #1e3a6e, #1e2a5e)",
          border: "1px solid rgba(30,111,255,.3)",
          boxShadow: "0 0 20px rgba(30,111,255,.1)",
        }}
      >
        <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>Boost Your Sales</div>
        <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#64748b", lineHeight: 1.5, marginBottom: 12 }}>
          Upgrade to premium to reach more buyers.
        </div>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 16px rgba(30,111,255,.5)" }}
          whileTap={{ scale: .97 }}
          style={{
            width: "100%", padding: "8px 0",
            background: "linear-gradient(90deg, #1e6fff, #3b82f6)",
            border: "none", borderRadius: 7, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "sans-serif", fontSize: 12, fontWeight: 600, color: "#fff",
          }}
        >
          Upgrade Now <ArrowRight/>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Users With Cars ──────────────────────────────────────────────────────────
function UsersWithCars({ users }) {
  const { t } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .75, duration: .5 }}
      style={{
        background: t.cardBg2,
        border: `1px solid ${t.cardBorder}`, borderRadius: 12,
        padding: "20px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,.1)",
      }}
    >
      <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: t.textSub, marginBottom: 16 }}>
        Users &amp; Their Available Cars
      </div>

      {users.length === 0 && (
        <div style={{ fontFamily: "sans-serif", fontSize: 13, color: t.textFaintest, textAlign: "center", padding: "20px 0" }}>No users found.</div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {users.map((user, i) => (
          <motion.div key={user.id}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 + i * .04 }}
            style={{
              borderRadius: 10,
              border: expanded === user.id ? "1px solid rgba(30,111,255,.3)" : `1px solid ${t.cardBorder}`,
              background: expanded === user.id ? "rgba(30,111,255,.06)" : t.inputBg,
              overflow: "hidden", transition: "border-color .2s, background .2s",
            }}
          >
            <div
              onClick={() => setExpanded(expanded === user.id ? null : user.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer" }}
            >
              <div style={{ flexShrink: 0 }}>
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.username}
                    style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(30,111,255,.3)" }}
                  />
                ) : (
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1e4080, #3b82f6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "#fff",
                    boxShadow: "0 0 8px rgba(30,111,255,.3)",
                  }}>
                    {user.username?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 600, color: t.textSub }}>{user.username}</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 11, color: t.textFaintest }}>{user.email}</div>
              </div>

              <div style={{
                background: user.availableCars.length > 0 ? "rgba(34,197,94,.12)" : t.inputBg,
                border: user.availableCars.length > 0 ? "1px solid rgba(34,197,94,.3)" : `1px solid ${t.cardBorder}`,
                borderRadius: 6, padding: "3px 10px",
                fontFamily: "sans-serif", fontSize: 11, fontWeight: 600,
                color: user.availableCars.length > 0 ? "#22c55e" : t.textFaintest,
              }}>
                {user.availableCars.length} car{user.availableCars.length !== 1 ? "s" : ""}
              </div>

              <motion.div animate={{ rotate: expanded === user.id ? 180 : 0 }} transition={{ duration: .2 }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke={t.textFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.div>
            </div>

            <AnimatePresence>
              {expanded === user.id && (
                <motion.div key="cars"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: .25 }} style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${t.rowBorder}` }}>
                    {user.availableCars.length === 0 ? (
                      <div style={{ fontFamily: "sans-serif", fontSize: 12, color: t.textFaintest, paddingTop: 12 }}>No available cars for this user.</div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, paddingTop: 12 }}>
                        {user.availableCars.map((car) => (
                          <motion.div key={car.id}
                            whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}
                            style={{
                              background: t.inputBg, borderRadius: 10,
                              border: `1px solid ${t.cardBorder}`, overflow: "hidden",
                            }}
                          >
                            <div style={{ width: "100%", height: 110, background: "linear-gradient(135deg, #0d1a35, #050a15)", position: "relative", overflow: "hidden" }}>
                              {car.image ? (
                                <img src={car.image} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .9 }}/>
                              ) : (
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <CarIcon c="#1e3a6e"/>
                                </div>
                              )}
                              {/* Available badge */}
                              <div style={{
                                position: "absolute", top: 6, right: 6,
                                background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.4)",
                                borderRadius: 4, padding: "2px 7px",
                                fontFamily: "sans-serif", fontSize: 9, fontWeight: 700, color: "#22c55e",
                              }}>AVAILABLE</div>
                            </div>
                            <div style={{ padding: "10px 12px" }}>
                              <div style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {car.name}
                              </div>
                              <div style={{ fontFamily: "sans-serif", fontSize: 11, color: t.textFaint, marginBottom: 6 }}>{car.category}</div>
                              <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 800, color: "#3b82f6" }}>{car.price?.toLocaleString()} DH</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Dashboard Root ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminStats, setAdminStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [dark, setDark] = useState(true);
  const t = dark ? themes.dark : themes.light;

  // Auth guard — redirect to login if not an admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    if (!token || role !== "ADMIN") {
      window.location.href = "/login";
    }
  }, []);

  // Load persisted notifications from DB on mount
  useEffect(() => {
    getNotifications()
      .then(res => {
        const mapped = res.data.map(n => ({
          ...n,
          timeAgo: formatTimeAgo(n.timestamp),
        }));
        setNotifications(mapped);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getAdminStats()
      .then(res => setAdminStats(res.data))
      .catch(err => {
        console.warn("Could not load admin stats:", err?.response?.status, err?.message);
      });
  }, []);

  // ─── WebSocket connection for real-time notifications ───────────────────────
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/admin/notifications", (message) => {
          const data = JSON.parse(message.body);
          setNotifications(prev => [
            { ...data, read: false, timeAgo: "just now" },
            ...prev,
          ]);
          getAdminStats().then(res => setAdminStats(res.data)).catch(() => {});
        });
      },
      onStompError: (frame) => console.error("❌ WebSocket STOMP error:", frame),
    });
    client.activate();
    return () => client.deactivate();
  }, []);

  const handleClearNotifications = () => {
    clearNotifications().catch(() => {});
    setNotifications([]);
  };

  // Auto-mark toasts as read after 5s
  useEffect(() => {
    const hasUnread = notifications.some(n => !n.read);
    if (!hasUnread) return;
    const timer = setTimeout(() => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      markNotificationsRead().catch(() => {});
    }, 5000);
    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <ThemeContext.Provider value={{ dark, setDark, t }}>
    <div style={{
      display: "flex", minHeight: "100vh",
      background: t.bg,
      fontFamily: "system-ui, -apple-system, sans-serif",
      transition: "background .3s ease",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: ${t.bg}; transition: background .3s ease; }
        input { outline: none; }
        button { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${t.scrollTrack}; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; border-radius: 2px; }
        @media (min-width: 1024px) {
          .sidebar-spacer { width: 200px; flex-shrink: 0; }
        }
      `}</style>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="hidden lg:block" style={{ width: 200, flexShrink: 0 }} />

      {/* Toast notifications */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
        <AnimatePresence>
          {notifications.slice(0, 3).filter(n => !n.read).map((n, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 80, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              style={{
                background: "rgba(10,14,26,.97)", border: "1px solid rgba(59,130,246,.3)",
                borderRadius: 12, padding: "12px 16px", maxWidth: 320,
                boxShadow: "0 12px 40px rgba(0,0,0,.6), 0 0 20px rgba(30,111,255,.12)",
                backdropFilter: "blur(20px)", display: "flex", gap: 12, alignItems: "flex-start",
                pointerEvents: "auto",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: n.available ? "rgba(34,197,94,.15)" : "rgba(239,68,68,.15)",
                border: n.available ? "1px solid rgba(34,197,94,.3)" : "1px solid rgba(239,68,68,.3)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>🚗</div>
              <div>
                <div style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 700, color: "#e2e8f0", marginBottom: 2 }}>Car Availability Update</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#94a3b8", lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 700, color: "#fff" }}>{n.username}</span>{" set "}
                  <span style={{ fontWeight: 700, color: "#3b82f6" }}>{n.carName}</span>{" as "}
                  <span style={{ fontWeight: 700, color: n.available ? "#22c55e" : "#ef4444" }}>
                    {n.available ? "available" : "unavailable"}
                  </span>
                </div>
                <div style={{ fontFamily: "sans-serif", fontSize: 10, color: "#475569", marginTop: 3 }}>{n.timeAgo}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden", minWidth: 0 }}>
        <Header onMenuClick={() => setSidebarOpen(true)} notifications={notifications} onClearNotifications={handleClearNotifications} />

        <main style={{ flex: 1, padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, background: t.bg }}>
          <HeroCard/>
          <StatCards totalCars={adminStats?.totalCars ?? null} totalUsers={adminStats?.totalUsers ?? null}/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            <SalesChart/>
            <CategoryChart/>
          </div>
          <UsersWithCars users={adminStats?.usersWithCars ?? []}/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            <RecentListings/>
            <RecentActivity/>
            <QuickActions/>
          </div>
        </main>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

