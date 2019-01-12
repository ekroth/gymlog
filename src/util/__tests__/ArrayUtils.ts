import { arrayInsert, arrayRemove, arrayUpdate } from '../ArrayUtils'

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
