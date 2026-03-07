import { emailLayout } from "./emailLayout.js";

export function otpEmailTemplate(otp) {

  const content = `
  <tr>
    <td align="center">
      <h2 style="margin:0 0 20px;color:#111827;font-size:22px;">
        Verify Your Account
      </h2>
    </td>
  </tr>

  <tr>
    <td style="color:#4b5563;font-size:14px;">
      Use the following OTP to verify your account:
    </td>
  </tr>

  <tr>
    <td align="center" style="padding:30px 0;">
      <div style="
        font-size:28px;
        letter-spacing:6px;
        font-weight:bold;
        color:#10b981;
        background:#f0fdf4;
        padding:15px 25px;
        border-radius:8px;
        display:inline-block;">
        ${otp}
      </div>
    </td>
  </tr>

  <tr>
    <td style="color:#6b7280;font-size:13px;text-align:center;">
      This code expires in <strong>10 minutes</strong>.
    </td>
  </tr>
  `;

  return emailLayout(content);
}