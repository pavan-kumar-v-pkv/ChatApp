import { Resend } from "resend";
import { ENV } from "./env.js";

export const resendClient = new Resend(ENV.RESEND_API_KEY);
export const Sender = {
    email: ENV.EMAIL_FROM,
    name: ENV.EMAIL_FROM_NAME || "Messenger Team"
}