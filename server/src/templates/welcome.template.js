import { emailLayout } from "./emailLayout.js";

export function welcomeEmailTemplate(name) {

  const content = `
  <tr>
    <td align="center">
      <h2 style="
        margin:0 0 18px;
        color:#111827;
        font-size:22px;
        font-weight:600;
      ">
        Welcome to MoNNi 🎉
      </h2>
    </td>
  </tr>

  <tr>
    <td style="
      color:#4b5563;
      font-size:14px;
      text-align:center;
      padding-bottom:16px;
    ">
      Hi <strong>${name}</strong>,
    </td>
  </tr>

  <tr>
    <td style="
      color:#4b5563;
      font-size:14px;
      line-height:1.7;
      text-align:center;
      padding-bottom:18px;
    ">
      Your account has been successfully created.
      Start tracking your expenses and gain insights
      into your financial habits with MoNNi.
    </td>
  </tr>

  <tr>
    <td style="
      color:#6b7280;
      font-size:14px;
      text-align:center;
    ">
      We're excited to have you with us.
    </td>
  </tr>
  `;

  return emailLayout(content);
}