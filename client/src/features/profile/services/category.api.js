import http from "../../../api/http";

/* GET */
export const fetchCategories = async () => {
  const res = await http.get("/categories");
  return res.data;
};

/* CREATE */
export const createCategory = async (data) => {
  const res = await http.post("/categories", data);
  return res.data;
};

/* UPDATE */
export const updateCategory = async (id, data) => {
  const res = await http.patch(`/categories/${id}`, data);
  return res.data;
};

/* DELETE */
export const deleteCategory = async (id) => {
  const res = await http.delete(`/categories/${id}`);
  return res.data;
};