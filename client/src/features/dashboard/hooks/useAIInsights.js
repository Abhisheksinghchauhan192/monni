import { useEffect, useState } from "react";
import { fetchInsights } from "../services/insights.api";

export default function useAIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const data = await fetchInsights();
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