import { motion } from "framer-motion";

export default function SettingCard({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-5 rounded-2xl 
        bg-white/70 dark:bg-zinc-900/60 
        backdrop-blur-md 
        border border-gray-200 dark:border-zinc-800 
        shadow-sm"
    >
      <p className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
        {title}
      </p>

      {children}
    </motion.div>
  );
}