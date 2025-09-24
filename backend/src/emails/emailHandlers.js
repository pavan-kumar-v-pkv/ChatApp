import { Sender, resendClient } from '../lib/resend.js';
import { createWelcomeEmailTemplate } from './emailTemplates.js';

export const sendWelcomeEmail = async (email, name, clientUrl) => {
    try {
        console.log("Attempting to send email to:", email);
        console.log("From:", `${Sender.name} <${Sender.email}>`);
        console.log("Resend API Key exists:", !!process.env.RESEND_API_KEY);
        
        const { data, error } = await resendClient.emails.send({
            from: `${Sender.name} <${Sender.email}>`,
            to: email,
            subject: "Welcome to ChatApp!",
            html: createWelcomeEmailTemplate(name, clientUrl)
        });

        if(error) {
            console.error("Resend error details:", JSON.stringify(error, null, 2));
            throw new Error(`Failed to send welcome email: ${error.message || JSON.stringify(error)}`);
        }

        console.log("Welcome email sent successfully:", data);
        return data;
    } catch (err) {
        console.error("Exception in sendWelcomeEmail:", err);
        throw err;
    }
}