import { deleteExpenseApi } from "../services/expenses.api";
import { useToast } from "../../../context/ToastContext";

export default function useDeleteExpense() {
  const { addToast } = useToast();

  const deleteExpense = async (id) => {
    try {
      await deleteExpenseApi(id);
      addToast("Expense deleted successfully", "success");
    } catch (err) {
      addToast("Failed to delete expense", "error");
      throw err;
    }
  };

  return { deleteExpense };
}