import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Car, Users, Zap, Shield, MapPin, CheckCircle, ArrowRight,
  Star, Building2, Clock, MessageCircle, TrendingUp, PhoneCall,
  BadgeCheck, Banknote, Gauge,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const WA_LINK =
  "https://wa.me/212644313921?text=السلام عليكم، بغيت نطلب سيارة عبر AutoService";

/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden"
      animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Dark gradient background – always dark for hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#09091c] via-[#080d1a] to-[#0e0815]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:"",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Blobs */}
      <div className="absolute top-16 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[130px]" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[110px]" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Text ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 rounded-full px-4 py-1.5 text-indigo-300 text-sm font-medium mb-7"
            >
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>المغرب · آسفي و مراكش — منصة كراء السيارات</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              لقينا ليك{" "}
              <span className="bg-gradient-to-l from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                الطوموبيل
              </span>
              <br />
              لي كتبغيها فمدينتك
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-300 text-lg leading-relaxed mb-9 max-w-xl"
            >
              AutoService كيربط بين الزبناء ووكالات الكراء لي عندها سيارات خالية دابا
              — بسرعة، بثقة، وبلا تعقيد. ما خصكش تتصل فعشر وكالات.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50"
              >
                طلب سيارتك دابا
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-indigo-400/60 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                <Building2 className="w-5 h-5" />
                انضم كوكالة
              </Link>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4"
            >
              {[
                { n: "+50", l: "وكالة شريكة" },
                { n: "+500", l: "طلب مكتمل" },
                { n: "−30د", l: "وقت الرد" },
              ].map(({ n, l }, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{n}</div>
                  <div className="text-slate-400 text-xs mt-1">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Hero Visual ── */}
          <div className="hidden lg:flex justify-center items-center">
            <HeroCards />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-slate-500 text-xs">اسكرول لتعرف أكثر</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center">
          <div className="w-1 h-1.5 rounded-full bg-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroCards() {
  const notifications = [
    { icon: Car, color: "from-blue-500 to-cyan-500", msg: "Dacia Sandero — خالية", sub: "مراكش · 250 د.م/يوم" },
    { icon: Car, color: "from-violet-500 to-indigo-500", msg: "Renault Clio — خالية", sub: "آسفي · 220 د.م/يوم" },
    { icon: Car, color: "from-emerald-500 to-teal-500", msg: "Hyundai i10 — خالية", sub: "مراكش · 180 د.م/يوم" },
  ];

  return (
    <div className="relative w-[360px] h-[480px]">
      {/* Main availability card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute inset-x-0 top-0 bg-white/8 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-2xl"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white font-semibold text-sm">سيارات متاحة دابا</span>
          </div>
          <span className="text-slate-400 text-xs mr-auto">مراكش</span>
        </div>

        {notifications.map(({ icon: Icon, color, msg, sub }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.15 }}
            className="flex items-center gap-3 py-3 border-b border-white/8 last:border-0"
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-4.5 h-4.5 text-white w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{msg}</p>
              <p className="text-slate-400 text-xs">{sub}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-green-400 text-xs">خالية</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* New request badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="absolute -bottom-2 right-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-3 shadow-xl shadow-indigo-500/30"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white text-xs font-bold">طلب جديد — آسفي</p>
            <p className="text-indigo-200 text-xs">كيتعالج دابا...</p>
          </div>
        </div>
      </motion.div>

      {/* Response time */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="absolute -bottom-2 left-2 bg-white/10 backdrop-blur border border-white/15 rounded-xl px-3 py-2"
      >
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-white text-xs font-medium">رد فأقل من 30 دقيقة</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   2. HOW IT WORKS
══════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    {
      icon: MessageCircle,
      num: "01",
      title: "أرسل طلبك",
      desc: "عمر الطلب بالمدينة ديالك، التواريخ، ونوع السيارة لي كتبغي — فأقل من دقيقتين.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      num: "02",
      title: "كنلقاو ليك",
      desc: "المشرف ديالنا كيشوف الوكالات المتاحة فمدينتك ويتواصل معاك فأقل من نص ساعة.",
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: Car,
      num: "03",
      title: "خود التوموبيل",
      desc: "تتواصل مباشرة مع الوكالة وتاخود سيارتك — بلا تعقيد وبلا ضياع وقت.",
      color: "from-violet-500 to-pink-500",
    },
  ];

  return (
    <section className="py-24 px-4 bg-white dark:bg-[#08090f] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeUp}
            className="inline-block text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
            كيفاش خدام
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            3 خطوات بسيطة —{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              وتكون فطريق
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            className="text-gray-500 dark:text-slate-400 max-w-lg mx-auto text-lg">
            ما خصكش تكون خبير. غير عبي الطلب وحنا نديرو الباقي.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative group bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-7 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              {/* Connector */}
              {i < 2 && (
                <div className="hidden md:block absolute top-14 -left-5 w-10 h-0.5 bg-gradient-to-l from-indigo-400/60 to-transparent z-20" />
              )}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-6xl font-black text-gray-100 dark:text-white/5 absolute top-4 left-5 leading-none select-none">
                {step.num}
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   3. BENEFITS — FOR CUSTOMERS + FOR AGENCIES
══════════════════════════════════════════════════════ */
function BenefitsSection() {
  const customerBenefits = [
    { icon: Clock, title: "بلا ضياع الوقت", desc: "ما خصكك تتصل فعشر وكالات. غير طلب واحد وحنا نلقاو ليك." },
    { icon: BadgeCheck, title: "وكالات موثوقة", desc: "كل الوكالات المتعاونة معانا مراقبة ومعتمدة." },
    { icon: MessageCircle, title: "مشرف بشري", desc: "مو روبو ولا أوتوماتيك — كاين واحد حقيقي كيهتم بطلبك." },
    { icon: Gauge, title: "سرعة في الرد", desc: "فأقل من 30 دقيقة كتعرف عندنا واش كاينة سيارة ليك." },
  ];

  const agencyBenefits = [
    { icon: Users, title: "زبناء جدد باستمرار", desc: "ما خصكش تعلن ولا تسوق. حنا كنجيبو ليك الزبناء." },
    { icon: Banknote, title: "بلا رسوم مسبقة", desc: "ما كاين ما تدفعو حتى يكمل الكراء — عمولة فقط عند الإنجاز." },
    { icon: TrendingUp, title: "توسع رقمي", desc: "خود حضور رقمي بدون ما تبني موقع أو تدير حملات." },
    { icon: Shield, title: "أمان وتنظيم", desc: "كل الطلبات مسجلة ومتابعة — ما فيهاش تعقيد." },
  ];

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-white/2 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeUp}
            className="inline-block text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
            لماذا AutoService
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            منصة مصممة{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              للمغاربة
            </span>
          </motion.h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For Customers */}
          <AnimatedSection>
            <motion.div variants={fadeUp}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-7 h-full shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-xl">للزبناء</h3>
              </div>
              <div className="space-y-5">
                {customerBenefits.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400 w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold text-sm mb-0.5">{title}</p>
                      <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* For Agencies */}
          <AnimatedSection>
            <motion.div variants={fadeUp}
              className="bg-gradient-to-br from-indigo-50 dark:from-indigo-600/10 to-violet-50 dark:to-violet-600/5 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl p-7 h-full shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-xl">للوكالات</h3>
              </div>
              <div className="space-y-5">
                {agencyBenefits.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold text-sm mb-0.5">{title}</p>
                      <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-indigo-200 dark:border-indigo-500/20">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-3 transition-all duration-200">
                  انضم كوكالة شريكة <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   4. STATS
══════════════════════════════════════════════════════ */
function StatsSection() {
  const stats = [
    { num: "+50", label: "وكالة شريكة", icon: Building2 },
    { num: "+500", label: "طلب كراء مكتمل", icon: Car },
    { num: "2", label: "مدينة مخدومة", icon: MapPin },
    { num: "0 د.م", label: "رسوم اشتراك شهرية", icon: Banknote },
  ];

  return (
   "hello"
  );
}

/* ══════════════════════════════════════════════════════
   5. CITIES COVERAGE
══════════════════════════════════════════════════════ */
function CitiesSection() {
  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-white/2 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <motion.span variants={fadeUp}
            className="inline-block text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
            التغطية الحالية
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            خدامين دابا{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              فمدينتين
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-gray-500 dark:text-slate-400 max-w-md mx-auto">
            وقريبا في باقي المدن المغربية
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {[
            { city: "مراكش", count: "+30 وكالة", desc: "مدينة السياحة — أكبر طلب على الكراء فالمغرب", active: true },
            { city: "آسفي", count: "+20 وكالة", desc: "مدينة الصناعة والسواحل — سوق محلي نشيط", active: true },
          ].map(({ city, count, desc, active }, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-gray-900 dark:text-white font-bold text-xl">{city}</h3>
                </div>
                <span className="text-xs font-semibold bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-500/20">
                  نشيطة
                </span>
              </div>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-2">{count}</p>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={fadeUp}
            className="text-center bg-white dark:bg-white/3 border border-dashed border-gray-300 dark:border-white/10 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-slate-500 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold text-sm">مدن أخرى</span>
            </div>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              كازابلانكا · الرباط · أكادير · فاس · و أكثر — قريبا
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   6. AGENCY CTA
══════════════════════════════════════════════════════ */
function AgencyCTASection() {
  const perks = [
    "الانضمام مجاني بلا رسوم شهرية",
    "عمولة بسيطة فقط عند إتمام الكراء",
    "مشرف يتكلف بالتواصل مع الزبناء",
    "لوحة تحكم لتحديث سياراتك المتاحة",
    "توسيع نطاق عملك رقميًا بلا تكلفة",
    "زبناء جدد كل يوم بلا جهد تسويقي",
  ];

  return (
    <section className="py-24 px-4 bg-white dark:bg-[#08090f] transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <AnimatedSection>
          <motion.span variants={fadeUp}
            className="inline-block text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-4">
            للوكالات
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
            عندك وكالة كراء سيارات؟{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              انضم معانا
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            className="text-gray-600 dark:text-slate-400 leading-relaxed mb-8 text-lg">
            ما خصكش تدير موقع، ولا تسوق، ولا تتصل نتا. غير حدث سياراتك المتاحة وحنا نجيبو ليك الزبناء مباشرة.
          </motion.p>
          <AnimatedSection className="space-y-3.5">
            {perks.map((p, i) => (
              <motion.div key={i} variants={fadeUp} custom={i * 0.5} className="flex items-center gap-3 text-gray-700 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                <span className="text-sm">{p}</span>
              </motion.div>
            ))}
          </AnimatedSection>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={fadeUp}
            className="bg-gradient-to-br from-indigo-50 dark:from-indigo-600/15 to-violet-50 dark:to-violet-600/10 border border-indigo-200 dark:border-indigo-500/25 rounded-3xl p-8 shadow-xl dark:shadow-indigo-500/5"
          >
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/40 mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-white text-xl font-bold">ابدا كوكالة شريكة</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">كلشي سهل وسريع</p>
            </div>

            <div className="space-y-4 mb-7">
              {[
                { l: "وقت التسجيل", v: "أقل من 24 ساعة" },
                { l: "الرسوم الشهرية", v: "0 درهم" },
                { l: "العمولة", v: "عند إتمام الكراء فقط" },
                { l: "الدعم", v: "مشرف مخصص ليك" },
              ].map(({ l, v }, i) => (
                <div key={i} className="flex justify-between items-center border-b border-indigo-100 dark:border-white/8 pb-3.5 last:border-0">
                  <span className="text-gray-500 dark:text-slate-400 text-sm">{l}</span>
                  <span className="text-gray-900 dark:text-white font-semibold text-sm">{v}</span>
                </div>
              ))}
            </div>

            <Link to="/contact"
              className="block w-full text-center bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/50"
            >
              انضم كوكالة دابا — مجانًا
            </Link>

            <p className="text-center text-gray-400 dark:text-slate-500 text-xs mt-3">
              ما فيهاش التزام ولا رسوم مسبقة
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   7. TRUST / TESTIMONIALS STRIP
══════════════════════════════════════════════════════ */
function TrustSection() {
  const points = [
    { icon: Shield, text: "وكالات معتمدة ومراقبة" },
    { icon: Star, text: "تقييمات حقيقية من زبناء حقيقيين" },
    { icon: PhoneCall, text: "مشرف بشري مو روبو" },
    { icon: Clock, text: "رد فأقل من 30 دقيقة" },
    { icon: Banknote, text: "بلا رسوم خفية" },
    { icon: MapPin, text: "خدمة محلية تعرف المغرب" },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-white/2 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <motion.p variants={fadeUp}
            className="text-center text-gray-500 dark:text-slate-500 text-sm font-medium mb-8 uppercase tracking-widest">
            علاش الناس كتوثق فينا
          </motion.p>
          <motion.div variants={fadeUp} custom={1}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {points.map(({ icon: Icon, text }, i) => (
              <div key={i}
                className="flex flex-col items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl p-4 text-center hover:border-indigo-400/40 transition-colors duration-300">
                <Icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                <span className="text-gray-700 dark:text-slate-300 text-xs font-medium leading-tight">{text}</span>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   8. FINAL CTA
══════════════════════════════════════════════════════ */
function FinalCTASection() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-[#08090f] transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-10 md:p-16 text-center shadow-2xl shadow-indigo-600/30"
        >
          {/* Decorative */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-400/20 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              جرب AutoService اليوم — مجانًا
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              واش كتبغي تكري سيارة؟
              <br />
              <span className="text-indigo-200">حنا هنا باش نعاونوك</span>
            </h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              طلب سيارتك فأقل من دقيقتين، وحنا نلقاو ليك الوكالة لي عندها الطوموبيل خالية دابا فمدينتك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-10 py-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-105 shadow-lg text-lg">
                طلب سيارتك دابا
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-lg">
                <MessageCircle className="w-5 h-5" />
                راسلنا على واتساب
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FOOTER STRIP
══════════════════════════════════════════════════════ */
function FooterStrip() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/8 py-10 px-4 bg-white dark:bg-[#08090f] transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-900 dark:text-white font-bold text-lg">AutoService</span>
        </div>
        <p className="text-gray-400 dark:text-slate-500 text-sm text-center">
          © {new Date().getFullYear()} AutoService · آسفي و مراكش، المغرب — منصة ذكية لكراء السيارات
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/about" className="text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">من نحن</Link>
          <Link to="/contact" className="text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">تواصل معنا</Link>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE ASSEMBLY
══════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div dir="rtl" lang="ar-MA" className="font-cairo min-h-screen overflow-x-hidden bg-white dark:bg-[#08090f] transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <StatsSection />
      <CitiesSection />
      <AgencyCTASection />
      <TrustSection />
      <FinalCTASection />
      <FooterStrip />
    </div>
  );
}

