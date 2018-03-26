import * as React from 'react'
import { observer } from 'mobx-react'
import { Card, Icon, Popconfirm, Button } from 'antd'
import styled from 'styled-components'
import { space } from 'styled-system'
import { isEmpty } from 'lodash/fp'
import { Text, Card as CardComponent, CardForm } from './'
import { List, Board } from 'stores/models'
import {
  DropTarget,
  DropTargetSpec,
  DropTargetCollector,
  ConnectDropTarget
} from 'react-dnd'
import { ItemTypes } from 'utils'

const Grid = styled(Card.Grid)`
  width: 24% !important;
  margin: 1% 1% 1% 0% !important;
  padding: 0 !important;
  background: #fff;
  float: none !important;
  ${space} & .ant-card-body {
    padding: 12px;
  }
`
const listTarget: DropTargetSpec<ListProps> = {
  canDrop: ({ index }: ListProps) => {
    return 2 % index === 0
  },
  drop: ({ list }: ListProps) => {
    console.log('list %o', list) // tslint:disable-line
  }
}

const collect: DropTargetCollector = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

interface ListProps {
  store: Board
  list: List
  index: number
  connectDropTarget?: ConnectDropTarget
  isOver?: boolean
  canDrop?: boolean
}

const getBgColor = (canDrop, isOver) => {
  console.log('bg', canDrop, isOver) // tslint:disable-line
  switch (`${canDrop}-${isOver}`) {
    case 'true-true':
      return 'inherit'
    case 'true-false':
      return 'green'
    default:
      return 'inherit'
  }
}
const _ListCard: React.SFC<ListProps> = observer(
  ({ store, list, connectDropTarget, canDrop, isOver, index }) => {
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ backgroundColor: getBgColor(canDrop, isOver) }}>
          <Grid>
            <Card
              title={list.name}
              actions={[
                <Icon
                  key="edit"
                  onClick={() => store.editList(list)}
                  type="edit"
                />,
                <Popconfirm
                  key="delete"
                  title="Are you sure?"
                  onConfirm={list.delete}
                  okText="Delete List"
                >
                  <Icon type="delete" />
                </Popconfirm>
              ]}
            >
              {list.orderedCards.map((card, i) => (
                <CardComponent key={card.id} index={i} card={card} />
              ))}
              <br />
              {!list.showCreationForm && (
                <Button
                  onClick={list.toggleCreationForm}
                  type="primary"
                  ghost={true}
                  className="w-full"
                >
                  Add a card
                </Button>
              )}
              {list.showCreationForm && (
                <CardForm
                  onSubmit={name => list.createCard({ name })}
                  onCancel={list.toggleCreationForm}
                />
              )}
            </Card>
          </Grid>
        </div>
      )
    )
  }
)

const ListCard = DropTarget(ItemTypes.LIST, listTarget, collect)(_ListCard)

export const Lists = observer(({ store }) => (
  <div>
    {store.lists
      .values()
      .map((list, i) => (
        <ListCard key={list.id} index={i} list={list} store={store} />
      ))}
    {isEmpty(store.lists.values()) && <Text>No Lists created</Text>}
  </div>
))
