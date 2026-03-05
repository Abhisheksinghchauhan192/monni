import http from "../../../api/http";

export async function chatWithAI(message,history){

    const res = await http.post("/ai/chat",{
        message,history
    })

    return res.data;
}