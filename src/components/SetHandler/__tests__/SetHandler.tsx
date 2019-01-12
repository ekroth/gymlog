import React from 'react'
import { shallow } from 'enzyme'
import { SetChooserComponent } from '../../SetChooser'
import { SetHandlerComponent, SetHandlerProps } from '../SetHandler'

describe('SetHandlerComponent', () => {
  describe('rendering', () => {
    it('should match snapshot for zero sets', () => {
      const props: SetHandlerProps = {
        sets: []
      }
      const wrapper = shallow(<SetHandlerComponent {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    const sharedProps: SetHandlerProps = {
      initSet: {
        reps: 1,
        weight: 170
      },
      sets: [
        {
          reps: 5,
          weight: 100
        },
        {
          reps: 2,
          weight: 150
        }
      ]
    }

    it('should match snapshot for multiple sets', () => {
      const wrapper = shallow(<SetHandlerComponent {...sharedProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should call callback when adding a set', () => {
      const cb = jest.fn()

      const props: SetHandlerProps = {
        onAddSet: cb,
        ...sharedProps
      }

      const wrapper = shallow(<SetHandlerComponent {...props} />)
      wrapper
        .find(SetChooserComponent)
        .first()
        .props().onLeftButtonPress!()

      expect(cb.mock.calls.length).toEqual(1)
    })

    it('should be able to clear the current set weights', () => {
      const wrapper = shallow(<SetHandlerComponent {...sharedProps} />)
      wrapper
        .find(SetChooserComponent)
        .first()
        .props().onRightButtonPress!()

      expect((wrapper.instance() as SetHandlerComponent).state.current).toEqual(
        { reps: 0, weight: 0 }
      )
    })

    it('should call callback when deleting a set', () => {
      const cb = jest.fn()

      const props: SetHandlerProps = {
        onDeleteSet: cb,
        selected: 1,
        ...sharedProps
      }

      const wrapper = shallow(<SetHandlerComponent {...props} />)
      wrapper
        .find(SetChooserComponent)
        .first()
        .props().onRightButtonPress!()

      expect(cb.mock.calls).toEqual([[props.selected]])
      expect(
        (wrapper.instance() as SetHandlerComponent).state.selected
      ).toBeUndefined()
    })

    it('should call callback when modifying a set', () => {
      const cb = jest.fn()

      const props: SetHandlerProps = {
        onModifySet: cb,
        selected: 1,
        ...sharedProps
      }

      const wrapper = shallow(<SetHandlerComponent {...props} />)
      wrapper
        .find(SetChooserComponent)
        .first()
        .props().onLeftButtonPress!()

      expect(cb.mock.calls).toEqual([[props.selected, props.initSet]])
      expect(
        (wrapper.instance() as SetHandlerComponent).state.selected
      ).toBeUndefined()
    })
  })
})
