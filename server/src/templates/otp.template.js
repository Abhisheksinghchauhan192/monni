import { emailLayout } from "./emailLayout.js";

export function otpEmailTemplate(otp) {

  const content = `
  <tr>
    <td align="center">
      <h2 style="
        margin:0 0 18px;
        color:#111827;
        font-size:22px;
        font-weight:600;
      ">
        Verify Your Account
      </h2>
    </td>
  </tr>

  <tr>
    <td style="
      color:#4b5563;
      font-size:14px;
      text-align:center;
      line-height:1.6;
      padding-bottom:26px;
    ">
      Enter the verification code below to confirm your MoNNi account.
    </td>
  </tr>

  <tr>
    <td align="center" style="padding-bottom:26px;">

      <div style="
        font-size:30px;
        letter-spacing:8px;
        font-weight:700;
        color:#10b981;
        background:#f0fdf4;
        padding:16px 28px;
        border-radius:10px;
        display:inline-block;
        border:1px solid #bbf7d0;
      ">
        ${otp}
      </div>

    </td>
  </tr>

  <tr>
    <td style="
      color:#6b7280;
      font-size:13px;
      text-align:center;
    ">
      This code will expire in <strong>10 minutes</strong>.
    </td>
  </tr>
  `;

  return emailLayout(content);
}