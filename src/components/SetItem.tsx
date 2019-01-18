import { Col, Grid, ListItem, Subtitle, Text } from 'native-base'
import React from 'react'

import Set from '../model/Set'

export type SetItemProps = {
  onPress?: () => void
  index: number
  set: Set
  selected: boolean
}

export const SetItemComponent = ({
  onPress,
  index,
  set,
  selected
}: SetItemProps) => (
  <ListItem
    onPress={onPress}
    style={{ backgroundColor: selected ? 'skyblue' : 'white' }}
  >
    <Grid>
      <Col size={20}>
        <Text style={{ fontWeight: 'bold' }}>{index}</Text>
      </Col>
      <Col size={60}>
        <Grid>
          <Col>
            <Text style={{ alignSelf: 'flex-end', fontWeight: 'bold' }}>
              {set.weight}
            </Text>
          </Col>
          <Col>
            <Subtitle style={{ alignSelf: 'flex-start' }}>kgs</Subtitle>
          </Col>
        </Grid>
      </Col>
      <Col size={10}>
        <Text style={{ alignSelf: 'flex-end', fontWeight: 'bold' }}>
          {set.reps}
        </Text>
      </Col>
      <Col size={10}>
        <Subtitle style={{ alignSelf: 'flex-start' }}>reps</Subtitle>
      </Col>
    </Grid>
  </ListItem>
)
