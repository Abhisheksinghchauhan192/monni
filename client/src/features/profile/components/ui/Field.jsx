export function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {value}
      </p>
    </div>
  );
}