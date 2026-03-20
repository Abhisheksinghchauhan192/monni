  import CountUp from "react-countup";

  export function Card({ title, value, subtitle, extra }) {

  return (
    <div
      className="
      relative overflow-hidden
      bg-gradient-to-b
      from-white via-white to-gray-50
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
      border border-gray-200 dark:border-zinc-800
      rounded-2xl p-6
      shadow-sm
      flex flex-col gap-2
    "
    >
      {/* subtle highlight */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 to-transparent dark:from-white/[0.03]" />

      {/* Header */}
      <div className="flex items-center justify-between relative">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {title}
        </p>

        {extra}
      </div>

      {/* Value */}
      <div className="relative">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {value}
        </h3>
      </div>

      {/* Subtitle */}
      <p className="text-xs text-gray-500 relative">
        {subtitle}
      </p>
    </div>
  );
}