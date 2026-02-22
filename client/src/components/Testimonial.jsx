export default function Testimonial({ name, role, text }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-200 dark:border-gray-800">
      <p className="text-gray-600 dark:text-gray-400 italic">"{text}"</p>
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}
