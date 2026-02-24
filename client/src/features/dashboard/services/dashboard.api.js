import http from "../../../api/http";

export async function fetchDashboardAnalytics(params){

    const response = await http.get("/analytics/dashboard",{
        params:params
    })

    return response.data.data;
}