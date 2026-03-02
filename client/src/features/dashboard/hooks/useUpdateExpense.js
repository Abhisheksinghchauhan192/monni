import { updateExpenseApi } from "../services/expenses.api";
import { useToast } from "../../../context/ToastContext";

export default function useUpdateExpense() {
  const { addToast } = useToast();

  const updateExpense = async (id, values) => {
    try {
      const payload = {
        ...values,
        description:values.description.trim(),
        amount:values.amount.trim(),
        merchant:values.amount.trim(),
      }
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