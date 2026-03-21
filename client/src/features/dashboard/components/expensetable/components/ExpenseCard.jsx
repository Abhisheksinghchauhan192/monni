import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import React from "react";
import useCurrency from "../../../../../hooks/useCurrency";
import {useCategories} from "../../../../../context/CategoriesContext"
function ExpenseCard({ expense, onOpen, onEdit }) {
  // Interaction refs
  const clickTimeout = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const currentX = useRef(0);
  const {format} = useCurrency();
  const{getCategoryMeta} = useCategories();
  //category emoji system
  const { emoji, chip } = getCategoryMeta(expense.category);

  // UI state
  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const SWIPE_THRESHOLD = 85;
  const MAX_SWIPE = -120;

  // Haptic feedback
  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(60);
  };

  // -----------------------------
  // CLICK / DOUBLE CLICK
  // -----------------------------
  const handleClick = () => {
    // prevent click if swipe gesture happened
    if (isSwiping || Math.abs(currentX.current) > 5) return;

    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;

      onEdit(expense); // double tap → edit
    } else {
      clickTimeout.current = setTimeout(() => {
        onOpen(expense); // single tap → details
        clickTimeout.current = null;
      }, 300);
    }
  };

  // -----------------------------
  // TOUCH START
  // -----------------------------
  const handleTouchStart = (e) => {
    const touch = e.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  // -----------------------------
  // TOUCH MOVE
  // -----------------------------
  const handleTouchMove = (e) => {
    const touch = e.touches[0];

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      setIsSwiping(true);

      // cancel click timer if swipe begins
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }

      const clamped = Math.min(0, Math.max(MAX_SWIPE, deltaX));

      setTranslateX(clamped);
      currentX.current = clamped;
    }
  };

  // -----------------------------
  // TOUCH END
  // -----------------------------
  const handleTouchEnd = () => {
    const wasSwipe = currentX.current < -SWIPE_THRESHOLD;

    if (wasSwipe) {
      triggerHaptic();
      onEdit(expense);
    }

    // Reset swipe state completely
    setTranslateX(0);
    currentX.current = 0;

    setTimeout(() => {
      setIsSwiping(false);
    }, 50);
  };

  // swipe background reveal
  const progress = Math.min(1, Math.abs(translateX) / Math.abs(MAX_SWIPE));

  return (
    <div className="relative h-full overflow-hidden rounded-xl">
      {/* Swipe Background */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-6"
        style={{
          backgroundColor: `rgba(16,185,129,${progress})`,
        }}
      >
        <div
          className="flex items-center gap-2 text-white text-sm font-medium"
          style={{ opacity: progress }}
        >
          <Pencil size={16} />
          Edit
        </div>
      </div>

      {/* Card */}
      <div
        className={`
            h-full w-full
            px-4 py-3
            rounded-xl
            cursor-pointer
            border
            relative
            overflow-hidden

            border-gray-200
            dark:border-zinc-800

            bg-gradient-to-b
            from-white
            via-white
            to-gray-50

            dark:from-zinc-900
            dark:via-zinc-900
            dark:to-zinc-950

            shadow-[0_1px_0_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.04)]
        `}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="
            absolute inset-0
            pointer-events-none
            bg-linear-to-br
            from-blue-300/40
            to-transparent
            dark:from-white/4
          "
        />
        <div className="flex w-full justify-between items-start">
          {/* LEFT SIDE */}
          <div className="flex flex-col min-w-0">
            {/* Description */}
            <p
              className="
            text-[14px]
            font-semibold
            text-gray-900
            dark:text-gray-100
            truncate
          "
            >
              {expense.description}
            </p>

            {/* Category Row */}
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span
                className={`
    inline-flex items-center gap-1
    px-2 py-[2px]
    rounded-md
    text-[11px]
    font-medium
    ${chip}
    `}
              >
                {emoji+" "}
                {expense.category}
              </span>

              <span className="text-gray-300 dark:text-zinc-700">•</span>

              <span className="text-gray-500">{expense.payment_method}</span>
            </div>

            {/* Date */}
            <p className="text-xs text-gray-400 mt-1">
              {new Date(expense.expense_date).toDateString()}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end ml-4">
            {/* Amount */}
            <p
              className="
              text-[15px]
              font-semibold
              text-emerald-600
              dark:text-emerald-500
              tracking-tight
              "
            >
              {format(expense.amount)}
            </p>

            {/* Merchant */}
            <p
              className="
            text-xs
            text-gray-400
            truncate
            max-w-[120px]
          "
            >
              {expense.merchant || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ExpenseCard);
