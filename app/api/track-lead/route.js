import { sendCapiEvent } from '../../../lib/capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { email, name, fbc, fbp } = await req.json()
    if (!email) return Response.json({ error: 'email required' }, { status: 400 })

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || undefined
    const userAgent = req.headers.get('user-agent') || undefined
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`

    console.log(`[CAPI] Lead eventId=${eventId}`)

    await sendCapiEvent({
      eventName: 'Lead',
      email,
      value: 1,
      currency: 'USD',
      contentIds: ['ai-ugc-course'],
      eventId, fbc, fbp, ip, userAgent,
      customData: { content_name: 'AI UGC Fast-Start Course', content_category: 'course' },
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
