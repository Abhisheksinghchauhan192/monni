import useForm from "../../../../hooks/useForm";
import { expenseUpdateSchema } from "../../schema/updateExpense.schema";
import { InputField, SelectField } from "../ui/FormFields";
import { PAYMENT_METHODS } from "../../../../constants/paymentMethods";
import useUpdateExpense from "../../hooks/useUpdateExpense";

export default function EditExpenseForm({
  expense,
  categories,
  onCancel,
  onSuccess,
}) {
  const { updateExpense } = useUpdateExpense();

  const form = useForm({
    initialValues: {
      ...expense,
      expense_date: expense.expense_date?.split("T")[0],
    },
    schema: expenseUpdateSchema,
    onSubmit: async (values) => {
      const original = {
        ...expense,
        expense_date: expense.expense_date?.split("T")[0],
      };

      const isSame = JSON.stringify(original) === JSON.stringify(values);

      if (isSame) {
        onCancel(); // just close modal
        return;
      }

      const updated = await updateExpense(values.id, {
        ...values,
        amount: Number(values.amount),
      });

      onSuccess(updated);
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="space-y-5">
      <InputField label="Description" name="description" form={form} />
      <InputField label="Merchant" name="merchant" form={form} />

      <div className="grid grid-cols-2 gap-4">
        <InputField label="Amount" name="amount" type="number" form={form} />
        <InputField label="Date" name="expense_date" type="date" form={form} />
      </div>

      <SelectField
        label="Category"
        name="category"
        options={categories}
        form={form}
      />

      <SelectField
        label="Payment Method"
        name="payment_method"
        options={PAYMENT_METHODS}
        form={form}
      />

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-gray-100 cursor-pointer dark:text-gray-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={form.loading}
          className="px-5 py-2 rounded-xl bg-emerald-600 text-white cursor-pointer"
        >
          {form.loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
