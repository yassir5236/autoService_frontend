import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Car, Mail, Phone, MessageCircle, MapPin, Clock,
  Send, ChevronDown, ArrowRight, CheckCircle, Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const WA_LINK = "https://wa.me/212644313921?text=السلام عليكم، بغيت نتواصل معكم حول خدمة BoxCars لكراء السيارات";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Contact Card ─── */
function ContactCard({ icon: Icon, label, value, sub, href, color, delay = 0 }) {
  return (
    <motion.a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
      variants={fadeUp} custom={delay} whileHover={{ y: -5, scale: 1.02 }}
      className="group flex flex-col gap-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-indigo-400/40 rounded-2xl p-6 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/8 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-gray-500 dark:text-slate-500 text-xs uppercase tracking-wider font-medium mb-1">{label}</p>
        <p className="text-gray-900 dark:text-white font-semibold text-base">{value}</p>
        {sub && <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">{sub}</p>}
      </div>
      <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-semibold group-hover:gap-2 transition-all duration-300">
        تواصل <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </motion.a>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ q, a, delay = 0 }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} custom={delay}
      className="border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden hover:border-indigo-400/30 transition-colors duration-300"
    >
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-right group"
      >
        <span className="text-gray-900 dark:text-white font-medium text-base group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors duration-200">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-slate-500 flex-shrink-0 mr-4" />
        </motion.div>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }} className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════ */
