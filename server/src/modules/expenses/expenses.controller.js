import {
  createExpense,
  deleteExpense,
  getExpensesCursor,
  getExpensesForExport,
  updateExpense,
} from "./expense.model.js";
import { stringify } from "csv-stringify/sync";
import XLSX from "xlsx";
import PDFDocument from "pdfkit";

// POST API : /api/expenses

export async function addExpense(req, res, next) {
  try {
    const userId = req.user.id; // From JWT TOKEN
    const expenseData = req.body;

    const expenseId = await createExpense(userId, expenseData);

    res.status(201).json({
      success: true,
      message: "expense added successfully",
      data: { expenseId },
    });
  } catch (err) {
    next(err);
  }
}

// GET API /api/expenses

export async function getExpenses(req, res, next) {
  try {
    const userId = req.user.id;

    const result = await getExpensesCursor(userId, req.validatedQuery);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE: api/expeneses/:id
export async function removeExpense(req, res, next) {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;

    await deleteExpense(expenseId, userId);

    res.status(200).json({
      status: true,
      message: "expense deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

// PUT: api/expenses/:id
export async function editExpense(req, res, next) {
  try {
    const userId = req.user.id;
    const expenseId = Number(req.params.id);

    const success = await updateExpense(userId, expenseId, req.body);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "expense not found",
      });
    }

    res.json({
      success: true,
      message: "Expense updated successfully.",
    });
  } catch (err) {
    next(err);
  }
}

// Export the Data of the user in CSV
export async function exportExpenses(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to } = req.validatedQuery;

    const expenses = await getExpensesForExport(userId, from, to);

    const formatted = expenses.map((e) => ({
      Date: e.expense_date,
      Amount: e.amount,
      Category: e.category,
      "Payment Method": e.payment_method,
      Merchant:e.merchant,
      Description: e.description,
    }));
    const csv = stringify(formatted, {
      header: true,
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment;filename="expense_export.csv"`,
    );

    res.status(200).send(csv);
  } catch (err) {
    next(err);
  }
}

// Export teh Expense in Excel Format
export async function exportToExcel(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to } = req.validatedQuery;

    const expenses = await getExpensesForExport(userId, from, to);
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader("Content-Disposition", "attachment;filename=expenses.xlsx");

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.send(buffer);
  } catch (err) {
    next(err);
  }
}

// Export to PDF Document..
export async function exportToPdf(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to } = req.validatedQuery;

    const expenses = await getExpensesForExport(userId, from, to);

    const doc = new PDFDocument({ margin: 30 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment;filename=expenses.pdf");
    doc.pipe(res);
    doc.fontSize(18).text("MoNNi Expense Report ", {
      align: "center",
    });
    doc.moveDown();
    expenses.forEach((exp) => {
      doc
        .fontSize(10)
        .text(
          `${exp.expense_date} | ₹${exp.amount} | ${exp.category} | ${exp.payment_method} | ${exp.merchant} | ${exp.description}`,
        );
    });
    doc.end();
  } catch (err) {
    next(err);
  }
}
