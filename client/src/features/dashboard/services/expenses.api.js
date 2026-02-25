import http from "../../../api/http";

export async function fetchExpenseTable(params){

    const response = await http.get("/expenses",{
        params:params
    })

    return response.data;
}