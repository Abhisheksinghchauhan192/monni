// Get all valid timezones (browser API)
export const ALL_TIMEZONES = Intl.supportedValuesOf("timeZone");

// Popular ones (fast UX)
export const POPULAR_TIMEZONES = [
  "Asia/Kolkata",
  "America/New_York",
  "Europe/London",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney",
];

//  Format function (for UI)
export function formatTimezone(tz) {
  return tz.replace("_", " ");
}