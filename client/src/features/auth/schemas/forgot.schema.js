import {z} from "zod";

export const forgotSchema = z.object({
    email:z
    .email("Please Enter a valid email")
})