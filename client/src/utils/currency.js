export const CURRENCY_META = {
  INR: { symbol: "₹", locale: "en-IN" },
  USD: { symbol: "$", locale: "en-US" },
  EUR: { symbol: "€", locale: "en-US" },
};

//  Format function (MAIN)
export function formatCurrency(amount, currency = "INR") {
  if (amount == null) return "";

  const meta = CURRENCY_META[currency] || CURRENCY_META["INR"];

  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}