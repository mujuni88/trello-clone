import * as React from 'react'
import { observer } from 'mobx-react'
import { Card, Icon, Popconfirm } from 'antd'
import styled from 'styled-components'
import { space } from 'styled-system'
import { isEmpty } from 'lodash/fp'
import { Text } from './'
import { List, Board } from 'stores/models'
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

interface ListProps extends RouteComponentProps<RouteProps> {
  store: Board;
  list: List;
}

const ListCard: React.SFC<ListProps> = ({store, list, match}) => (
  <Grid>
    <Card
      actions={[
        <Icon key="edit" onClick={() => store.editList(list)} type="edit" />,
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

    <Link to={`${match.url}/lists/${list.id}`}>
      <Text 
        align="center" 
        fontSize={6}
        fontWeight="bold"
        color="text"
      >
        {list.name}
      </Text>
    </Link>
    </Card>
  </Grid>
)

const ListWithRouter = withRouter(observer(ListCard))

export const Lists = observer(({ store }) => (
  <div>
    {store.lists.values().map((list) => <ListWithRouter key={list.id} list={list} store={store} />)}
    {isEmpty(store.lists.values()) && <Text>No Lists created</Text>}
  </div>
))
