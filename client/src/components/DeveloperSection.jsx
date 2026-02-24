import useReveal from "../hooks/useReveal";

export default function DeveloperSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className={`pb-16 px-4 bg-gray-50 dark:bg-gray-900  flex items-center justify-center transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="relative mt-14 rounded-2xl p-0.5 max-w-4xl shine-border">
        <div
          className="bg-white dark:bg-gray-950
               rounded-2xl p-10 
               shadow-xl hover:shadow-2xl 
               transition duration-300"
        >
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold mb-4">Developer Overview</p>
            <div
              className="w-28 h-28 rounded-full overflow-hidden
                      border-2 border-emerald-400
                      shadow-md"
            >
              <img
                src="/DeveloperProfilePicture.jpeg"
                alt="Developer Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-6 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Abhishek Singh Chauhan
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Backend & Full-Stack Developer
            </p>

            <p className="mt-6 max-w-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Passionate about building secure, scalable web applications.
              Focused on clean architecture, modular design, and modern frontend
              experiences. Currently exploring advanced backend systems and
              production-ready SaaS patterns.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/Abhisheksinghchauhan192"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                     hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/abhisheksinghchauhan786"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-emerald-500 text-white 
                     hover:bg-emerald-600 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
