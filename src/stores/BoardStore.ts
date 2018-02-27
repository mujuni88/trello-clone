import { action, observable, ObservableMap, autorun } from 'mobx'
import { serializable, list, object, reference, serialize, deserialize } from 'serializr'
import { Board } from 'stores/models'

export class BoardStore {
  @serializable
  @observable 
  showCreationForm: boolean = false

  @serializable
  @observable 
  showRenameForm: boolean = false

  @serializable(reference(Board))
  @observable
  editedBoard: Board

  @serializable(list(object(Board)))
  @observable 
  boards: ObservableMap<Board> = observable.map()

  contructor() {
    if (this.boards.size === 0) {
      const boardStore =  window.localStorage.getItem('boardStore')
      if (boardStore) {
        deserialize(BoardStore, boardStore)
      }
    }

    autorun('auto save board store', () => {
      if (this.boards.size > 0) {
        window.localStorage.setItem('boardStore', serialize(this))
      }     
    })
  }
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

  @action createBoard = (name) => {
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