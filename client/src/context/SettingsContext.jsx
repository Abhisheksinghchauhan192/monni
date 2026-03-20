import { createContext, useContext, useEffect, useRef, useState } from "react";
import http from "../api/http";
import { useTheme } from "./ThemeContext";

const SettingsContext = createContext();
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const debounceRef = useRef(null);
  const lastSentRef = useRef({});
  const { setTheme } = useTheme(); // connect to ThemeContext

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!settings) return;

    // if no timezone set → detect
    if (!settings.timezone) {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;

      setSettings((prev) => ({ ...prev, timezone: detected }));
    }
  }, [settings]);

  //  initial sync when settings load
  useEffect(() => {
    if (!settings) return;

    if (settings.theme) {
      setTheme(settings.theme);
    }
  }, [settings]);

  async function fetchSettings() {
    try {
      const res = await http.get("users/settings");
      setSettings(res.data);
    } catch (err) {
      console.error("Settings fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  // inside updateSettings
  async function updateSettings(data) {
    //skip if no change
    const hasChange = Object.entries(data).some(
      ([key, value]) => settings[key] !== value,
    );

    if (!hasChange) return;

    // instant UI update
    setSettings((prev) => ({ ...prev, ...data }));

    if (data.theme) {
      setTheme(data.theme);
    }

    // clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // store latest pending data
    lastSentRef.current = {
      ...lastSentRef.current,
      ...data,
    };

    debounceRef.current = setTimeout(async () => {
      try {
        const payload = lastSentRef.current;

        //  final check before sending
        const hasRealChange = Object.entries(payload).some(
          ([key, value]) => settings[key] !== value,
        );

        if (!hasRealChange) return;

        await http.patch("users/settings", payload);

        lastSentRef.current = {}; // reset
      } catch (err) {
        console.error("Settings update failed", err);
      }
    }, 2000);
  }

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
