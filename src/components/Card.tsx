  // tslint:disable
import * as React from 'react'
import { ifProp } from 'styled-tools'
import { observer } from 'mobx-react'
import { DragSource, DragSourceSpec, ConnectDragSource, DragSourceCollector } from 'react-dnd'
import { Button } from 'antd'
import { Flex, Text, Box } from './'
import { Card as CardModel } from 'stores/models'
import { ItemTypes } from 'utils'

export interface CardProps {
  index: number
  card: CardModel
  connectDragSource?: ConnectDragSource
  isDragging?: boolean
}

const cardSource: DragSourceSpec<CardProps> = {
  beginDrag({ card, index }: CardProps) {
    return { card, index }
  },

  endDrag(props: CardProps, monitor) {
    if(!monitor) return

    if (!monitor.didDrop()) {
      return
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log('EndDrag %o %o', item, dropResult)
  }
}

const collect: DragSourceCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Wrapper = Flex.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 6px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  text-decoration: none;
  background-color: #c0e0ff;

  ${ifProp(
    'isComplete',
    `
    opacity: 0.35;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 6px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    text-decoration: line-through;
    background-color: rgb(222, 202, 255); 
  `
  )};
`

@observer
class CardItem extends React.Component<CardProps, {}> {
  render() {
    const { card, connectDragSource, isDragging } = this.props

    if (!connectDragSource) {
      return null
    }

    return connectDragSource(
      <div>
        <Wrapper
          style={{
            opacity: isDragging ? 0.5 : 1
          }}
          isComplete={card.isComplete}
          px={2}
          py={3}
          mb={3}
        >
          <Text fontSize={2}>{card.name}</Text>
          <Box display="inline-block" className="ml-2">
            <Button
              className="bg-transparent border-0"
              ghost={true}
              size="small"
              type="primary"
              icon="check"
              onClick={card.toggleComplete}
            />
            <Button
              className="bg-transparent border-0"
              ghost={true}
              size="small"
              type="danger"
              icon="close"
              onClick={card.delete}
            />
          </Box>
        </Wrapper>
      </div>
    )
  }
}

export const Card = DragSource(ItemTypes.CARD, cardSource, collect)(CardItem)
