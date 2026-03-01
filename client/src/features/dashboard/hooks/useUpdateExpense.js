import { updateExpenseApi } from "../services/expenses.api";
import { useToast } from "../../../context/ToastContext";

export default function useUpdateExpense() {
  const { addToast } = useToast();

  const updateExpense = async (id, payload) => {
    try {
      await updateExpenseApi(id, payload);
      addToast("Expense updated successfully", "success");
      return { id, ...payload };
    } catch (err) {
      addToast("Failed to update expense", "error");
      throw err;
    }
  };

  return { updateExpense };
}