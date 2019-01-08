import React from 'react'
import { Button, Text, Grid, Row, Left, Right, Col, Input } from 'native-base'
import { NumberInput } from './NumberInput'

type SetChooserProps = {
  onSetWeight: (weight: number) => void
  onSetReps: (weight: number) => void
  onSave: () => void

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
      <Button onPress={props.onSave}>
        <Text>Add</Text>
      </Button>
    </Row>
  </Grid>
)
