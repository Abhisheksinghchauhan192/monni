import useReveal from "../hooks/useReveal";
export default function DashboardPreviewSection() {
  const{ref,visible} = useReveal();
  return (
    <section
    ref={ref}
    className={`relative py-28 px-4 overflow-hidden transition-all duration-700 ease-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* background glow */}
      <div
        className="absolute inset-0 bg-gradient-to-b 
                  from-emerald-50 via-transparent to-transparent 
                  dark:from-emerald-900/20 
                  pointer-events-none"
      ></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          See MoNNi in Action
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A clean, distraction-free dashboard that gives you complete visibility
          over your financial habits.
        </p>

        {/* Animated Mockup */}
        <div className="mt-16 flex justify-center">
          <div className="relative group">
            {/* glow */}
            <div
              className="absolute -inset-6 bg-emerald-500/10 blur-3xl 
                        opacity-60 group-hover:opacity-80 
                        transition duration-500"
            ></div>

            <img
              src="/DashBoardPreviewDemo.webp"
              alt="MoNNi Dashboard Preview"
              className="relative rounded-2xl shadow-2xl 
                     border border-gray-200 dark:border-gray-800 
                     transition duration-500 
                     group-hover:scale-[1.02] 
                     animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
