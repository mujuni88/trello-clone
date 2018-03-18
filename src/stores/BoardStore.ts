import { action, observable, ObservableMap, autorun } from 'mobx'
import { Board, BoardJSON } from 'stores/models'
import { LocalStorage } from 'stores'

export class BoardStore {
  @observable 
  showCreationForm: boolean = false

  @observable 
  showRenameForm: boolean = false

  @observable
  editedBoard: Board

  @observable 
  boards: ObservableMap<Board> = observable.map()

  constructor() {
    if (!!LocalStorage.getItem('boards')) {
      const boards = LocalStorage.getItem('boards')

      Object.entries(boards).forEach(([key, value]) => 
        this.createBoard(value)
      )
    }
    autorun('Store boardstore', () => {
      if (this.boards.size) {
        LocalStorage.setItem('boards', this.boards)
      } else {
        LocalStorage.removeItem('boards')
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

  @action createBoard = (json: BoardJSON) => {
    const board = new Board({json, store: this}) 
    this.boards.set(board.id, board)

    if ( this.showCreationForm) { this.toggleCreationForm()}
  }

  @action editBoard = (board: Board) => {
    this.setEditedBoard(board)
    this.toggleRenameForm()
  }

  @action deleteBoard = (board) => {
    this.boards.delete(board.id)
  }

  toJSON = () => {
    return this.boards.toJSON()
  }
}
