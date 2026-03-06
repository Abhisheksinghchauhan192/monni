export function extractDateRange(message) {

  const text = message.toLowerCase();

  const today = new Date();

  const format = (date) => date.toISOString().split("T")[0];

  // today
  if (text.includes("today")) {
    const date = format(today);
    return { from: date, to: date };
  }

  // yesterday
  if (text.includes("yesterday")) {
    const d = new Date(today);
    d.setDate(d.getDate() - 1);

    const date = format(d);
    return { from: date, to: date };
  }

  // last 7 days
  if (text.includes("last 7 days")) {
    const from = new Date(today);
    from.setDate(from.getDate() - 7);

    return {
      from: format(from),
      to: format(today)
    };
  }

  // this month
  if (text.includes("this month")) {

    const start = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      from: format(start),
      to: format(today)
    };
  }

  // last month
  if (text.includes("last month")) {

    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);

    return {
      from: format(start),
      to: format(end)
    };
  }

  // this year
  if (text.includes("this year")) {

    const start = new Date(today.getFullYear(), 0, 1);

    return {
      from: format(start),
      to: format(today)
    };
  }

  // default fallback
  const start = new Date(today.getFullYear(), today.getMonth(), 1);

  return {
    from: format(start),
    to: format(today)
  };
}