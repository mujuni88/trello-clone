/* tslint:disable:no-any */

import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import { Flex, Boards } from 'components'
import { isEmpty } from 'lodash/fp'

@inject('boardStore')
@observer
export class BoardsContainer extends React.Component<any, any> {
  render() {
    const { boardStore } = this.props
    return (
      <Flex flexDirection="column">
        <Flex mt={4} mb={2} p={2}>
          <Button type="primary" size="large" onClick={() => boardStore.createBoard('test')}>Create a Board</Button>
        </Flex>
        <Flex flexDirection="column" p={2}>
          {!isEmpty(boardStore.boards.values()) && <Boards store={boardStore} />}
        </Flex>
      </Flex>
    )
  }
}
