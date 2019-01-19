export const dateDayString = (d: Date) => d.toISOString().split('T')[0]

export const dateTimeString = (d: Date) => d.toISOString().split('T')[1]

export const dateSameDay = (a: Date, b: Date) =>
  dateDayString(a) === dateDayString(b)
