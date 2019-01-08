import React from 'react'
import { Button, Text, Grid, Row, Left, Right, Col, Input } from 'native-base'
import { NumberInput } from './NumberInput'

type SetChooserProps = {
  onSetWeight: (weight: number) => void
  onSetReps: (weight: number) => void

  onLeftButtonPress: () => void
  onRightButtonPress: () => void

  leftButtonText: string
  rightButtonText: string

  initWeight: number
  initReps: number
}

export const SetChooserComponent = (props: SetChooserProps) => (
  <Grid style={{ alignItems: 'center' }}>
    <Row>
      <NumberInput
        type={'number'}
        value={props.initWeight}
        onChange={props.onSetWeight}
        step={2.5}
        minValue={0}
      />
    </Row>
    <Row>
      <NumberInput
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
