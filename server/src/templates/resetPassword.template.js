import { emailLayout } from "./emailLayout.js";

export function resetPasswordTemplate(resetLink) {
  const content = `
  <tr>
    <td align="center">
      <h2 style="margin:0 0 20px;color:#111827;font-size:22px;">
        Reset Your Password
      </h2>
    </td>
  </tr>

  <tr>
    <td style="color:#4b5563;font-size:14px;line-height:1.6;">
      We received a request to reset your MoNNi password.
    </td>
  </tr>

  <tr>
    <td align="center" style="padding:30px 0;">
      <a href="${resetLink}" 
        style="
          background:#10b981;
          color:#ffffff;
          text-decoration:none;
          padding:12px 22px;
          border-radius:8px;
          font-size:14px;
          font-weight:bold;
          display:inline-block;">
        Reset Password
      </a>
    </td>
  </tr>

  <tr>
    <td style="color:#6b7280;font-size:13px;">
      This link expires in <strong>10 minutes</strong>.
    </td>
  </tr>

  <tr>
    <td style="padding-top:20px;color:#9ca3af;font-size:12px;">
      If the button doesn't work, copy and paste this link into your browser:
    </td>
  </tr>

  <tr>
    <td style="word-break:break-all;color:#6b7280;font-size:12px;padding-top:10px;">
      ${resetLink}
    </td>
  </tr>
  `;

  return emailLayout(content);
}