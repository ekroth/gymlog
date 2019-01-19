type AnArray<T> = T[] | ReadonlyArray<T>

export const arrayFlatten = <T>(
  arrays: AnArray<AnArray<T>>
): ReadonlyArray<T> => {
  const out: T[] = []
  return out.concat(...arrays)
}

export const arrayToUnnamed = <V>(
  array: AnArray<{ [_: string]: V }>
): { [_: string]: V } => {
  let out: { [_: string]: V } = {}

  for (const o of array) {
    out = { ...out, ...o }
  }

  return out
}

export const arrayInsert = <T>(
  array: AnArray<T>,
  item: T,
  index: number
): ReadonlyArray<T> => {
  const newArray = array.slice()
  newArray.splice(index, 0, item)
  return newArray
}

export const arrayRemove = <T>(array: AnArray<T>, index: number): T[] => [
  ...array.slice(0, index),
  ...array.slice(index + 1)
]

export const arrayUpdate = <T>(
  array: AnArray<T>,
  item: T,
  index: number
): T[] => [...array.slice(0, index), item, ...array.slice(index + 1)]

export const arrayUnique = <T>(array: AnArray<T>): ReadonlyArray<T> =>
  array.filter((v, i, a) => a.indexOf(v) === i)
