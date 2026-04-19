import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { email, name } = await req.json()
    if (!email) return Response.json({ error: 'email required' }, { status: 400 })

    const resend = new Resend(process.env.RESEND_API_KEY)

    const firstName = name?.split(' ')[0] || 'there'

    await resend.emails.send({
      from: 'Blobbi <hello@blobbi.ai>',
      to: email,
      subject: 'Welcome to the AI UGC Fast-Start Course 🎉',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                blobbi<span style="color:#22c55e;">.</span>ai
              </span>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#111111;border:1px solid #1f1f1f;border-radius:16px;padding:40px 36px;">

              <!-- Greeting -->
              <p style="margin:0 0 8px;font-size:14px;color:#22c55e;font-weight:700;text-transform:uppercase;letter-spacing:2px;">
                You're in 🎉
              </p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:900;color:#ffffff;line-height:1.2;">
                Welcome to the AI UGC Fast-Start Course!
              </h1>
              <p style="margin:0 0 24px;font-size:16px;color:#9ca3af;line-height:1.6;">
                Hi ${firstName},<br /><br />
                Your course is now ready and waiting for you. Everything you need to create your first AI UGC ad is inside — and you can start right now.
              </p>

              <!-- What you'll learn -->
              <div style="background:#0d0d0d;border:1px solid #1f1f1f;border-radius:12px;padding:24px;margin-bottom:28px;">
                <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:1.5px;">What you'll learn</p>
                ${[
                  'How to create AI UGC video ads using Blobbi',
                  'The 5-part script structure that converts',
                  'Product & lifestyle UGC formats that work',
                  'How to launch your first paid campaign on Meta & TikTok',
                ].map(item => `
                <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;">
                  <span style="color:#22c55e;font-size:16px;margin-top:1px;">✓</span>
                  <span style="font-size:15px;color:#d1d5db;">${item}</span>
                </div>`).join('')}
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://www.blobbi.ai/app/course"
                       style="display:inline-block;background:linear-gradient(to right,#22c55e,#16a34a);color:#000000;font-weight:900;font-size:16px;padding:16px 40px;border-radius:12px;text-decoration:none;letter-spacing:-0.2px;">
                      Access Your Course Now →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:14px;color:#6b7280;text-align:center;line-height:1.6;">
                Ready to start? Your first module is waiting!<br />
                Need help? Just reply to this email — we're here.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:#4b5563;">
                © 2026 Blobbi.ai ·
                <a href="https://www.blobbi.ai/privacy" style="color:#22c55e;text-decoration:none;">Privacy Policy</a> ·
                <a href="https://www.blobbi.ai/terms" style="color:#22c55e;text-decoration:none;">Terms</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Send course email error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
