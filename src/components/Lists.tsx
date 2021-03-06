import * as React from 'react'
import { observer } from 'mobx-react'
import { Card, Icon, Popconfirm, Button } from 'antd'
import styled from 'styled-components'
import { space } from 'styled-system'
import { isEmpty } from 'lodash/fp'
import { Text, Card as CardComponent, CardForm } from './'
import { List, Board } from 'stores/models'

const Grid = styled(Card.Grid)`
  width: 24% !important;
  margin: 1% 1% 1% 0% !important;
  padding: 0 !important;
  background: #fff;
  ${space}

  & .ant-card-body {
    padding: 12px;
  }
`

interface ListProps {
  store: Board
  list: List
}

const ListCard: React.SFC<ListProps> = observer(({ store, list }) => (
  <Grid>
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
  </Grid>
))

export const Lists = observer(({ store }) => (
  <div>
    {store.lists.values().map((list) => <ListCard key={list.id} list={list} store={store} />)}
    {isEmpty(store.lists.values()) && <Text>No Lists created</Text>}
  </div>
))
