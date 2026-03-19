import useCategories from "../../../hooks/useCategories";
import CategoryItem from "../components/CategoryItem";
import { useState } from "react";

export default function CategoryManagementSection() {
  const { categories, addCategory, removeCategory, editCategory } =
    useCategories();

  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- Split categories ---------- */

  const customCategories = categories.filter((c) => c.user_id);
  const defaultCategories = categories.filter((c) => !c.user_id);

  /* ---------- Add ---------- */

  const handleAdd = async () => {
    const trimmed = newCategory.trim();

    if (!trimmed) {
      setError("Category cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await addCategory(trimmed);

      if (res?.error) {
        setError(res.error);
        return;
      }

      setNewCategory("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-5 sm:p-6
        shadow-sm
        space-y-8
      "
    >
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Categories
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Manage your custom categories and defaults
        </p>
      </div>

      {/* ---------- CUSTOM ---------- */}
      <div>
        <h3 className="text-xs uppercase text-gray-400 mb-3 tracking-wide">
          Custom Categories
        </h3>

        {/* Empty State */}
        {customCategories.length === 0 ? (
          <div
            className="
              flex flex-col items-center justify-center
              text-center py-8
              rounded-xl
              bg-gray-50 dark:bg-zinc-800/40
              border border-dashed border-gray-200 dark:border-zinc-700
            "
          >
            <div className="text-2xl mb-2">📂</div>
            <p className="text-sm text-gray-500">
              No custom categories yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Add your own categories to personalize tracking
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {customCategories.map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat}
                isDefault={false}
                onDelete={() => removeCategory(cat.id)}
                onEdit={(data) => editCategory(cat.id, data)}
              />
            ))}
          </div>
        )}

        {/* ADD INPUT */}
        <div className="mt-5 space-y-2">
          <div
            className="
              flex flex-col sm:flex-row gap-2
            "
          >
            <input
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                setError("");
              }}
              placeholder="Add new category..."
              className="
                flex-1 px-4 py-2.5 rounded-xl
                border border-gray-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                text-sm
                focus:ring-2 focus:ring-emerald-500
                transition
              "
            />

            <button
              onClick={handleAdd}
              disabled={loading}
              className="
                px-4 py-2.5 rounded-xl
                bg-emerald-500 text-white text-sm font-medium
                hover:bg-emerald-600
                active:scale-95
                transition
                disabled:opacity-50
                w-full sm:w-auto
              "
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 px-1">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* ---------- DEFAULT ---------- */}
      <div>
        <h3 className="text-xs uppercase text-gray-400 mb-3 tracking-wide">
          Default Categories
        </h3>

        <div className="flex flex-wrap gap-2">
          {defaultCategories.map((cat) => (
            <div
              key={cat.id}
              className="
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-lg
                text-xs font-medium
                bg-gray-100 text-gray-700
                dark:bg-zinc-800 dark:text-gray-300
              "
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}