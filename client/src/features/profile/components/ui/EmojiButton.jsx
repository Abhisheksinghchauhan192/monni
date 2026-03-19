export default function EmojiButton({ item, value, onSelect }) {
  const active = value === item.emoji;

  return (
    <button
      type="button"
      title={item.label}
      onClick={() => {
        if (navigator.vibrate) navigator.vibrate(10);
        onSelect(item.emoji);
      }}
      className={`
        text-lg p-2 rounded-lg transition
        ${active
          ? "bg-emerald-500/20 ring-1 ring-emerald-400"
          : "hover:bg-gray-200 dark:hover:bg-zinc-700"}
      `}
    >
      {item.emoji}
    </button>
  );
}