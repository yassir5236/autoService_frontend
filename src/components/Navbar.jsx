import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // transparent only on home before scroll
  const transparent = false;

  const navLinks = [
    { label: "Home", to: "/" },
    // { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav
      dir="ltr"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-gradient-to-br from-[#09091c] via-[#080d1a] to-[#0e0815] border-transparent shadow-none"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/60 dark:border-white/10 shadow-sm dark:shadow-none"
      }`}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 md:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="bg-gray-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
            BOX
          </div>
          <span className={`font-bold text-base tracking-widest uppercase ${transparent ? "text-white" : "text-gray-900 dark:text-white"}`}>
            CARS
          </span>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`flex items-center gap-0.5 transition-colors ${
                  transparent
                    ? "text-white/90 hover:text-white"
                    : "text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"
                }`}
              >
                {label}
                {["Home", "Listings", "Blog", "Pages"].includes(label) && (
                  <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 ${
              transparent
                ? "border-white/30 bg-white/15 hover:bg-white/25 text-white"
                : "border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white"
            }`}
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className={`text-sm font-medium transition-colors ${transparent ? "text-white/90 hover:text-white" : "text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"}`}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className={`text-sm font-semibold px-4 py-2 rounded-md transition-colors ${transparent ? "bg-white/20 hover:bg-white/30 text-white border border-white/30" : "bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white"}`}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {role === "ADMIN" ? (
                <>
                  <Link to="/dashboard" className={`text-sm font-medium transition-colors ${transparent ? "text-white/90 hover:text-white" : "text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"}`}>Dashboard</Link>
                  <Link to="/my-space" className={`text-sm font-medium transition-colors ${transparent ? "text-white/90 hover:text-white" : "text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"}`}>Car Owners</Link>
                </>
              ) : (
                <Link to="/my-space" className={`text-sm font-medium transition-colors ${transparent ? "text-white/90 hover:text-white" : "text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"}`}>My Space</Link>
              )}
              <button onClick={handleLogout} className={`transition-colors ${transparent ? "text-white/90 hover:text-red-300" : "text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-400"}`} title="Logout">
                <svg width="22" height="22" viewBox="0 -0.5 25 25" fill="none">
                  <path d="M11.75 9.874V4H13.25V9.874H11.75ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z" fill="currentColor"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Burger button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${transparent ? "border-white/30 bg-white/15 text-white" : "border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white"}`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            className={`p-1 rounded-md focus:outline-none ${transparent ? "text-white" : "text-gray-700 dark:text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.div animate={mobileOpen ? "open" : "closed"} className="flex flex-col gap-1.5 w-6">
              <motion.span variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } }} transition={{ duration: 0.25 }} className="block h-0.5 w-6 bg-current rounded origin-center" />
              <motion.span variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.2 }} className="block h-0.5 w-6 bg-current rounded" />
              <motion.span variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } }} transition={{ duration: 0.25 }} className="block h-0.5 w-6 bg-current rounded origin-center" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden"
          >
            <div className="mx-4 mb-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/20 shadow-xl">
              <ul className="flex flex-col py-3">
                {navLinks.map(({ label, to }, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-5 py-3 text-gray-800 dark:text-white text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition-colors rounded-xl mx-1"
                    >
                      {label}
                      {["Home", "Listings", "Blog", "Pages"].includes(label) && (
                        <svg
                          className="w-3.5 h-3.5 text-gray-400 dark:text-white/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="h-px bg-gray-200 dark:bg-white/20 mx-4" />
              <div className="flex flex-col gap-2 p-4">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center py-2.5 rounded-xl text-gray-800 dark:text-white text-sm font-semibold border border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold transition-colors"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    {role === "ADMIN" ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setMobileOpen(false)}
                          className="w-full text-center py-2.5 rounded-xl text-gray-800 dark:text-white text-sm font-semibold border border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/my-space"
                          onClick={() => setMobileOpen(false)}
                          className="w-full text-center py-2.5 rounded-xl text-gray-800 dark:text-white text-sm font-semibold border border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                          Car Owners
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/my-space"
                        onClick={() => setMobileOpen(false)}
                        className="w-full text-center py-2.5 rounded-xl text-gray-800 dark:text-white text-sm font-semibold border border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                      >
                        My Space
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}