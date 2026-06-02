import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Save to DB — table: payg_waitlist (create if needed)
    await supabase.from('payg_waitlist').upsert({ email }, { onConflict: 'email' })

    // Notify admin
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await Promise.allSettled([
        // Admin notification
        resend.emails.send({
          from: 'Blobbi <hello@blobbi.ai>',
          to: 'hello@blobbi.ai',
          subject: `New PAYG Waitlist Signup: ${email}`,
          html: `<p><strong>${email}</strong> joined the PAYG waitlist.</p>`,
        }),
        // Confirmation to user
        resend.emails.send({
          from: 'Blobbi <hello@blobbi.ai>',
          to: email,
          subject: "You're on the list 🎉",
          html: `
            <div style="background:#0a0a0a;color:#fff;font-family:sans-serif;padding:40px;max-width:500px;margin:0 auto;border-radius:16px;">
              <img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Steps/Step1.png" style="height:48px;margin-bottom:24px;" />
              <h1 style="font-size:28px;font-weight:900;margin-bottom:12px;">You're on the list!</h1>
              <p style="color:#9ca3af;font-size:16px;line-height:1.6;">
                We'll email you the moment Blobbi PAYG launches. You'll be among the first to pay only for what you create — no subscriptions, no commitments.
              </p>
              <p style="color:#4ade80;font-size:14px;margin-top:24px;">— The Blobbi Team</p>
            </div>
          `,
        }),
      ])
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return Response.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
