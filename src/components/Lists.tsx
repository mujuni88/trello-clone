import * as React from 'react'
import { Card, Icon, Popconfirm, Button } from 'antd'
import { isEmpty } from 'lodash/fp'
import { Text, Card as CardComponent, CardForm } from './'
import { List, Board } from 'stores/models'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface ListProps {
  store: Board
  list: List,
  index: number
}

class ListCard extends React.Component<ListProps, {}> {
  render() {
    const { store, list, index } = this.props
    return (
      <Draggable key={list.id} draggableId={list.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={getItemStyle(snapshot.isDragging)}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          >
            <Card
              title={list.name}
              actions={[
                <Icon key="edit" onClick={() => store.editList(list)} type="edit" />,
                <Popconfirm key="delete" title="Are you sure?" onConfirm={list.delete} okText="Delete List">
                  <Icon type="delete" />
                </Popconfirm>
              ]}
            >
              {list.cards.values().map((card) => <CardComponent key={card.id} card={card} />)}
              <br />
              {!list.showCreationForm && (
                <Button onClick={list.toggleCreationForm} type="primary" ghost={true} className="w-full">
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
          </div>
        )}
      </Draggable>
    )
  }
}

export class Lists extends React.Component<{store: Board}, {}> {
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.props.store.reorderLists(
      result.source.index,
      result.destination.index
    )
  }

  renderListCard = (store) => (list, index) => (
    <ListCard key={list.id} list={list} store={store} index={index} />
  )

  render() {
    const { store } = this.props
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="lists">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={getListStyle(snapshot.isDraggingOver)}
          >
            {store.lists.values().map(this.renderListCard(store))}
            {isEmpty(store.lists.values()) && <Text>No Lists created</Text>}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      </DragDropContext>
    )
  }
}

function getListStyle(isDraggingOver: Boolean) {
 return isDraggingOver ? 'blue' : ''
}

function getItemStyle(isDragging: Boolean) {
 return isDragging ? 'bg bg-info' : ''
}
