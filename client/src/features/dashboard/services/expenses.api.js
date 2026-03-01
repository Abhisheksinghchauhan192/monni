import http from "../../../api/http";

export async function fetchExpenseTable(params) {
  const response = await http.get("/expenses", {
    params: params,
  });

  return response.data;
}

export async function fetchCategories() {
  const response = await http.get("/expenses/categories");
  return response.data;
}

export async function createExpense(payload){
  const res = await http.post("/expenses",payload);
  return res.data;
}