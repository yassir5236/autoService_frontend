import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WA_LINK =
  "https://wa.me/212644313921?text=السلام عليكم، بغيت نطلب سيارة عبر AutoService";

export default function WAFloatingButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg border border-gray-200 dark:border-white/10 whitespace-nowrap"
            dir="rtl"
          >
            راسلنا على واتساب 💬
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20c05c] rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 transition-colors duration-200"
        title="راسلنا على واتساب"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="w-7 h-7 text-white relative z-10" fill="white" />
      </motion.a>
    </div>
  );
}

