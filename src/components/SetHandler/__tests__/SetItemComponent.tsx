import React from 'react'
import { shallow } from 'enzyme'
import { SetItemComponent, SetItemProps } from '../SetItemComponent'

describe('SetItemComponent', () => {
  describe('rendering', () => {
    it('should match snapshot', () => {
      const props: SetItemProps = {
        index: 0,
        onPress: () => {
          return
        },
        selected: false,
        set: { weight: 150, reps: 5 }
      }
      const wrapper = shallow(<SetItemComponent {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
