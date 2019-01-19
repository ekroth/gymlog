export const dateStripTime = (d: Date) =>
  new Date(d.toISOString().split('T')[0])

export const dateSameDay = (a: Date, b: Date) =>
  dateStripTime(a).toISOString() === dateStripTime(b).toISOString()
