import { emailLayout } from "./emailLayout.js";

export function welcomeEmailTemplate(name) {

  const content = `
  <tr>
    <td align="center">
      <h2 style="margin:0 0 20px;color:#111827;font-size:22px;">
        Welcome to MoNNi 🎉
      </h2>
    </td>
  </tr>

  <tr>
    <td style="color:#4b5563;font-size:14px;">
      Hi <strong>${name}</strong>,
    </td>
  </tr>

  <tr>
    <td style="padding-top:15px;color:#4b5563;font-size:14px;line-height:1.6;">
      Your account has been successfully created. 
      Start tracking your expenses and gain insights into your financial habits.
    </td>
  </tr>

  <tr>
    <td style="padding-top:20px;color:#4b5563;font-size:14px;">
      We're excited to have you with us.
    </td>
  </tr>
  `;

  return emailLayout(content);
}