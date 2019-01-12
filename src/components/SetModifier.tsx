import React from 'react'
import { Button, Text, Grid, Row, Col } from 'native-base'
import { NumberInputComponent } from './NumberInput'

type SetModifierProps = {
  onSetWeight?: (weight: number) => void
  onSetReps?: (weight: number) => void

  onLeftButtonPress?: () => void
  onRightButtonPress?: () => void

  leftButtonText: string
  rightButtonText: string

  initWeight: number
  initReps: number
}

export const SetModifierComponent = (props: SetModifierProps) => (
  <Grid style={{ alignItems: 'center' }}>
    <Row>
      <NumberInputComponent
        type={'number'}
        value={props.initWeight}
        onChange={props.onSetWeight}
        step={2.5}
        minValue={0}
      />
    </Row>
    <Row>
      <NumberInputComponent
        type={'real'}
        value={props.initReps}
        onChange={props.onSetReps}
        minValue={0}
        step={1}
      />
    </Row>
    <Row>
      <Col size={1}>
        <Button
          onPress={props.onLeftButtonPress}
          style={{ alignSelf: 'center' }}
        >
          <Text>{props.leftButtonText}</Text>
        </Button>
      </Col>
      <Col size={1}>
        <Button
          onPress={props.onRightButtonPress}
          style={{ alignSelf: 'center' }}
        >
          <Text>{props.rightButtonText}</Text>
        </Button>
      </Col>
    </Row>
  </Grid>
)
