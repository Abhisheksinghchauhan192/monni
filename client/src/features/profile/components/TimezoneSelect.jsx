import { useState, useMemo } from "react";
import { ALL_TIMEZONES, POPULAR_TIMEZONES } from "../../../utils/timezone";
import TimezoneItem from "./ui/TimezoneItem";

export default function TimezoneSelect({ value, onChange }) {
  const [search, setSearch] = useState("");

  //  filter logic
  const filtered = useMemo(() => {
    if (!search) return ALL_TIMEZONES;

    return ALL_TIMEZONES.filter((tz) =>
      tz.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-3">

      {/*  SEARCH */}
      <input
        type="text"
        placeholder="Search timezone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-sm outline-none focus:ring-2 ring-emerald-400"
      />

      {/* LIST */}
      <div className="max-h-52 overflow-y-auto space-y-3 pr-1">

        {/* POPULAR */}
        {!search && (
          <div>
            <p className="text-xs text-gray-400 mb-1">Popular</p>

            <div className="space-y-1">
              {POPULAR_TIMEZONES.map((tz) => (
                <TimezoneItem
                  key={tz}
                  tz={tz}
                  active={value === tz}
                  onClick={onChange}
                />
              ))}
            </div>
          </div>
        )}

        {/* 🔍 ALL */}
        <div>
          <p className="text-xs text-gray-400 mb-1">
            {search ? "Results" : "All Timezones"}
          </p>

          <div className="space-y-1">
            {filtered.slice(0, 50).map((tz) => (
              <TimezoneItem
                key={tz}
                tz={tz}
                active={value === tz}
                onClick={onChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

