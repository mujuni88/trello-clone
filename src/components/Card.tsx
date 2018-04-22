import * as React from 'react'
import { ifProp } from 'styled-tools'
import { observer } from 'mobx-react'
import { Button } from 'antd'
import { Flex, Text, Box } from './'
import { Card as CardModel } from 'stores/models'
import { Draggable } from 'react-beautiful-dnd'

const Wrapper = Flex.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 6px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  text-decoration: none;
  background-color: #c0e0ff;

  ${ifProp( 'isDragging', `
    background-color: limegreen;
  `)}

  ${ifProp( 'isComplete', `
    opacity: 0.35;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 6px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    text-decoration: line-through;
    background-color: rgb(222, 202, 255); 
  `
  )};
`

export const Card = observer(({ card }: { card: CardModel }) => (
  <Draggable draggableId={card.id}>
    {(provided, snapshot) =>
      <Wrapper 
        isComplete={card.isComplete}
        px={2}
        py={3}
        mb={3}
        innerRef={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={provided.draggableProps.style}
        isDragging={snapshot.isDragging}
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
    }
  </Draggable>
))
