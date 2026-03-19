import { useState, useMemo } from "react";
import { EMOJI_CATEGORIES } from "../../../../utils/emojiList";
import EmojiButton from "./EmojiButton";

export default function EmojiPicker({ value, onSelect }) {
  const [search, setSearch] = useState("");
  const [recent, setRecent] = useState([]);

  // 🔥 Flatten all emojis
  const allEmojis = useMemo(() => {
    return Object.values(EMOJI_CATEGORIES).flat();
  }, []);

  // 🔥 Search logic
  const filtered = useMemo(() => {
    if (!search) return null;

    return allEmojis.filter((item) =>
      item.keywords.some((k) =>
        k.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allEmojis]);

  // 🔥 Select handler with recent tracking
  const handleSelect = (emoji) => {
    setRecent((prev) => {
      const updated = [emoji, ...prev.filter((e) => e !== emoji)];
      return updated.slice(0, 8);
    });

    onSelect(emoji);
  };

  return (
    <div className="space-y-3">

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search emoji..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-sm"
      />

      <div className="max-h-60 overflow-y-auto pr-1 space-y-3">

        {/* ⭐ RECENT */}
        {!search && recent.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-1">Recent</p>
            <div className="flex flex-wrap gap-2">
              {recent.map((emoji) => {
                const item = allEmojis.find((e) => e.emoji === emoji);
                return (
                  <EmojiButton
                    key={emoji}
                    item={item}
                    value={value}
                    onSelect={handleSelect}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* 🔍 SEARCH RESULT */}
        {search ? (
          <div className="flex flex-wrap gap-2">
            {filtered.map((item) => (
              <EmojiButton
                key={item.emoji}
                item={item}
                value={value}
                onSelect={handleSelect}
              />
            ))}
          </div>
        ) : (
          Object.entries(EMOJI_CATEGORIES).map(([group, emojis]) => (
            <div key={group}>
              <p className="text-xs text-gray-400 mb-1 capitalize">
                {group}
              </p>

              <div className="flex flex-wrap gap-2">
                {emojis.map((item) => (
                  <EmojiButton
                    key={item.emoji}
                    item={item}
                    value={value}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}