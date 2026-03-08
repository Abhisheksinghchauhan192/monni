import { createExpense } from "../services/expenses.api";

export default function useAddExpense({ onSuccess, onClose, addToast }) {
  const submitExpense = async (values) => {
    try {
      const payload = {
        ...values,
        description:values.description.trim(),
        merchant:values.merchant.trim(),
        amount: Number(values.amount),
      };

      const res = await createExpense(payload);
      const newExpense = {id:res.data.expenseId,...payload}

      onSuccess?.(newExpense);
      onClose?.();     
      addToast("Expense added successfully", "success");

    } catch (err) {
      onClose?.();
      addToast("Failed to add expense", "error");
      throw err;
    }
  };

  return { submitExpense };
}