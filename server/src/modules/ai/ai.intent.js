export function detectIntent(message) {

  const text = message.toLowerCase();

  if (text.includes("why") || text.includes("increase") || text.includes("spike")) {
    return "spike";
  }

  if (text.includes("category")) {
    return "breakdown";
  }

  if (text.includes("trend") || text.includes("when")) {
    return "trend";
  }

  if (text.includes("total") || text.includes("summary")) {
    return "summary";
  }

  return "general";
}


export function extractDateRange(message) {
  const months = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };

  const lower = message.toLowerCase();

  let year = new Date().getFullYear();
  let month = null;

  for (const m in months) {
    if (lower.includes(m)) {
      month = months[m];
      break;
    }
  }

  const yearMatch = lower.match(/\b20\d{2}\b/);

  if (yearMatch) {
    year = Number(yearMatch[0]);
  }

  if (month) {
    const from = `${year}-${String(month).padStart(2, "0")}-01`;
    const to = new Date(year, month, 0)
      .toISOString()
      .split("T")[0];

    return { from, to };
  }

  return null;
}