export default function SuggestedPrompts({
  suggestions,
  onSelect,
  disabled,
}) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {suggestions.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onSelect(prompt)}
          disabled={disabled}
          className="
            px-3 py-1.5
            text-xs
            rounded-full
            border
            border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-700 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-700
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}