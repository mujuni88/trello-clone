import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import { Text, Flex, GenericForm, BoardFormModal, Lists } from 'components'
import { BoardStore } from 'stores'
import { RouteComponentProps, RouteProps, Redirect } from 'react-router'

interface MatchParams {
  boardId: string
}

interface BoardContainerProp extends RouteComponentProps<RouteProps & MatchParams> {
  boardStore: BoardStore
}

@inject('boardStore')
@observer
export class BoardContainer extends React.Component<BoardContainerProp, {}> {
  render() {
    const { match, boardStore } = this.props
    const board = boardStore.boards.get(match.params.boardId)

    if (!board) {
      return <Redirect to={{ pathname: '/' }} />
    }

    const { editedList } = board
    return (
      <Flex flexDirection="column">
        <Text 
          align="center" 
          fontSize={6} 
          fontWeight="bold" 
          color="text" 
          mt={2}
        >
          {board.name}
        </Text>

        <Flex mt={4} mb={2} p={2}>
          <Button type="primary" size="large" onClick={() => board.toggleCreationForm()}>
            Add a List...
          </Button>
        </Flex>
        <Flex flexDirection="column" p={2}>
          <Lists store={board} />
        </Flex>

        <BoardFormModal visible={board.showCreationForm} onCancel={board.toggleCreationForm}>
          <GenericForm
            actionButtonText="Create List"
            inputPlaceholder="List name"
            errorMessage="Please enter a list name"
            onSubmit={board.createList}
          />
        </BoardFormModal>
        <BoardFormModal visible={board.showRenameForm} onCancel={board.toggleRenameForm}>
          {editedList && (
            <GenericForm
              actionButtonText="Rename List"
              inputPlaceholder="List name"
              errorMessage="Please enter a list name"
              initialValue={editedList ? editedList.name : ''}
              onSubmit={editedList && editedList.rename}
            />
          )}
        </BoardFormModal>
      </Flex>
    )
  }
}
