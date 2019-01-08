import React from 'react'
import { FlatList } from 'react-native'
import Set from '../model/Set'
import { ListItem, Text, Grid, Subtitle, Col, Row } from 'native-base'
import { SetChooserComponent } from './SetChooser'

type SetHandlerProps = {
  onAddCurrent: () => void
  onModifyCurrent: (set: Set) => void

  current: Set
  sets: Set[]
}

type SetItemProps = {
  index: number
  set: Set
}

const SetItemComponent = ({ index, set }: SetItemProps) => (
  <ListItem>
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

export const SetHandlerComponent = (props: SetHandlerProps) => (
  <Grid>
    <Row size={40}>
      <SetChooserComponent
        onSetReps={reps =>
          props.onModifyCurrent({ reps, weight: props.current.weight })
        }
        onSetWeight={weight =>
          props.onModifyCurrent({ weight, reps: props.current.reps })
        }
        onSave={props.onAddCurrent}
        initWeight={props.current.weight}
        initReps={props.current.reps}
      />
    </Row>
    <Row size={60} style={{ backgroundColor: 'skyblue' }}>
      <FlatList<Set>
        data={props.sets}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item, index }) => (
          <SetItemComponent index={index} set={item} />
        )}
      />
    </Row>
  </Grid>
)
