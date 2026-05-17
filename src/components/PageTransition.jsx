import { motion } from "framer-motion";

/**
 * Industry-standard page transition:
 * Pure crossfade + 6px upward drift.
 * No scale, no bounce — invisible enough to feel native,
 * present enough to feel premium.
 * Used by Vercel, Linear, Stripe dashboards.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{
        duration: 0.22,
        ease: "easeOut",
      }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
