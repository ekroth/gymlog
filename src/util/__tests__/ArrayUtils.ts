import {
  arrayFlatten,
  arrayInsert,
  arrayRemove,
  arrayToUnnamed,
  arrayUnique,
  arrayUpdate
} from '../ArrayUtils'

test('arrayInsert', () => {
  expect(arrayInsert([], 1, 0)).toEqual([1])
  expect(arrayInsert([1, 2, 3], 10, 1)).toEqual([1, 10, 2, 3])
})

test('arrayRemove', () => {
  expect(arrayRemove([], 0)).toEqual([])
  expect(arrayRemove([1, 2, 3], 0)).toEqual([2, 3])
  expect(arrayRemove([1, 2, 3], 1)).toEqual([1, 3])
})

test('arrayUpdate', () => {
  expect(arrayUpdate([], 1, 0)).toEqual([1])
  expect(arrayUpdate([1, 2, 3], 10, 1)).toEqual([1, 10, 3])
})

test('arrayUnique', () => {
  expect(arrayUnique([])).toEqual([])
  expect(arrayUnique([1, 2])).toEqual([1, 2])
  expect(arrayUnique([1, 1, 2, 3, 2, 3])).toEqual([1, 2, 3])
})

test('arrayFlatten', () => {
  expect(arrayFlatten([])).toEqual([])
  expect(arrayFlatten([[]])).toEqual([])
  expect(arrayFlatten([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6])
})

test('arrayToUnnamed', () => {
  expect(arrayToUnnamed([])).toEqual({})
  expect(arrayToUnnamed([{ ['a']: 1 }])).toEqual({ ['a']: 1 })
  expect(arrayToUnnamed([{ ['a']: 1 }, { ['b']: 2 }])).toEqual({
    ['a']: 1,
    ['b']: 2
  })
})
