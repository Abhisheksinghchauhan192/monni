import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendResetEmail(to, resetLink) {
  await transporter.sendMail({
    from: `"MoNNi Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your MoNNi Password",
    html: `
      <div style="background-color:#f3f4f6;padding:40px 0;font-family:Arial,sans-serif;">
        <div style="
          max-width:480px;
          margin:0 auto;
          background:#ffffff;
          border-radius:12px;
          padding:30px;
          box-shadow:0 4px 12px rgba(0,0,0,0.05);
        ">
          
          <h2 style="margin:0 0 20px;color:#111827;text-align:center;">
            Reset Your Password
          </h2>

          <p style="color:#4b5563;font-size:14px;line-height:1.6;">
            We received a request to reset your password for your MoNNi account.
          </p>

          <p style="color:#4b5563;font-size:14px;line-height:1.6;">
            Click the button below to set a new password.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <a href="${resetLink}" 
              style="
                background-color:#10b981;
                color:#ffffff;
                padding:12px 20px;
                text-decoration:none;
                border-radius:8px;
                font-weight:bold;
                display:inline-block;
              ">
              Reset Password
            </a>
          </div>

          <p style="color:#6b7280;font-size:13px;line-height:1.6;">
            This link will expire in <strong>10 minutes</strong>.
          </p>

          <p style="color:#6b7280;font-size:13px;line-height:1.6;">
            If you did not request this, you can safely ignore this email.
          </p>

          <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

          <p style="font-size:12px;color:#9ca3af;text-align:center;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>

          <p style="font-size:12px;color:#6b7280;word-break:break-all;text-align:center;">
            ${resetLink}
          </p>

          <p style="font-size:11px;color:#9ca3af;text-align:center;margin-top:20px;">
            © ${new Date().getFullYear()} MoNNi. All rights reserved.
          </p>

        </div>
      </div>
    `,
  });
}