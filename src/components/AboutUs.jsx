import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Car,
  Users,
  Zap,
  Shield,
  TrendingUp,
  MapPin,
  CheckCircle,
  ArrowRight,
  Star,
  Building2,
  Clock,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Reusable Card ─── */
function GlassCard({ icon: Icon, title, desc, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-indigo-400/40 transition-all duration-300 shadow-sm hover:shadow-indigo-500/10"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ─── Step Card ─── */
function StepCard({ number, title, desc, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex gap-5 group"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <div>
        <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── Stat ─── */
function Stat({ value, label, delay = 0 }) {
  return (
    <motion.div variants={fadeUp} custom={delay} className="text-center">
      <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-gray-500 dark:text-slate-400 text-sm mt-1">{label}</div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════ */
export default function AboutUs() {
  return (
    <div dir="rtl" className="font-cairo min-h-screen bg-white dark:bg-[#08090f] text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
      <Navbar />

      {/* ── Ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-violet-400/8 dark:bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-400/8 dark:bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-full px-4 py-1.5 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-6"
          >
            <MapPin className="w-4 h-4" />
            Morocco · Safi &amp; Marrakech
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Reimagining{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Car Rental
            </span>
            <br />
            in Morocco
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="text-gray-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            AutoService is the smart bridge between local rental agencies and
            clients who need a car — fast, organized, and without the hassle.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-white/15 hover:border-indigo-400/50 hover:bg-indigo-50 dark:hover:bg-white/5 text-gray-700 dark:text-slate-300 font-semibold px-7 py-3.5 rounded-xl transition-all duration-300"
            >
              How It Works
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <AnimatedSection className="mt-20 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/3 backdrop-blur rounded-2xl px-8 py-7">
          <Stat value="2+" label="Cities Covered" delay={0} />
          <Stat value="50+" label="Partner Agencies" delay={1} />
          <Stat value="500+" label="Clients Served" delay={2} />
          <Stat value="0%" label="Upfront Fee" delay={3} />
        </AnimatedSection>
      </section>

      {/* ══ MISSION ══ */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <motion.p
              variants={fadeUp}
              className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Our Mission
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            >
              Helping local agencies{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                thrive digitally
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">
              Hundreds of car rental agencies across Moroccan cities operate
              without a digital presence. Meanwhile, clients waste precious time
              calling agency after agency hoping to find an available car.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-gray-600 dark:text-slate-400 leading-relaxed">
              AutoService solves this by centralizing availability in real time
              — connecting the right agency to the right client, instantly.
            </motion.p>
          </AnimatedSection>

          {/* Visual card */}
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="relative bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-md dark:shadow-2xl"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-violet-500/5 pointer-events-none" />
              {[
                { icon: Users, label: "Client needs a car", color: "from-blue-500 to-cyan-500" },
                { icon: Zap, label: "Admin matches instantly", color: "from-indigo-500 to-violet-500" },
                { icon: Car, label: "Agency confirms & delivers", color: "from-violet-500 to-pink-500" },
              ].map(({ icon: Icon, label, color }, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-center gap-4 mb-5 last:mb-0"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-white/10 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} opacity-60`}
                    />
                  </div>
                  <span className="text-gray-700 dark:text-slate-300 text-sm font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-white/2 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
              The Problem
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold mb-4">
              A market that needed a{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                digital layer
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
              The local car rental market is fragmented, slow, and opaque. We
              built the infrastructure to change that.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-3 gap-6">
            <GlassCard
              icon={Clock}
              title="Time wasted searching"
              desc="Clients call 5–10 agencies before finding an available car, wasting hours."
              delay={0}
            />
            <GlassCard
              icon={BarChart3}
              title="Zero visibility for agencies"
              desc="Agencies have no digital presence and lose potential clients every day."
              delay={1}
            />
            <GlassCard
              icon={Shield}
              title="No trust layer"
              desc="No platform validates agencies or protects clients from unreliable rentals."
              delay={2}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <motion.p variants={fadeUp} className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold leading-tight mb-10">
              Simple.{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Smart.
              </span>{" "}
              Fast.
            </motion.h2>

            <div className="space-y-8">
              <StepCard
                number="1"
                title="Agency updates availability"
                desc="Rental agencies log in and update their current fleet — available cars, models, prices."
                delay={0}
              />
              <StepCard
                number="2"
                title="Client submits a request"
                desc="Clients submit a rental request through the platform with their dates and preferences."
                delay={1}
              />
              <StepCard
                number="3"
                title="Admin matches & connects"
                desc="Our admin reviews requests and instantly matches the client with the best available agency."
                delay={2}
              />
              <StepCard
                number="4"
                title="Deal closed, commission earned"
                desc="The rental completes. AutoService earns only when a deal is successfully closed."
                delay={3}
              />
            </div>
          </AnimatedSection>

          {/* Decorative visual */}
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gradient-to-br from-indigo-50 dark:from-indigo-950/60 to-violet-50 dark:to-violet-950/40 p-10 shadow-lg dark:shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500/15 rounded-full blur-[60px]" />
              <div className="relative z-10 flex flex-col gap-5">
                {[
                  { label: "Agency Portal", sub: "Real-time fleet updates", icon: Building2, pct: "98%" },
                  { label: "Request Routing", sub: "Smart admin dashboard", icon: Zap, pct: "< 2 min" },
                  { label: "Commission Model", sub: "Pay only on success", icon: TrendingUp, pct: "0 risk" },
                ].map(({ label, sub, icon: Icon, pct }, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-2xl p-4 hover:border-indigo-400/40 transition-all duration-300 shadow-sm dark:shadow-none"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 dark:text-white font-semibold text-sm">{label}</div>
                      <div className="text-gray-400 dark:text-slate-500 text-xs">{sub}</div>
                    </div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">{pct}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-white/2 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Why AutoService
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold mb-4">
              Built for the{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                local market
              </span>
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Instant matching", desc: "No delays — the right agency is found in minutes, not hours." },
              { icon: Shield, title: "Verified agencies", desc: "Every partner agency is vetted for reliability and service quality." },
              { icon: TrendingUp, title: "Zero upfront cost", desc: "Agencies join for free. We earn only when a rental is completed." },
              { icon: BarChart3, title: "Real-time availability", desc: "Fleet data is always current — no stale listings, ever." },
              { icon: Users, title: "Human-first admin layer", desc: "A dedicated admin ensures every request is handled with care." },
              { icon: Star, title: "Local expertise", desc: "Deep knowledge of Safi, Marrakech and the Moroccan rental market." },
            ].map((card, i) => (
              <GlassCard key={i} {...card} delay={i % 3} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ══ BENEFITS FOR AGENCIES ══ */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <motion.p variants={fadeUp} className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
              For Agencies
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Grow your rental business{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                without the overhead
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-600 dark:text-slate-400 leading-relaxed mb-8">
              No marketing budget needed. No website to maintain. Just update
              your fleet and let AutoService bring qualified clients directly to you.
            </motion.p>
            <AnimatedSection className="space-y-4">
              {[
                "Free to join — no subscription fee",
                "Qualified client leads, not random traffic",
                "Simple fleet management dashboard",
                "Commission only on completed rentals",
                "Admin handles all client communication",
                "Expand reach across multiple cities",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className="flex items-center gap-3 text-gray-700 dark:text-slate-300"
                >
                  <CheckCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </AnimatedSection>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="bg-gradient-to-br from-indigo-50 dark:from-indigo-600/20 to-violet-50 dark:to-violet-600/15 border border-indigo-200 dark:border-indigo-500/20 rounded-3xl p-8 shadow-lg dark:shadow-indigo-500/10"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/40 mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white text-xl font-bold">Agency Partnership</h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Start receiving clients today</p>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Setup time", value: "< 24 hours" },
                  { label: "Monthly fee", value: "MAD 0" },
                  { label: "Commission", value: "Per rental only" },
                  { label: "Support", value: "Dedicated admin" },
                ].map(({ label, value }, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-gray-200 dark:border-white/8 pb-3 last:border-0">
                    <span className="text-gray-500 dark:text-slate-400 text-sm">{label}</span>
                    <span className="text-gray-900 dark:text-white font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="block w-full text-center bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
              >
                Become a Partner
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-12 text-center shadow-2xl shadow-indigo-500/30"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-[60px]" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-violet-400/20 rounded-full blur-[60px]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-6">
                <Star className="w-4 h-4" /> Join the platform
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Ready to modernize<br />your rental business?
              </h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
                Whether you're an agency or a client, AutoService makes car rental in Morocco smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 dark:border-white/8 py-10 px-4 text-center text-gray-400 dark:text-slate-500 text-sm transition-colors duration-300">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-900 dark:text-white font-bold">AutoService</span>
        </div>
        <p>© {new Date().getFullYear()} AutoService · آسفي و مراكش، المغرب</p>
      </footer>
    </div>
  );
}

