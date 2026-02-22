import { useEffect, useState } from "react";
import useReveal from "../../hooks/useReveal";

export default function Counter({ end, label }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal();

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [visible, end]);

  return (
    <div ref={ref} className="relative rounded-2xl p-[2px] shine-border">
      <div
        className="rounded-2xl p-8 
                   bg-gray-50 dark:bg-gray-950 
                   border border-gray-200 dark:border-gray-800
                   shadow-sm hover:shadow-xl 
                   transition-all duration-300"
      >
        <div className="text-4xl font-bold text-emerald-500">
          {count.toLocaleString()}+
        </div>

        <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
          {label}
        </p>
      </div>
    </div>
  );
}
