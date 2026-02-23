import { Plus } from "lucide-react";

export default function AddExpenseButton() {
  return (
    <button
      className="fixed bottom-8 right-8 
                 w-14 h-14 rounded-full 
                 bg-emerald-500 hover:bg-emerald-600 
                 text-white shadow-lg 
                 flex items-center justify-center
                 transition-transform hover:scale-105"
    >
      <Plus size={24} />
    </button>
  );
}