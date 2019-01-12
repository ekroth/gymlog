import React from 'react'
import { shallow } from 'enzyme'
import { SetModifierComponent } from '../SetModifier'
import {
  ExerciseModifierComponent,
  ExerciseModifierProps
} from '../ExerciseModifier'

describe('ExerciseModifier', () => {
  describe('rendering', () => {
    it('should match snapshot for zero sets', () => {
      const props: ExerciseModifierProps = {
        sets: []
      }
      const wrapper = shallow(<ExerciseModifierComponent {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    const sharedProps: ExerciseModifierProps = {
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
      const wrapper = shallow(<ExerciseModifierComponent {...sharedProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should call callback when adding a set', () => {
      const cb = jest.fn()

      const props: ExerciseModifierProps = {
        onAddSet: cb,
        ...sharedProps
      }

      const wrapper = shallow(<ExerciseModifierComponent {...props} />)
      wrapper
        .find(SetModifierComponent)
        .first()
        .props().onLeftButtonPress!()

      expect(cb.mock.calls.length).toEqual(1)
    })

    it('should be able to clear the current set weights', () => {
      const wrapper = shallow(<ExerciseModifierComponent {...sharedProps} />)
      wrapper
        .find(SetModifierComponent)
        .first()
        .props().onRightButtonPress!()

      expect(
        (wrapper.instance() as ExerciseModifierComponent).state.current
      ).toEqual({ reps: 0, weight: 0 })
    })

    it('should call callback when deleting a set', () => {
      const cb = jest.fn()

      const props: ExerciseModifierProps = {
        onDeleteSet: cb,
        selected: 1,
        ...sharedProps
      }

      const wrapper = shallow(<ExerciseModifierComponent {...props} />)
      wrapper
        .find(SetModifierComponent)
        .first()
        .props().onRightButtonPress!()

      expect(cb.mock.calls).toEqual([[props.selected]])
      expect(
        (wrapper.instance() as ExerciseModifierComponent).state.selected
      ).toBeUndefined()
    })

    it('should call callback when modifying a set', () => {
      const cb = jest.fn()

      const props: ExerciseModifierProps = {
        onModifySet: cb,
        selected: 1,
        ...sharedProps
      }

      const wrapper = shallow(<ExerciseModifierComponent {...props} />)
      wrapper
        .find(SetModifierComponent)
        .first()
        .props().onLeftButtonPress!()

      expect(cb.mock.calls).toEqual([[props.selected, props.initSet]])
      expect(
        (wrapper.instance() as ExerciseModifierComponent).state.selected
      ).toBeUndefined()
    })
  })
})
