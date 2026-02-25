import { useRef, useState } from "react";
import { Pencil } from "lucide-react";

export default function ExpenseCard({ expense, onOpen, onEdit }) {
  const clickTimeout = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const currentX = useRef(0);

  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const SWIPE_THRESHOLD = 85;
  const MAX_SWIPE = -120;

  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  // --- Click + Double Click Logic ---
  const handleClick = () => {
    if (isSwiping) return;

    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      onEdit(expense);
    } else {
      clickTimeout.current = setTimeout(() => {
        onOpen(expense);
        clickTimeout.current = null;
      }, 250);
    }
  };

  // --- Touch Start ---
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  // --- Touch Move ---
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    // Only react to horizontal dominant movement
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setIsSwiping(true);

      const clamped = Math.min(0, Math.max(MAX_SWIPE, deltaX));
      setTranslateX(clamped);
      currentX.current = clamped;
    }
  };

  // --- Touch End ---
  const handleTouchEnd = () => {
    if (currentX.current < -SWIPE_THRESHOLD) {
      triggerHaptic();
      onEdit(expense);

      // small bounce before reset
      setTranslateX(-25);
      setTimeout(() => {
        setTranslateX(0);
      }, 120);
    } else {
      setTranslateX(0);
    }

    setTimeout(() => {
      setIsSwiping(false);
    }, 120);
  };

  // Progressive emerald reveal
  const progress = Math.min(1, Math.abs(translateX) / Math.abs(MAX_SWIPE));

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Background Layer */}
      <div
        className="absolute inset-0 flex justify-end items-center pr-6 text-white"
        style={{
          backgroundColor: `rgba(16, 185, 129, ${progress})`, // emerald progressive
        }}
      >
        <div
          className="flex items-center gap-2 font-medium transition-opacity duration-150"
          style={{ opacity: progress }}
        >
          <Pencil size={18} />
          Edit
        </div>
      </div>

      {/* Sliding Card */}
      <div
        className={`bg-white dark:bg-zinc-900 
    p-4 rounded-2xl cursor-pointer
    border border-gray-200 dark:border-zinc-800
    transition-all duration-200 ease-out
    ${isSwiping ? "shadow-2xl scale-[0.985]" : "shadow-sm hover:shadow-md"}
  `}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-between items-start">
          {/* Left */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 ">
              {expense.description}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {expense.category} • {expense.payment_method}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(expense.expense_date).toLocaleDateString()}
            </p>
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-600">
              ₹ {Number(expense.amount).toFixed(2)}
            </p>

            <p className="text-xs text-gray-400">{expense.merchant}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
