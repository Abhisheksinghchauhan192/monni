import { useState } from "react";
import { motion } from "framer-motion";
import { useSettings } from "../../../context/SettingsContext";
import SettingCard from "../components/SettingCard";
import OptionButton from "../components/OptionButton";
import TimezoneSelect from "../components/TimezoneSelect";

export default function PersonalizationSection() {
  const { settings, updateSettings } = useSettings();
  const [loadingKey, setLoadingKey] = useState(null);

  if (!settings) return null;

  async function handleChange(key, value) {
    const keyId = key + value;

    setLoadingKey(keyId);

    await updateSettings({ [key]: value });

    setTimeout(() => {
      setLoadingKey(null);
    }, 300);
  }

  return (
    <div
      className="
        bg-white dark:bg-gray-950
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-5 sm:p-6
        shadow-sm
        space-y-8
      "
    >
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Personalization 
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Manage your preferences like currency and timezone 
        </p>
      </div>

      <div className="space-y-6">
        {/*  SAVING INDICATOR */}
        {loadingKey ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-emerald-500"
          >
            Saving...
          </motion.div>
        ) : (
          <div className="h-[16px] "></div>
        )}

        {/* THEME */}
        <SettingCard title="Theme">
          <div className="flex gap-3 flex-wrap">
            {["system", "light", "dark"].map((theme) => (
              <OptionButton
                key={theme}
                active={settings.theme === theme}
                loading={loadingKey === "theme" + theme}
                onClick={() => handleChange("theme", theme)}
              >
                {theme}
              </OptionButton>
            ))}
          </div>
        </SettingCard>

        {/* CURRENCY */}
        <SettingCard title="Currency">
          <div className="flex gap-3 flex-wrap">
            {[
              { code: "INR", symbol: "₹" },
              { code: "USD", symbol: "$" },
              { code: "EUR", symbol: "€" },
            ].map((c) => (
              <OptionButton
                key={c.code}
                active={settings.currency === c.code}
                loading={loadingKey === "currency" + c.code}
                onClick={() => handleChange("currency", c.code)}
              >
                {c.symbol} {c.code}
              </OptionButton>
            ))}
          </div>
        </SettingCard>

        {/* TIMEZONE */}
        <SettingCard title="Timezone">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="
    inline-flex items-center gap-2
    px-4 py-2 rounded-full
    bg-gradient-to-r from-emerald-500/10 to-emerald-400/5
    dark:from-emerald-500/20 dark:to-emerald-400/10
    border border-emerald-500/20
    backdrop-blur-md
    shadow-sm shadow-emerald-500/10
    text-sm font-medium
    text-emerald-600 dark:text-emerald-400
    w-fit max-w-full mb-4
  "
          >
            <span className="text-xs opacity-70">🌍</span>

            <span className="truncate ">{settings.timezone}</span>
          </motion.div>
          <TimezoneSelect
            value={settings.timezone}
            onChange={(tz) => handleChange("timezone", tz)}
          />
        </SettingCard>
      </div>
    </div>
  );
}
