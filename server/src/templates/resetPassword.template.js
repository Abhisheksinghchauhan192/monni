import { emailLayout } from "./emailLayout.js";

export function resetPasswordTemplate(resetLink) {

  const content = `
  <tr>
    <td align="center">
      <h2 style="
        margin:0 0 18px;
        color:#111827;
        font-size:22px;
        font-weight:600;
      ">
        Reset Your Password
      </h2>
    </td>
  </tr>

  <tr>
    <td style="
      color:#4b5563;
      font-size:14px;
      line-height:1.6;
      text-align:center;
      padding-bottom:26px;
    ">
      We received a request to reset your MoNNi password.
      Click the button below to create a new one.
    </td>
  </tr>

  <tr>
    <td align="center" style="padding-bottom:26px;">
      <a href="${resetLink}" 
        style="
          background:#10b981;
          color:#ffffff;
          text-decoration:none;
          padding:13px 24px;
          border-radius:8px;
          font-size:14px;
          font-weight:600;
          display:inline-block;
        ">
        Reset Password
      </a>
    </td>
  </tr>

  <tr>
    <td style="
      color:#6b7280;
      font-size:13px;
      text-align:center;
      padding-bottom:14px;
    ">
      This link will expire in <strong>10 minutes</strong>.
    </td>
  </tr>

  <tr>
    <td style="
      color:#9ca3af;
      font-size:12px;
      text-align:center;
      word-break:break-all;
      line-height:1.5;
    ">
      If the button doesn't work, copy and paste this link into your browser:<br><br>
      ${resetLink}
    </td>
  </tr>
  `;

  return emailLayout(content);
}