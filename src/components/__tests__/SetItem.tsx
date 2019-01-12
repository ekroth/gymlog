import React from 'react'
import { shallow } from 'enzyme'
import { SetItemComponent, SetItemProps } from '../SetItem'
import { ListItem } from 'native-base'

describe('SetItem', () => {
  describe('rendering', () => {
    it('should match snapshot', () => {
      const props: SetItemProps = {
        index: 0,
        selected: false,
        set: { weight: 150, reps: 5 }
      }
      const wrapper = shallow(<SetItemComponent {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should invoke callback on press', () => {
      const callback = jest.fn()
      const props: SetItemProps = {
        index: 0,
        onPress: callback,
        selected: false,
        set: { weight: 150, reps: 5 }
      }
      const wrapper = shallow(<SetItemComponent {...props} />)
      wrapper
        .find(ListItem)
        .first()
        .props().onPress!(jest.genMockFromModule('react-native'))

      expect(callback.mock.calls.length).toBe(1)
    })
  })
})
