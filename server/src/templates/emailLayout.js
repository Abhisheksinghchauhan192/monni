export function emailLayout(content) {
  return `
  <div style="margin:0;padding:0;background:#f3f4f6;width:100%;">
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
      style="background:#f3f4f6;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
      
      <tr>
        <td align="center">

          <table role="presentation" width="480" cellspacing="0" cellpadding="0" border="0"
            style="background:#ffffff;border-radius:12px;padding:30px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">

            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h1 style="color:#10b981;margin:0;font-size:20px;">MoNNi</h1>
              </td>
            </tr>

            ${content}

            <!-- Divider -->
            <tr>
              <td style="border-top:1px solid #e5e7eb;padding-top:20px;"></td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="color:#9ca3af;font-size:11px;text-align:center;">
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