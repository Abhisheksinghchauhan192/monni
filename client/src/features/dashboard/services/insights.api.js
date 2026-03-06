import http from "../../../api/http";

export async function fetchInsights() {
    const res = await http.get("/analytics/insights");
  return res.data.insights;
}