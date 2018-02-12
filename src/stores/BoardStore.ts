import { action, observable, ObservableMap } from 'mobx'
import { setter } from 'mobx-decorators'
import { Board } from 'stores/models'

export class BoardStore {
  @setter 
  @observable 
  showForm = false

  @observable 
  boards: ObservableMap<Board> = observable.map()

  // Actions
  @action createBoard = (name) => {
    const board = new Board({name, store: this}) 
    this.boards.set(board.id, board)
  }

  @action deleteBoard = (board) => {
    this.boards.delete(board.id)
  }
}
