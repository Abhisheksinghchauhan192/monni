import { useState } from "react";
import { addExpenseSchema } from "../schema/addExpense.schema";
import useCategories from "../../../hooks/useCategories";
import { PAYMENT_METHODS } from "../../../constants/paymentMethods";
import { InputField } from "./ui/FormFields";
import useForm from "../../../hooks/useForm";
import useAddExpense from "../hooks/useAddExpense";
import { useToast } from "../../../context/ToastContext";
import CategorySelector from "./ui/CategorySelector";
import PaymentSelector  from "./ui/PaymentSelector";

const ADD_CATEGORY_OPTION = "__add_new__";

export default function AddExpenseForm({ onSuccess, onClose }) {
  const { addToast } = useToast();

  const {
    categories,
    addCategory,
    loading: categoryLoading,
  } = useCategories();

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
    onSubmit: (values) => {
      if (values.category === ADD_CATEGORY_OPTION) {
        setCategoryError("Please add a category first.");
        return;
      }

      submitExpense(values);
    },
  });

  /* ---------- Add Category ---------- */

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();

    if (!trimmed) {
      setCategoryError("Category cannot be empty");
      return;
    }

    const result = await addCategory(trimmed);

    if (result?.error) {
      setCategoryError(result.error);
      return;
    }

    // auto select newly added category
    form.handleChange({
      target: {
        name: "category",
        value: trimmed.toLowerCase(),
      },
    });

    setNewCategory("");
    setCategoryError("");
  };

  return (
    <form onSubmit={form.handleSubmit} className="space-y-6">
      {/* Description */}
      <InputField label="Description" name="description" form={form} />

      {/* Merchant */}
      <InputField label="Merchant" name="merchant" form={form} />

      {/* Amount + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Amount" name="amount" type="number" form={form} />
        <InputField label="Date" name="expense_date" type="date" form={form} />
      </div>

      {/* CATEGORY */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>

        <CategorySelector
          categories={categories}
          selected={form.values.category}
          onSelect={(value) =>
            form.handleChange({
              target: { name: "category", value },
            })
          }
          onAddClick={() =>
            form.handleChange({
              target: {
                name: "category",
                value: ADD_CATEGORY_OPTION,
              },
            })
          }
        />

        {/* Add Category Input */}
        {form.values.category === ADD_CATEGORY_OPTION && (
          <div className="space-y-2 mt-2">
            <div className="flex gap-2">
              <input
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setCategoryError("");
                }}
                placeholder="New category name"
                className="
                  flex-1 px-4 py-2 rounded-xl
                  border border-gray-300 dark:border-zinc-700
                  bg-white dark:bg-zinc-800
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                "
              />

              <button
                type="button"
                onClick={handleAddCategory}
                disabled={categoryLoading}
                className="
                  px-4 py-2 rounded-xl
                  bg-emerald-500 text-white
                "
              >
                {categoryLoading ? "..." : "Add"}
              </button>
            </div>

            {categoryError && (
              <p className="text-sm text-red-500">{categoryError}</p>
            )}
          </div>
        )}
      </div>

      {/* PAYMENT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Payment Method</label>

        <PaymentSelector
          methods={PAYMENT_METHODS}
          selected={form.values.payment_method}
          onSelect={(value) =>
            form.handleChange({
              target: {
                name: "payment_method",
                value,
              },
            })
          }
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={form.loading}
        className="
          w-full py-3 rounded-xl
          bg-emerald-500 text-white
          hover:bg-emerald-600
          transition
        "
      >
        {form.loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}