import { Resend } from "resend";
import { resetPasswordTemplate } from "../templates/resetPassword.template.js";
import { welcomeEmailTemplate } from "../templates/welcome.template.js";
import { otpEmailTemplate } from "../templates/otp.template.js";
import {RESEND_API_KEY} from "../config/env.js";

const resend = new Resend(RESEND_API_KEY);

const EMAIL_FROM = "MoNNi <no-reply@monni.tech>";

export async function sendEmail({ to, subject, html }) {
  try {
    const response = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });

    return response;
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send email", { cause: error });
  }
}


export async function sendResetEmail(to, resetLink) {
  const html = resetPasswordTemplate(resetLink);

  return sendEmail({
    to,
    subject: "Reset Your MoNNi Password",
    html,
  });
}


export async function sendWelcomeEmail(to, name) {
  const html = welcomeEmailTemplate(name);

  return sendEmail({
    to,
    subject: "Welcome to MoNNi 🚀",
    html,
  });
}

export async function sendOTPEmail(to, otp) {
  const html = otpEmailTemplate(otp);

  return sendEmail({
    to,
    subject: "Your MoNNi Verification Code",
    html,
  });
}