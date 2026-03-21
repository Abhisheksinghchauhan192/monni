import { useSettings } from "../context/SettingsContext";
import { formatCurrency } from "../utils/currency";

export default function useCurrency() {
  const { settings } = useSettings();

  function format(amount) {
    return formatCurrency(amount, settings?.currency || "INR");
  }

  return { format };
}