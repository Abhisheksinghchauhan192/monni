export default function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-400">{label}</p>

      <input
        {...props }
        className="
        w-full px-4 py-2 rounded-xl
        border border-gray-300 dark:border-zinc-700
        bg-white dark:bg-zinc-800
        text-sm
        focus:outline-none focus:ring-2 focus:ring-emerald-500
        "
      />
    </div>
  );
}