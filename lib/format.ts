export function formatCurrency(n: number, currency = "USD", locale = "en-US") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n)
  } catch {
    return `$${n.toFixed(2)}`
  }
}
