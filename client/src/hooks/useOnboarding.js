import { useEffect, useState } from "react";

export default function useOnboarding(key) {
  const [seen, setSeen] = useState(true);

  useEffect(() => {
    const value = localStorage.getItem(key);
    setSeen(value === "true");
  }, [key]);

  const markSeen = () => {
    localStorage.setItem(key, "true");
    setSeen(true);
  };

  return { seen, markSeen };
}