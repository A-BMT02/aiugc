import { sendCapiEvent } from '../../../lib/capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { email, name, fbc, fbp } = await req.json()
    if (!email) return Response.json({ error: 'email required' }, { status: 400 })

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || undefined
    const userAgent = req.headers.get('user-agent') || undefined

    await sendCapiEvent({
      eventName: 'Lead',
      email,
      value: 1,
      currency: 'USD',
      contentIds: ['ai-ugc-course'],
      fbc, fbp, ip, userAgent,
      customData: { content_name: 'AI UGC Fast-Start Course', content_category: 'course' },
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
