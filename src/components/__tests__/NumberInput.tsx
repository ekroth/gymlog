import { shallow } from 'enzyme'
import { Input } from 'native-base'
import React from 'react'
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'

import { NumberInputComponent, NumberInputProps } from '../NumberInput'

describe('NumberInput', () => {
  describe('rendering', () => {
    it('should match snapshot', () => {
      const props: NumberInputProps = {
        minValue: 0,
        step: 1,
        type: 'real',
        value: 100
      }
      const wrapper = shallow(<NumberInputComponent {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should call callback when receiving valid values otherwise old value', () => {
      const callback = jest.fn()

      const event1 = {
        nativeEvent: {
          text: '120'
        }
      } as NativeSyntheticEvent<TextInputSubmitEditingEventData>

      const event2 = {
        nativeEvent: {
          text: 'abc'
        }
      } as NativeSyntheticEvent<TextInputSubmitEditingEventData>

      const props: NumberInputProps = {
        minValue: 0,
        onChange: callback,
        step: 1,
        type: 'real',
        value: 120
      }
      const wrapper = shallow(<NumberInputComponent {...props} />)
      const input = wrapper.find(Input).first()

      input.props().onSubmitEditing!(event1)
      input.props().onSubmitEditing!(event2)

      expect(callback.mock.calls).toEqual([[120], [120]])
    })
  })
})
