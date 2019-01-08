import React, { PureComponent } from 'react'
import { FlatList } from 'react-native'
import Set from '../model/Set'
import { ListItem, Text, Grid, Subtitle, Col, Row } from 'native-base'
import { SetChooserComponent } from './SetChooser'

type SetItemProps = {
  onPress: () => void
  index: number
  set: Set
  selected: boolean
}

const SetItemComponent = ({ onPress, index, set, selected }: SetItemProps) => (
  <ListItem
    onPress={onPress}
    style={{ backgroundColor: selected === true ? 'skyblue' : 'white' }}
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

type SetHandlerProps = {
  onAddSet: (set: Set) => void
  onDeleteSet: (index: number) => void
  onModifySet: (index: number, set: Set) => void

  initSet?: Set
  sets: Set[]
}

type SetHandlerState = {
  current: Set
  selected?: number
}

export class SetHandlerComponent extends PureComponent<
  SetHandlerProps,
  SetHandlerState
> {
  private onSelectItems: Array<() => void>

  constructor(props: SetHandlerProps) {
    super(props)
    this.state = {
      current: props.initSet || { weight: 0, reps: 0 },
      selected: undefined
    }
    this.onSelectItems = props.sets.map((set, index) => () =>
      this.setState({
        current: set,
        selected: index
      })
    )
  }

  public render() {
    return (
      <Grid>
        <Row size={40}>
          <SetChooserComponent
            onSetReps={this.onSetReps}
            onSetWeight={this.onSetWeight}
            onLeftButtonPress={this.onLeftButtonPress}
            onRightButtonPress={this.onRightButtonPress}
            leftButtonText={
              this.state.selected === undefined ? 'Add' : 'Modify'
            }
            rightButtonText={
              this.state.selected === undefined ? 'Clear' : 'Delete'
            }
            initWeight={this.state.current.weight}
            initReps={this.state.current.reps}
          />
        </Row>
        <Row size={60}>
          <FlatList<Set>
            data={this.props.sets}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item, index }) => (
              <SetItemComponent
                index={index}
                set={item}
                selected={this.state.selected === index}
                onPress={this.onSelectItems[index]}
              />
            )}
          />
        </Row>
      </Grid>
    )
  }

  private onSetReps = (reps: number) => {
    this.setState(state => ({
      current: { reps, weight: state.current.weight },
      selected: state.selected
    }))
  }

  private onSetWeight = (weight: number) => {
    this.setState(state => ({
      current: { weight, reps: this.state.current.reps },
      selected: this.state.selected
    }))
  }

  private onLeftButtonPress = () => {
    if (this.state.selected === undefined) {
      this.props.onAddSet(this.state.current)
    } else {
      this.setState({
        current: this.state.current,
        selected: undefined
      })
      this.props.onModifySet(this.state.selected, this.state.current)
    }
  }

  private onRightButtonPress = () => {
    if (this.state.selected === undefined) {
      this.setState({
        current: { weight: 0, reps: 0 },
        selected: undefined
      })
    } else {
      this.setState({
        current: this.state.current,
        selected: undefined
      })
      this.props.onDeleteSet(this.state.selected)
    }
  }
}
