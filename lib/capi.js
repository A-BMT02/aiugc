const PIXEL_ID = '2139845240137111'

export async function sendCapiEvent({ eventName, email, value, currency = 'USD', contentIds = [], eventId, customData = {} }) {
  const token = process.env.META_CAPI_TOKEN
  if (!token) return

  const hashedEmail = await sha256(email.toLowerCase().trim())

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: 'https://www.blobbi.ai',
    user_data: { em: [hashedEmail] },
    custom_data: { value, currency, content_ids: contentIds, content_type: 'product', ...customData },
  }
  if (eventId) event.event_id = eventId

  await fetch(
    `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${token}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: [event] }) }
  ).catch(err => console.error('CAPI error:', err))
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}
