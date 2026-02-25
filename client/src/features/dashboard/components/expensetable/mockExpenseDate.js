// mockExpenses.js
export const mockExpenses = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Expense ${i + 1}`,
  category: ["Food", "Travel", "Shopping"][i % 3],
  amount: Math.floor(Math.random() * 5000),
  date: new Date().toISOString(),
}));