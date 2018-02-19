import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import { Flex, Boards, GenericForm, BoardFormModal } from 'components'
import { BoardStore } from 'stores'  

interface BoardsContainerProp {
  boardStore: BoardStore
}

@inject('boardStore')
@observer
export class BoardsContainer extends React.Component<BoardsContainerProp, {}> {
  render() {
    const { boardStore } = this.props
    const { editedBoard } = boardStore

    return (
      <Flex flexDirection="column">
        <Flex mt={4} mb={2} p={2}>
          <Button type="primary" size="large" onClick={() => boardStore.toggleCreationForm()}>
            Create a Board
          </Button>
        </Flex>
        <Flex flexDirection="column" p={2}>
          {<Boards store={boardStore} />}
        </Flex>
        <BoardFormModal visible={boardStore.showCreationForm} onCancel={boardStore.toggleCreationForm}>
          <GenericForm 
            actionButtonText="Create Board"
            inputPlaceholder="Board name"
            errorMessage="Please enter a board name"
            onSubmit={boardStore.createBoard} 
          />
        </BoardFormModal>
        <br />
        <BoardFormModal visible={boardStore.showRenameForm} onCancel={boardStore.toggleRenameForm}>
          <GenericForm 
            actionButtonText="Rename Board"
            inputPlaceholder="Board name"
            errorMessage="Please enter a board name"
            initialValue={editedBoard ? editedBoard.name : ''}
            onSubmit={editedBoard && editedBoard.rename} 
          />
        </BoardFormModal>
      </Flex>
    )
  }
}
