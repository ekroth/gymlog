type AnArray<T> = T[] | ReadonlyArray<T>

export const arrayFlatten = <T>(
  arrays: AnArray<ConcatArray<T>>
): ReadonlyArray<T> => {
  const out: T[] = []
  return out.concat(...arrays)
}

export const arrayToUnnamed = <V>(
  array: AnArray<{ [_: string]: V }>
): { [_: string]: V } => array.reduce((o, v) => ({ ...o, ...v }), {})

export const arrayInsert = <T>(
  array: AnArray<T>,
  item: T,
  index: number
): ReadonlyArray<T> => {
  const newArray = array.slice()
  newArray.splice(index, 0, item)
  return newArray
}

export const arrayRemove = <T>(
  array: AnArray<T>,
  index: number
): ReadonlyArray<T> => [...array.slice(0, index), ...array.slice(index + 1)]

export const arrayUpdate = <T>(
  array: AnArray<T>,
  item: T,
  index: number
): ReadonlyArray<T> => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1)
]

export const arrayUnique = <T>(array: AnArray<T>): ReadonlyArray<T> =>
  array.filter((v, i, a) => a.indexOf(v) === i)
