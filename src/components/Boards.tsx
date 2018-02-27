import * as React from 'react'
import { observer } from 'mobx-react'
import { Card, Icon, Popconfirm } from 'antd'
import styled from 'styled-components'
import { space } from 'styled-system'
import { isEmpty } from 'lodash/fp'
import { Text } from './'
import { BoardStore } from 'stores'
import { Board } from 'stores/models'
import { withRouter, RouteComponentProps, RouteProps } from 'react-router'
import { Link as RouteLink } from 'react-router-dom'

const Link = styled(RouteLink)`
  &:hover{
    text-decoration: underline;
  }
`
const Grid = styled(Card.Grid)`
  width: 24% !important;
  margin: 1% 1% 1% 0% !important;
  padding: 0 !important;
  background: #fff;
  ${space}
`

interface BoardProps extends RouteComponentProps<RouteProps> {
  store: BoardStore;
  board: Board;
}

const BoardCard: React.SFC<BoardProps> = ({ store, board }) => (
  <Grid>
    <Card
      actions={[
        <Icon key="edit" onClick={() => store.editBoard(board)} type="edit" />,
        <Popconfirm
          key="delete" 
          title="Are you sure?"
          onConfirm={board.delete}
          okText="Delete Board"
        >
          <Icon type="delete" />
        </Popconfirm>
      ]}
    >

    <Link to={`/boards/${board.id}`}>
      <Text 
        align="center" 
        fontSize={6}
        fontWeight="bold"
        color="text"
      >
        {board.name}
      </Text>
    </Link>
    </Card>
  </Grid>
)

const BoardWithRouter = withRouter(observer(BoardCard))

export const Boards = observer(({ store }) => (
  <div>
    {store.boards.values().list((board) => <BoardWithRouter key={board.id} board={board} store={store} />)}
    {isEmpty(store.boards.values()) && <Text>No boards created</Text>}
  </div>
))
