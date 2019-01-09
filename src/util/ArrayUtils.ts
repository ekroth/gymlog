export const arrayInsert = <T>(array: T[], item: T, index: number): T[] => {
  const newArray = array.slice()
  newArray.splice(index, 0, item)
  return newArray
}

export const arrayRemove = <T>(array: T[], index: number): T[] => [
  ...array.slice(0, index),
  ...array.slice(index + 1)
]

export const arrayUpdate = <T>(array: T[], item: T, index: number): T[] => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1)
]
