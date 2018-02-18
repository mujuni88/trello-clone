import { action, observable, ObservableMap } from 'mobx'
import { Board } from 'stores/models'

interface Values {
  boardName: string
}
export class BoardStore {
  @observable 
  showCreationForm: boolean = false

  @observable 
  showRenameForm: boolean = false

  @observable
  editedBoard: Board

  @observable 
  boards: ObservableMap<Board> = observable.map()

  // Actions
  @action setEditedBoard = (board: Board) => {
    this.editedBoard = board
  }

  @action toggleRenameForm = () => {
    this.showRenameForm = !this.showRenameForm
  }

  @action toggleCreationForm = () => {
    this.showCreationForm = !this.showCreationForm
  }

  @action createBoard = ({boardName: name}: Values) => {
    const board = new Board({name, store: this}) 
    this.boards.set(board.id, board)

    this.toggleCreationForm()
  }

  @action editBoard = (board: Board) => {
    this.setEditedBoard(board)
    this.toggleRenameForm()
  }

  @action deleteBoard = (board) => {
    this.boards.delete(board.id)
  }
}
