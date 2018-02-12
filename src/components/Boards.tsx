import * as React from 'react'
import { observer } from 'mobx-react'
import { Card, Icon } from 'antd'
import styled from 'styled-components'
import { space } from 'styled-system'
import { Text } from './'

const Grid = styled(Card.Grid)`
  width: 24% !important;
  margin: 0.5% !important;
  padding: 0 !important;
  ${space}
`

const Board = observer(({store, board}) => (
  <Grid>
    <Card
      actions={[
        <Icon key="edit" onClick={() => board.setShowForm(true)} type="edit" />, 
        <Icon key="delete" onClick={board.delete} type="delete" />
      ]}
    >
    <Text align="center" fontSize={4} ><h1>{board.name}</h1></Text>
    {/*TODO input field */}
    </Card>
  </Grid>
))

export const Boards = observer(({store}) => (
  <Card title="Boards">
  {store.boards.values().map(board => 
    <Board key={board.id} board={board} store={store} />
  )}
  </Card>
))
