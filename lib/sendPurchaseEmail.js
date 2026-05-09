import { Resend } from 'resend'

const PLAN_DISPLAY = {
  starter: 'Start Up',
  'start up': 'Start Up',
  growth: 'Growth',
  pro: 'Pro',
}

const PLAN_CREDITS = {
  starter: 40,
  'start up': 40,
  growth: 70,
  pro: 125,
}

export async function sendPurchaseEmail(email, planName) {
  if (!email || !planName) return

  const resend = new Resend(process.env.RESEND_API_KEY)
  const planKey = planName.toLowerCase()
  const displayName = PLAN_DISPLAY[planKey] || planName
  const credits = PLAN_CREDITS[planKey] || 0
  const videos = Math.floor(credits / 10)

  await resend.emails.send({
    from: 'Blobbi <hello@blobbi.ai>',
    to: email,
    subject: `You're on the ${displayName} plan 🎉`,
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

              <p style="margin:0 0 8px;font-size:14px;color:#22c55e;font-weight:700;text-transform:uppercase;letter-spacing:2px;">
                Subscription Confirmed ✓
              </p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:900;color:#ffffff;line-height:1.2;">
                Welcome to the ${displayName} plan!
              </h1>
              <p style="margin:0 0 28px;font-size:16px;color:#9ca3af;line-height:1.6;">
                Your account is now active. You have <strong style="color:#22c55e;">${credits} credits</strong> ready to use — enough for up to <strong style="color:#ffffff;">${videos} videos</strong> this month.
              </p>

              <!-- Plan details -->
              <div style="background:#0d0d0d;border:1px solid #1f1f1f;border-radius:12px;padding:24px;margin-bottom:28px;">
                <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:1.5px;">What's included</p>
                ${[
                  `${credits} credits / month`,
                  'Multiple languages',
                  'UGC Studio',
                  'AI Editor',
                  'Multiple Actors',
                  'Custom Actor',
                  'Product Holding',
                  'Priority Support',
                ].map(item => `
                <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
                  <span style="color:#22c55e;font-size:16px;margin-top:1px;">✓</span>
                  <span style="font-size:15px;color:#d1d5db;">${item}</span>
                </div>`).join('')}
              </div>

              <!-- How to get started -->
              <div style="background:#0d0d0d;border:1px solid #1f1f1f;border-radius:12px;padding:24px;margin-bottom:28px;">
                <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:1.5px;">Create your first video in 3 steps</p>
                ${[
                  'Go to your dashboard and click "New Project"',
                  'Paste your script and pick a voice & actor',
                  'Hit generate — your video is ready in seconds',
                ].map((item, i) => `
                <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
                  <span style="background:#22c55e;color:#000;font-weight:900;font-size:12px;min-width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">${i + 1}</span>
                  <span style="font-size:15px;color:#d1d5db;">${item}</span>
                </div>`).join('')}
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://www.blobbi.ai/dashboard"
                       style="display:inline-block;background:linear-gradient(to right,#22c55e,#16a34a);color:#000000;font-weight:900;font-size:16px;padding:16px 40px;border-radius:12px;text-decoration:none;letter-spacing:-0.2px;">
                      Start Creating Now →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:14px;color:#6b7280;text-align:center;line-height:1.6;">
                Questions? Just reply to this email — we're happy to help.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:#4b5563;">
                © 2026 Blobbi.ai ·
                <a href="https://www.blobbi.ai/billing" style="color:#22c55e;text-decoration:none;">Manage Subscription</a> ·
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
}
