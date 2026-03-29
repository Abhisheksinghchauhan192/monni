import { useEffect, useState } from "react";
import { fetchInsights } from "../services/insights.api";
import { useSettings } from "../../../context/SettingsContext";

export default function useAIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  const { settings } = useSettings();
  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const data = await fetchInsights({ timezone: settings.timezone });
        setInsights(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { insights, loading };
}
