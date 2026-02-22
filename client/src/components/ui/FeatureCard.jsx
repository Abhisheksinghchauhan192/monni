export default  function FeatureCard({ title, description }) {
  return (
    <div className="group relative p-6 rounded-2xl bg-white dark:bg-gray-900 
                    border border-gray-200 dark:border-gray-800 
                    shadow-sm hover:shadow-2xl 
                    transition-all duration-300 
                    hover:-translate-y-1 ">

      {/* subtle gradient glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                      transition duration-300 bg-gradient-to-br 
                      from-emerald-500/10 via-transparent to-transparent 
                      pointer-events-none"></div>

      <h3 className="relative text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>

      <p className="relative mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}