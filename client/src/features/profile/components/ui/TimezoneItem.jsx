import { formatTimezone } from "../../../../utils/timezone";
//  Reusable item
export default function TimezoneItem({ tz, active, onClick }) {
  return (
    <button
      onClick={() => onClick(tz)}
      className={`
        w-full text-left px-3 py-2 rounded-lg text-sm transition
        ${
          active
            ? "bg-emerald-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300"
        }
      `}
    >
      {formatTimezone(tz)}
    </button>
  );
}