export function trackEvent(event, data = {}, eventID) {
  if (typeof window !== 'undefined' && window.fbq) {
    if (eventID) {
      window.fbq('track', event, data, { eventID })
    } else {
      window.fbq('track', event, data)
    }
  }
}
