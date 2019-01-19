import { dateSameDay } from '../DateUtils'

test('dateSameDay', () => {
  expect(
    dateSameDay(new Date('2019-01-01'), new Date('2019-01-01'))
  ).toBeTruthy()

  expect(
    dateSameDay(
      new Date('2019-01-01T01:00:00'),
      new Date('2019-01-01T02:00:00')
    )
  ).toBeTruthy()

  expect(
    dateSameDay(new Date('2019-01-01'), new Date('2019-01-02'))
  ).toBeFalsy()
})
