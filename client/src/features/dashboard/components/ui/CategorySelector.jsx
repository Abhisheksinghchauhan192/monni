import { useCallback } from "react";

export default function CategorySelector({
  categories,
  selected,
  onSelect,
  onAddClick,
}) {
  /* HAPTIC FEEDBACK */
  const triggerHaptic = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }, []);

  return (
    <div className="flex gap-3 overflow-x-auto py-2 px-1 no-scrollbar scroll-smooth">
      {categories.map((c) => {
        const active = selected === c.name;

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              triggerHaptic();
              onSelect(c.name);
            }}
            className={`
              flex items-center gap-2
              px-4 py-2
              rounded-full
              text-sm font-medium
              whitespace-nowrap
              transition-all duration-150

              ${
                active
                  ? `
                    ${c.chip}
                    shadow-md scale-[0.97]
                    ring-1 ring-black/5 dark:ring-white/10
                  `
                  : `
                    bg-white dark:bg-zinc-900
                    border border-gray-200 dark:border-zinc-700
                    text-gray-700 dark:text-gray-300
                    shadow-sm
                    hover:shadow-md
                  `
              }

              active:scale-[0.93]
            `}
          >
            <span className="text-base">{c.emoji}</span>
            {c.label}
          </button>
        );
      })}

      {/* ADD BUTTON */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic();
          onAddClick();
        }}
        className="
          flex items-center justify-center
          px-4 py-2
          rounded-full
          text-sm font-medium
          whitespace-nowrap
          border border-dashed
          border-gray-300 dark:border-zinc-600
          text-gray-500 dark:text-gray-400
          bg-gray-50 dark:bg-zinc-800
          shadow-sm
          hover:shadow-md
          transition-all
          active:scale-[0.93]
        "
      >
        ➕ Add
      </button>
    </div>
  );
}