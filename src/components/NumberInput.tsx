import React from 'react'
import { Button, Grid, Col, Input, Icon } from 'native-base'
import { callback1 } from '../util/Callbacks'

export type NumberInputProps = {
  onChange?: (value: number) => void
  value: number
  step: number
  minValue: number
  type: 'number' | 'real'
}

export const NumberInputComponent = (props: NumberInputProps) => (
  <Grid style={{ alignItems: 'center' }}>
    <Col style={{ minWidth: 20 }}>
      <Button
        style={{ alignSelf: 'center', backgroundColor: 'grey' }}
        onPress={() =>
          callback1(
            props.onChange,
            Math.max(props.minValue, props.value - props.step)
          )
        }
      >
        <Icon name={'remove'} />
      </Button>
    </Col>
    <Col size={4}>
      <Input
        style={{
          alignSelf: 'stretch',
          fontSize: 40,
          textAlign: 'center',
          textAlignVertical: 'center'
        }}
        returnKeyType={'done'}
        defaultValue={`${props.value}`}
        keyboardType={'decimal-pad'}
        onSubmitEditing={event => {
          const n =
            props.type === 'number'
              ? parseFloat(event.nativeEvent.text)
              : parseInt(event.nativeEvent.text, 10)

          if (!Number.isNaN(n)) {
            callback1(props.onChange, n)
          } else {
            callback1(props.onChange, props.value)
          }
        }}
      />
    </Col>
    <Col style={{ minWidth: 20 }}>
      <Button
        style={{ alignSelf: 'center', backgroundColor: 'green' }}
        onPress={() => callback1(props.onChange, props.value + props.step)}
      >
        <Icon name={'add'} />
      </Button>
    </Col>
  </Grid>
)
