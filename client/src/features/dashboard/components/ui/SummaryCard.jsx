  import {motion} from "framer-motion";
  import CountUp from "react-countup";

  export  const Card = ({ title, value, subtitle, extra }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-900 
                 border border-gray-200 dark:border-gray-800 
                 rounded-2xl p-6 shadow-sm
                 hover:shadow-md transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {title}
        </p>
        {extra}
      </div>

      <h3 className="text-2xl font-bold mt-3 text-gray-900 dark:text-gray-100">
        <CountUp
          end={value}
          duration={1}
          separator=","
          decimals={title.includes("Avg") ? 2 : 0}
          prefix={title.includes("₹") || title.includes("Spend") ? "₹ " : ""}
        />
      </h3>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );