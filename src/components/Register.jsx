import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import carImage from "../assets/pexels-s-square-2158126345-36655832.jpg";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleRegister = async (e) => {
  e.preventDefault();

  const userData = {
    username: fullName,
    email,
    password,
  };

  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const message = await response.text();

    if (response.ok) {
      navigate("/login");
      console.log(message);

      setFullName("");
      setEmail("");
      setPassword("");
    } else {
      alert(message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to connect to backend");
  }
};
  return (
    <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[860px] bg-white rounded-[18px] flex overflow-hidden"
        style={{
          boxShadow: "0 4px 40px rgba(0,0,0,0.10)",
          minHeight: 540,
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div className="flex flex-col justify-between w-full sm:w-[44%] px-8 sm:px-10 py-8 relative">
          {/* macOS dots */}
          <div className="flex gap-1.5 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Logo */}
            <div className="relative w-11 h-11 mb-5">
              <div
                className="absolute w-7 h-7 rounded-full top-0 left-0"
                style={{ background: "#C4B5F4", opacity: 0.9 }}
              />
              <div
                className="absolute w-7 h-7 rounded-full bottom-0 right-0"
                style={{ background: "#F9A8D4", opacity: 0.8 }}
              />
            </div>

            <h1
              className="text-[17px] text-black dark:text-white font-semibold mb-1.5 text-center"
              style={{
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "-0.3px",
              }}
            >
              Create your account
            </h1>

            <p
              className="text-[13px] text-neutral-400 mb-7 text-center"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Join thousands of drivers and premium car enthusiasts.
            </p>

            {/* Fields */}
            <form className="w-full" onSubmit={handleRegister}>
              {/* Full Name */}
              <label
                className="block text-[13px] text-neutral-700 mb-1.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Full Name
              </label>

              <motion.input
                whileFocus={{
                  borderColor: "#0A0A0A",
                  boxShadow: "0 0 0 3px rgba(0,0,0,0.05)",
                }}
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-[13px] px-3.5 py-2.5 rounded-[8px] border border-neutral-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none text-black dark:text-white placeholder-neutral-300 dark:placeholder-gray-500 mb-3.5 transition-all duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />

              {/* Email */}
              <label
                className="block text-[13px] text-neutral-700 dark:text-gray-300 mb-1.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Email
              </label>

              <motion.input
                whileFocus={{
                  borderColor: "#0A0A0A",
                  boxShadow: "0 0 0 3px rgba(0,0,0,0.05)",
                }}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-[13px] px-3.5 py-2.5 rounded-[8px] border border-neutral-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none text-black dark:text-white placeholder-neutral-300 dark:placeholder-gray-500 mb-3.5 transition-all duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />

              {/* Password */}
              <label
                className="block text-[13px] text-neutral-700 dark:text-gray-300 mb-1.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Password
              </label>

              <motion.input
                whileFocus={{
                  borderColor: "#0A0A0A",
                  boxShadow: "0 0 0 3px rgba(0,0,0,0.05)",
                }}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-[13px] px-3.5 py-2.5 rounded-[8px] border border-neutral-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none text-black dark:text-white mb-5 transition-all duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />

              {/* Register Button */}
              <motion.button type="submit"
                whileHover={{
                  backgroundColor: "#1a1a1a",
                  scale: 1.01,
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#0A0A0A] text-white text-[14px] font-medium rounded-[8px] transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Create Account
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <p
            className="text-center text-[12px] text-neutral-400 mt-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:opacity-70 transition-opacity"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="hidden sm:block flex-1 relative overflow-hidden rounded-r-[18px]">
          {/* Floating Back Button */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 -left-[18px] z-20 w-9 h-9 bg-white rounded-full flex items-center justify-center border border-neutral-200 cursor-pointer"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }}
          >
            <FiArrowLeft size={14} className="text-neutral-500" />
          </motion.div>

          {/* Image */}
          <img
            src={carImage}
            alt="Luxury car"
            className="w-full h-full object-cover"
            style={{ filter: "" }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
            }}
          />

          {/* Quote */}
          <div className="absolute bottom-4 left-4 right-16 z-10">
            <p
              className="text-white text-[12.5px] leading-[1.6] mb-2.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Joining this platform completely changed the way I buy and sell
              luxury cars online.
            </p>

            <p
              className="text-white text-[12px] font-semibold mb-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Ethan Walker
            </p>

            <p
              className="text-[11px]"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Car Collector | Monaco
            </p>
          </div>

          {/* Arrows */}
          <div className="absolute bottom-4 right-3 z-10 flex flex-col gap-1.5">
            {[FiArrowRight, FiArrowLeft].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.28)",
                }}
                whileTap={{ scale: 0.93 }}
                className="w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.16)",
                  borderColor: "rgba(255,255,255,0.28)",
                }}
              >
                <Icon size={13} color="#fff" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}