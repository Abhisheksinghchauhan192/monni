import http from "../../../api/http";

export async function fetchInsights(params) {
  const res = await http.get("/analytics/insights", {
    params: params,
  });

  return res.data.insights;
}
