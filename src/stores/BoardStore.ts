import { action, observable, ObservableMap } from 'mobx'
import { Board } from 'stores/models'

export class BoardStore {
  @observable 
  boards: ObservableMap<Board> = observable.map()

  // Actions
  @action createBoard = (name) => {
    const board = new Board({name}) 
    this.boards.set(board.id, board)
  }

  @action removeBoard = (board) => {
    this.boards.delete(board.id)
  }
}
