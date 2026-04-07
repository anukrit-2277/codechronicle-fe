/** INR→USD for UI display only; checkout stays in INR. */
const DISPLAY_INR_PER_USD = 84

function inrToUsdDisplayString(inr) {
  const n = Number(inr)
  if (!Number.isFinite(n) || n < 0) return null
  return (n / DISPLAY_INR_PER_USD).toFixed(2)
}

/** e.g. USD $4.76 */
export function formatUsdFromInr(inr) {
  const usd = inrToUsdDisplayString(inr)
  if (usd == null) return null
  return `USD $${usd}`
}
