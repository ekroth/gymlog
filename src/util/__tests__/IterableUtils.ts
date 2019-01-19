import {
  iterableFlatten,
  iterableInsert,
  iterableRemove,
  iterableToUnnamed,
  iterableUnique,
  iterableUpdate
} from '../IterableUtils'

test('iterableInsert', () => {
  expect(iterableInsert([], 1, 0)).toEqual([1])
  expect(iterableInsert([1, 2, 3], 10, 1)).toEqual([1, 10, 2, 3])
})

test('iterableRemove', () => {
  expect(iterableRemove([], 0)).toEqual([])
  expect(iterableRemove([1, 2, 3], 0)).toEqual([2, 3])
  expect(iterableRemove([1, 2, 3], 1)).toEqual([1, 3])
})

test('iterableUpdate', () => {
  expect(iterableUpdate([], 1, 0)).toEqual([1])
  expect(iterableUpdate([1, 2, 3], 10, 1)).toEqual([1, 10, 3])
})

test('iterableUnique', () => {
  expect(iterableUnique([])).toEqual([])
  expect(iterableUnique([1, 2])).toEqual([1, 2])
  expect(iterableUnique([1, 1, 2, 3, 2, 3])).toEqual([1, 2, 3])
})

test('iterableFlatten', () => {
  expect(iterableFlatten([])).toEqual([])
  expect(iterableFlatten([[]])).toEqual([])
  expect(iterableFlatten([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6])
})

test('iterableToUnnamed', () => {
  expect(iterableToUnnamed([])).toEqual({})
  expect(iterableToUnnamed([{ ['a']: 1 }])).toEqual({ ['a']: 1 })
  expect(iterableToUnnamed([{ ['a']: 1 }, { ['b']: 2 }])).toEqual({
    ['a']: 1,
    ['b']: 2
  })
})
