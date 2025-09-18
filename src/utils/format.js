export const pct = (v) => {
  if (v === null || v === undefined) return '--'
  const sign = v > 0 ? '+' : ''
  return `${sign}${Number(v).toFixed(2)}%`
}

export const dateShort = (d) => {
  if (!d) return ''
  // d expects YYYY-MM-DD
  const dt = new Date(d)
  return dt.toLocaleDateString()
}
