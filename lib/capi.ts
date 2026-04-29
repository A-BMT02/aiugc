const PIXEL_ID = '2139845240137111'

interface CapiEventParams {
  eventName: string
  email: string
  value: number
  currency?: string
  contentIds?: string[]
  eventId?: string
  fbc?: string
  fbp?: string
  ip?: string
  userAgent?: string
  customData?: Record<string, unknown>
}

export async function sendCapiEvent({
  eventName,
  email,
  value,
  currency = 'USD',
  contentIds = [],
  eventId,
  fbc,
  fbp,
  ip,
  userAgent,
  customData = {},
}: CapiEventParams): Promise<void> {
  const token = process.env.META_CAPI_TOKEN
  if (!token) return

  const hashedEmail = await sha256(email.toLowerCase().trim())

  const userData: Record<string, unknown> = { em: [hashedEmail] }
  if (fbc) userData.fbc = fbc
  if (fbp) userData.fbp = fbp
  if (ip) userData.client_ip_address = ip
  if (userAgent) userData.client_user_agent = userAgent

  const event: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: 'https://www.blobbi.ai/ai-ugc-course-checkout',
    user_data: userData,
    custom_data: { value, currency, content_ids: contentIds, content_type: 'product', ...customData },
  }
  if (eventId) event.event_id = eventId

  const payload: Record<string, unknown> = { data: [event] }
  if (process.env.META_CAPI_TEST_CODE) payload.test_event_code = process.env.META_CAPI_TEST_CODE

  console.log(`[CAPI] sending ${eventName} | fbc=${fbc ?? 'MISSING'} | fbp=${fbp ?? 'MISSING'} | eventId=${eventId ?? 'none'} | ip=${ip ?? 'none'}`)

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${token}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
  ).catch((err: unknown) => { console.error('[CAPI] fetch error:', err); return null })

  if (res) {
    const body = await res.json().catch(() => null)
    console.log(`[CAPI] ${eventName} → status=${res.status}`, JSON.stringify(body))
  }
}

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}
