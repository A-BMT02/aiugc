const PIXEL_ID = '2139845240137111'

export async function sendCapiEvent({ eventName, email, value, currency = 'USD', contentIds = [], eventId, customData = {} }) {
  const token = process.env.META_CAPI_TOKEN
  console.log(`[CAPI] sendCapiEvent called: ${eventName}, email: ${email}, value: ${value}`)

  if (!token) {
    console.error('[CAPI] META_CAPI_TOKEN is not set — event not sent')
    return
  }

  const hashedEmail = await sha256(email.toLowerCase().trim())
  console.log(`[CAPI] hashed email: ${hashedEmail.slice(0, 8)}...`)

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: 'https://www.blobbi.ai',
    user_data: { em: [hashedEmail] },
    custom_data: { value, currency, content_ids: contentIds, content_type: 'product', ...customData },
  }
  if (eventId) event.event_id = eventId

  const payload = { data: [event] }
  if (process.env.META_CAPI_TEST_CODE) {
    payload.test_event_code = process.env.META_CAPI_TEST_CODE
    console.log(`[CAPI] test_event_code: ${process.env.META_CAPI_TEST_CODE}`)
  }

  console.log('[CAPI] sending payload:', JSON.stringify(payload))

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${token}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    )
    const result = await res.json()
    console.log(`[CAPI] Meta response (${res.status}):`, JSON.stringify(result))
  } catch (err) {
    console.error('[CAPI] fetch error:', err)
  }
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}
