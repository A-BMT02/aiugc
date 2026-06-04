export const GA4_ID = 'G-SRVB9Y620X'

export function gtagEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

export function trackSignUp(method = 'email') {
  gtagEvent('sign_up', { method })
}

export function trackPurchase({ transactionId, packName, price }) {
  gtagEvent('purchase', {
    transaction_id: transactionId,
    value: price,
    currency: 'USD',
    items: [{
      item_id: packName.toLowerCase(),
      item_name: `Blobbi ${packName} Pack`,
      price,
      quantity: 1,
    }],
  })
}
