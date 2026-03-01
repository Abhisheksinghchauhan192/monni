import { useState } from "react";
import { addExpenseSchema } from "../schema/addExpense.schema";
import useCategories from "../../../hooks/useCategories";
import { PAYMENT_METHODS } from "../../../constants/paymentMethods";
import { InputField, SelectField } from "./ui/FormFields";
import useForm from "../../../hooks/useForm";
import useAddExpense from "../hooks/useAddExpense";
import { useToast } from "../../../context/ToastContext";

export default function AddExpenseForm({ onSuccess, onClose }) {
  const { addToast } = useToast();
  const { categories, addCustomCategory } = useCategories();

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const { submitExpense } = useAddExpense({
    onSuccess,
    onClose,
    addToast,
  });

  const today = new Date().toLocaleDateString("en-CA");
  const form = useForm({
    initialValues: {
      description: "",
      amount: "",
      expense_date: today,
      category: "",
      payment_method: "",
      merchant: "",
    },
    schema: addExpenseSchema,
    onSubmit: submitExpense,
  });

  const handleAddCategory = () => {
    const result = addCustomCategory(newCategory);

    if (result.error) {
      setCategoryError(result.error);
      return;
    }

    form.handleChange({
      target: { name: "category", value: newCategory },
    });

    setNewCategory("");
    setShowCustomInput(false);
    setCategoryError("");
  };

  return (
    <form onSubmit={form.handleSubmit} className="space-y-6">
      {/* Description */}
      <InputField label="Description" name="description" form={form} />
      <InputField label="Merchant" name="merchant" form={form} />

      {/* Amount + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Amount" name="amount" type="number" form={form} />
        <InputField label="Date" name="expense_date" type="date" form={form} />
      </div>

      {/* Category Select */}
      <div className="space-y-2">
        <SelectField
          label="Category"
          name="category"
          options={[...categories, "➕ Add New Category"]}
          form={form}
        />

        {form.values.category === "➕ Add New Category" && (
          <div className="space-y-2 animate-fadeIn">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter new category"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setCategoryError("");
                }}
                className="
                  flex-1
                  px-4 py-2
                  rounded-xl
                  border border-gray-300 dark:border-zinc-700
                  bg-white dark:bg-zinc-800
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                  transition
                "
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="
                  px-4 py-2
                  rounded-xl
                  bg-emerald-500 text-white
                  hover:bg-emerald-600
                  transition cursor-pointer
                "
              >
                Add
              </button>
            </div>

            {categoryError && (
              <p className="text-sm text-red-500">{categoryError}</p>
            )}
          </div>
        )}
      </div>

      {/* Payment */}
      <SelectField
        label="Payment Method"
        name="payment_method"
        options={PAYMENT_METHODS}
        form={form}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={form.loading}
        className="
          mt-4 w-full
          bg-linear-to-r from-emerald-500 to-emerald-600
          text-white py-3
          rounded-xl
          shadow-md
          hover:shadow-lg
          hover:scale-[1.02]
          active:scale-[0.98]
          transition-all duration-200
          cursor-pointer
        "
      >
        {form.loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
