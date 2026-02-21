export default function ToastItem({toast,onClose}) {

    const baseStyles =     "px-4 py-3 rounded-lg shadow-lg text-white animate-slide-in";

    const typeStyles = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[toast.type]}`}>
      <div className="flex justify-between items-center gap-4">
        <span>{toast.message}</span>
        <button onClick={onClose} className="text-sm font-bold">
          ✕
        </button>
      </div>
    </div>
  )
}
