declare module 'react-native-numeric-input' {
  import { ComponentClass } from 'react'

  // see: https://www.npmjs.com/package/react-native-numeric-input
  interface NumericInputProps {
    value?: number
    minValue?: number
    maxValue?: number
    step?: number
    valueType?: 'real' | 'integer'
    initValue?: number
    iconSize?: number
    borderColor?: string
    iconStyle?: object
    totalWidth?: number
    separatorWidth?: number
    type?: 'plus-minus' | 'up-down'
    rounded?: boolean
    textColor?: string
    containerStyle?: object
    inputStyle?: object
    upDownButtonsBackgroundColor?: string
    rightButtonBackgroundColor?: string
    leftButtonBackgroundColor?: string
    totalHeight?: number
    onChange: (value: number) => void
    editable?: boolean
    validateOnBlur?: boolean
    reachMaxIncIconStyle?: object
    reachMaxDecIconStyle?: object
    reachMinIncIconStyle?: object
    reachMinDecIconStyle?: object
  }

  const NumericInput: ComponentClass<NumericInputProps>
  export default NumericInput
}
