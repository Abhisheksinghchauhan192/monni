export function InputField({
  label,
  name,
  type = "text",
  form,
  placeholder = "",
}) {
  const hasError = !!form.errors[name];

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={form.values[name] ?? ""}
        onChange={form.handleChange}
        placeholder={placeholder}
        className={`
          mt-1 px-4 py-2 rounded-xl
          border
          bg-gray-50 dark:bg-zinc-800
          outline-none
          transition
          focus:ring-2 focus:ring-emerald-500
          ${hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-zinc-700"}
        `}
      />

      {hasError && (
        <span className="text-xs text-red-500 mt-1">
          {form.errors[name]}
        </span>
      )}
    </div>
  );
}


export function SelectField({
  label,
  name,
  options,
  form,
}) {
  const hasError = !!form.errors[name];

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <select
        name={name}
        value={form.values[name] ?? ""}
        onChange={form.handleChange}
        className={`
          mt-1 px-4 py-2 rounded-xl
          border
          bg-gray-50 dark:bg-zinc-800
          outline-none
          transition
          focus:ring-2 focus:ring-emerald-500
          ${hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-zinc-700"}
        `}
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {hasError && (
        <span className="text-xs text-red-500 mt-1">
          {form.errors[name]}
        </span>
      )}
    </div>
  );
}