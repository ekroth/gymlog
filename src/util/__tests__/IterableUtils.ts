import {
  iterableInsert,
  iterableRemove,
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