export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "", type: "client" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const faqs = [
    { q: "كيفاش خدام BoxCars للزبناء؟", a: "كتعبي الطلب اولا كتصل بينا مباشرة بالمدينة ديالك، التواريخ، ونوع السيارة لي كتبغي. الفريق ديالنا كيراجع الطلب ويوصلك بأحسن وكالة متاحة فمدينتك — عادةً فأقل من نص ساعة." },
    { q: "واش الخدمة مدفوعة للزبناء؟", a: "لا، الخدمة مجانية للزبناء. ما كاين ما تدفعو. غير كتدفع ثمن الكراء مباشرة للوكالة." },
    { q: "كيفاش وكالة الكراء تنضم للمنصة؟", a: "تتواصل معانا عبر هاد الصفحة أو واتساب. التسجيل كيأخذ أقل من نص ساعة وما كاين حتى رسوم مسبقة — كنربحو عمولة بسيطة غير عند إتمام الكراء." },
    { q: "فنيان المدن كتخدمو دابا؟", a: "دابا خدامين فآسفي ومراكش. قريبا غادي نوسعو لمدن مغربية أخرى كالدارالبيضاء والرباط وأكادير." },
    { q: "قداش كيخذ الرد على الطلب؟", a: "الفريق ديالنا كيحاول يرد على كل طلب فأقل من 10-5 دقيقة خلال أوقات العمل." },
    { q: "شنو لي كيفرق BoxCars على مواقع الكراء العادية؟", a: ". خدامين كوسيط ذكي — مشرف بشري كيتأكد من التوفر فوقت حقيقي ويوصلك بالوكالة المناسبة. لمسة بشرية بسرعة رقمية." },
  ];

  return (
    <div dir="rtl" className="font-cairo min-h-screen bg-white dark:bg-[#08090f] text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
      <Navbar />

      {/* ── Ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/12 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-violet-400/8 dark:bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-400/6 dark:bg-blue-600/8 rounded-full blur-[120px]" />
      </div>

      {/* ══ HERO ══ */}
      <section className="pt-32 pb-20 px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-full px-4 py-1.5 text-indigo-600 dark:text-indigo-300 text-sm font-semibold mb-6"
        >
          <MessageCircle className="w-4 h-4" /> كنجاوبو فأقل من 5 دقيقة
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-5"
        >
          اجي {" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">نتكلمو</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 dark:text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-medium"
        >
          وكالة أو زبون — حنا هنا باش نعاونوك تبدا بأذكى تجربة كراء سيارات فالمغرب.
        </motion.p>
      </section>

      {/* ══ CONTACT CARDS ══ */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ContactCard icon={MessageCircle} label="واتساب" value="" sub="أسرع طريقة للرد" href={WA_LINK} color="from-green-500 to-emerald-600" delay={0} />
            <ContactCard icon={Phone} label="تليفون" value="" sub="الاثنين-السبت، 8ص-8م" href="tel:+212500000000" color="from-blue-500 to-cyan-600" delay={1} />
            <ContactCard icon={Mail} label="إيميل" value="contact@BoxCars.ma" sub="" href="mailto:contact@BoxCars.ma" color="from-indigo-500 to-violet-600" delay={2} />
            <ContactCard icon={MapPin} label="المواقع" value="آسفي و مراكش" sub="المغرب 🇲🇦" href="#" color="from-orange-500 to-red-500" delay={3} />
          </AnimatedSection>
        </div>
      </section>

      {/* ══ FORM + SIDEBAR ══ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <AnimatedSection>
              <motion.p variants={fadeUp} className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3">بعث رسالة</motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-black mb-8">
                قولنا كيفاش{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">نعاونوك</span>
              </motion.h2>
            </AnimatedSection>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-5 bg-gray-50 dark:bg-white/5 border border-indigo-300 dark:border-indigo-400/30 rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black">الرسالة توصلات!</h3>
                <p className="text-gray-600 dark:text-slate-400 max-w-sm font-medium">شكرا على تواصلك. الفريق ديالنا غادي يرد عليك فأقل من نص ساعة خلال أوقات العمل.</p>
                <button onClick={() => setSubmitted(false)} className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline transition-colors">بعث رسالة أخرى</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Type toggle */}
                <div className="flex gap-3 p-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl w-fit">
                  {[{ val: "client", label: "أنا زبون" }, { val: "agency", label: "أنا وكالة" }].map(({ val, label }) => (
                    <button key={val} type="button" onClick={() => setFormData((p) => ({ ...p, type: val }))}
                      className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${formData.type === val ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30" : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"}`}
                    >{label}</button>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-semibold block mb-2">الاسم الكامل</label>
                    <input name="name" required value={formData.name} onChange={handleChange} placeholder="اسمك هنا"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 outline-none transition-colors text-sm text-right"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-semibold block mb-2">الإيميل</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 outline-none transition-colors text-sm"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-semibold block mb-2">التليفون (واتساب)</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+212 6XX XXX XXX"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 outline-none transition-colors text-sm"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-semibold block mb-2">الموضوع</label>
                    <input name="subject" value={formData.subject} onChange={handleChange} placeholder="علاش كتتواصل معانا؟"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 outline-none transition-colors text-sm text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 dark:text-slate-400 text-sm font-semibold block mb-2">الرسالة</label>
                  <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
                    placeholder={formData.type === "agency" ? "حدثنا على وكالتك، عدد السيارات، والمدن لي كتخدم فيها..." : "وصف احتياجاتك — المدينة، التواريخ، نوع السيارة..."}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 outline-none transition-colors text-sm resize-none text-right"
                  />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] text-base"
                >
                  {loading ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />جاري الإرسال...</>
                  ) : (
                    <><Send className="w-4 h-4" /> إرسال الرسالة</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business hours */}
            <AnimatedSection>
              <motion.div variants={fadeUp} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-base">أوقات العمل</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "الاثنين – الجمعة", hours: "8:00 – 20:00" },
                    { day: "السبت", hours: "9:00 – 18:00" },
                    { day: "الأحد", hours: "مغلق" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-slate-400 font-medium">{day}</span>
                      <span className={`font-bold ${hours === "مغلق" ? "text-red-500 dark:text-red-400" : ""}`}>{hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-white/8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-600 dark:text-green-400 text-xs font-semibold">متوفرين على واتساب دابا</span>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Quick contact */}
            <AnimatedSection>
              <motion.div variants={fadeUp} className="bg-gradient-to-br from-green-50 dark:from-green-900/20 to-emerald-50 dark:to-emerald-900/10 border border-green-200 dark:border-green-500/20 rounded-2xl p-6">
                <h3 className="font-bold text-base mb-2">كتبغي تتكلم فالحين؟</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm mb-5 leading-relaxed font-medium">
                  الفريق ديالنا نشيط على واتساب. للطلبات العاجلة هاد الطريقة هي الأسرع.
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/20 text-sm"
                >
                  <MessageCircle className="w-4 h-4" fill="white" /> فتح واتساب
                </a>
              </motion.div>
            </AnimatedSection>

            {/* Trust badges */}
            <AnimatedSection>
              <motion.div variants={fadeUp} className=" dark:bg-white/3 border border-gray-200 dark:border-white/8 rounded-2xl p-5">
                <p className="text-gray-500 dark:text-slate-500 text-xs uppercase tracking-wider font-bold mb-4">علاش الوكالات كتوثق فينا</p>
                {["بلا رسوم اشتراك شهرية", "عمولة فقط عند إتمام الكراء", "مشرف متخصص لكل وكالة", "لوحة تحكم لتحديث السيارات"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 mb-3 last:mb-0">
                    <CheckCircle className="w-4 h-4 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-slate-300 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-20 px-4  dark:bg-white/2 transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3">أسئلة شائعة</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-black mb-3">
              أسئلة كتسألونا{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">عليها كثيرا</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-600 dark:text-slate-400 font-medium">كلشي لي خصك تعرف على BoxCars.</motion.p>
          </AnimatedSection>

          <AnimatedSection className="space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} {...faq} delay={i * 0.5} />)}
          </AnimatedSection>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-12 text-center shadow-2xl shadow-indigo-500/30"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-10 w-60 h-60 bg-violet-400/20 rounded-full blur-[60px]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-white/90 text-sm font-bold mb-5">
                <Star className="w-4 h-4" /> أذكى منصة كراء فالمغرب
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"> عندك أسئلة؟</h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-md mx-auto font-medium">
                الفريق ديالنا مستعد يجاوب على كلشي. راسلنا على واتساب للرد الفوري.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" fill="white" /> راسلنا على واتساب
                </a>
                <Link to="/about"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300"
                >
                  تعرف علينا
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
          <span className="text-gray-900 dark:text-white font-bold">BoxCars</span>
        </div>
        <p>© {new Date().getFullYear()} BoxCars · آسفي و مراكش، المغرب</p>
      </footer>
    </div>
  );
}

