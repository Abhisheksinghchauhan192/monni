import pool from "../database.js";

const DEFAULT_CATEGORIES = [
  { name: "Food", emoji: "🍔" },
  { name: "Transport", emoji: "🚕" },
  { name: "Groceries", emoji: "🛒" },
  { name: "Entertainment", emoji: "🎬" },
  { name: "Utilities", emoji: "💡" },
  { name: "Health", emoji: "💊" },
  { name: "Shopping", emoji: "🛍️" },
  { name: "Housing", emoji: "🏠" },
  { name: "Books", emoji: "📚" },
  { name: "Stationery", emoji: "✏️" },
  { name: "Others", emoji: "📦" },
];

const normalize = (name) => name.trim().toLowerCase();

async function seed() {
  try {
    for (const cat of DEFAULT_CATEGORIES) {
      await pool.query(
        `
        INSERT INTO categories 
        (user_id, name, normalized_name, emoji)
        VALUES (NULL, ?, ?, ?)
        `,
        [cat.name, normalize(cat.name), cat.emoji]
      );
    }

    console.log("✅ Categories seeded with emoji");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed", err);
    process.exit(1);
  }
}

seed();