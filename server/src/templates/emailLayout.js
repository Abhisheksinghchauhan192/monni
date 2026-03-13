export function emailLayout(content) {
  return `
  <div style="margin:0;padding:0;background:#f9fafb;width:100%;">
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
      style="background:#f9fafb;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
      
      <tr>
        <td align="center">

          <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0"
            style="background:#ffffff;border-radius:12px;padding:40px 36px;border:1px solid #e5e7eb;">

            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:28px;">
                <h1 style="
                  margin:0;
                  font-size:22px;
                  letter-spacing:0.5px;
                  font-weight:700;
                  color:#10b981;
                ">
                  MoNNi
                </h1>
              </td>
            </tr>

            ${content}

            <!-- Divider -->
            <tr>
              <td style="border-top:1px solid #e5e7eb;padding-top:22px;margin-top:30px;"></td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="
                color:#9ca3af;
                font-size:12px;
                text-align:center;
                padding-top:6px;
              ">
                © ${new Date().getFullYear()} MoNNi. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `;
}