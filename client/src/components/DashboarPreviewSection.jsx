import { useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";

export default function DashboardPreviewSection() {
  const { ref, visible } = useReveal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();

    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <section
      ref={ref}
      className={`relative py-24 px-4 overflow-hidden transition-all duration-700 ease-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* background glow (reduced intensity) */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-transparent to-transparent dark:from-emerald-900/10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          See MoNNi in Action
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          A clean, distraction-free dashboard that gives you complete visibility
          over your financial habits.
        </p>

        {/* Mockup */}
        <div className="mt-14 flex justify-center">
          <div className="relative group w-full max-w-3xl">

            {/* subtle glow */}
            <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl opacity-40 group-hover:opacity-60 transition duration-500"></div>

            {/* container */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-white/5 backdrop-blur-sm transition duration-500 group-hover:-translate-y-1">

              {visible && !isMobile ? (
                <>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster="https://res.cloudinary.com/dzpg5ntrs/image/upload/v1774370722/enhanced_image_qbq8ih.png"
                    className="w-full h-full object-cover object-top"
                  >
                    <source
                      src="https://res.cloudinary.com/dzpg5ntrs/video/upload/f_auto,q_auto/v1774371286/monniDemoVideo_soooiq.webm"
                      type="video/webm"
                    />
                    <source
                      src="https://res.cloudinary.com/dzpg5ntrs/video/upload/f_auto,q_auto/v1774371289/monniDemoVideo_fallback_aai2ls.mp4"
                      type="video/mp4"
                    />
                  </video>

                  {/* soft overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                </>
              ) : (
                <img
                  src="https://res.cloudinary.com/dzpg5ntrs/image/upload/f_auto,q_auto/v1774370722/enhanced_image_qbq8ih.png"
                  alt="MoNNi Dashboard Preview"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}