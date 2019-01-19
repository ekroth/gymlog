import { isArray } from 'util'

export const iterableFlatten = <T>(
  iterables: Iterable<Iterable<T>>
): ReadonlyArray<T> => {
  const arr = []

  for (const it of iterables) {
    for (const v of it) {
      arr.push(v)
    }
  }

  return arr
}

const err = <T>(iterable: Iterable<T>) => {
  throw new Error(`Iterable of type ${typeof iterable} is not supported`)
}

export const iterableInsert = <T>(
  iterable: Iterable<T>,
  item: T,
  index: number
): ReadonlyArray<T> => {
  if (isArray(iterable)) {
    return arrayInsert(iterable as T[], item, index)
  }

  return err(iterable)
}

export const iterableRemove = <T>(
  iterable: Iterable<T>,
  index: number
): ReadonlyArray<T> => {
  if (isArray(iterable)) {
    return arrayRemove(iterable as T[], index)
  }

  return err(iterable)
}

export const iterableUpdate = <T>(
  iterable: Iterable<T>,
  item: T,
  index: number
): ReadonlyArray<T> => {
  if (isArray(iterable)) {
    return arrayUpdate(iterable as T[], item, index)
  }

  return err(iterable)
}

export const iterableUnique = <T>(iterable: Iterable<T>): ReadonlyArray<T> => {
  if (isArray(iterable)) {
    return arrayUnique(iterable as T[])
  }

  return err(iterable)
}

/* Private array implementations */

const arrayInsert = <T>(array: T[], item: T, index: number): T[] => {
  const newArray = array.slice()
  newArray.splice(index, 0, item)
  return newArray
}

const arrayRemove = <T>(array: T[], index: number): T[] => [
  ...array.slice(0, index),
  ...array.slice(index + 1)
]

const arrayUpdate = <T>(array: T[], item: T, index: number): T[] => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1)
]

const arrayUnique = <T>(array: ReadonlyArray<T>): ReadonlyArray<T> =>
  array.filter((v, i, a) => a.indexOf(v) === i)
