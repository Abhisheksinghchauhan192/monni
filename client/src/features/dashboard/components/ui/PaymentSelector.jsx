import { useCallback } from "react";

export default function PaymentSelector({
  methods,
  selected,
  onSelect,
}) {
  const triggerHaptic = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }, []);

  return (
    <div className="flex gap-3 overflow-x-auto py-2 px-1 no-scrollbar scroll-smooth">
      {methods.map((m) => {
        const active = selected === m;

        return (
          <button
            key={m}
            type="button"
            onClick={() => {
              triggerHaptic();
              onSelect(m);
            }}
            className={`
              px-4 py-2
              rounded-full
              text-sm font-medium
              whitespace-nowrap
              transition-all duration-150

              ${
                active
                  ? `
                    bg-emerald-500 text-white
                    shadow-md scale-[0.97]
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
            {m}
          </button>
        );
      })}
    </div>
  );
}