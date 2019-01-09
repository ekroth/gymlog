export const arrayInsert = <T>(
  array: ReadonlyArray<T>,
  item: T,
  index: number
): ReadonlyArray<T> => {
  const newArray = array.slice()
  newArray.splice(index, 0, item)
  return newArray
}

export const arrayRemove = <T>(
  array: ReadonlyArray<T>,
  index: number
): ReadonlyArray<T> => [...array.slice(0, index), ...array.slice(index + 1)]

export const arrayUpdate = <T>(
  array: ReadonlyArray<T>,
  item: T,
  index: number
): ReadonlyArray<T> => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1)
]
