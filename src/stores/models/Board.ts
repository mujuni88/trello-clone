import { action, observable, ObservableMap } from 'mobx'
import { uniqueId } from 'lodash'
import { Card } from './Card'
import { BoardStore } from 'stores'

type Options = {
  name: string,
  store: BoardStore
}

export class Board {
  id: string = uniqueId('board-')
  store: BoardStore

  @observable 
  name: string

  @observable 
  cards: ObservableMap<Card> = observable.map()

  constructor({ name, store }: Options) {
    this.name = name
    this.store = store
  }

  // Actions
  @action setName = (name: string) => {
    this.name = name
  }

  @action createCard = (name: string) => {
    const card = new Card({name}) 
    this.cards.set(card.id, card)
  }

  @action removeCard = (card: Card) => {
    this.cards.delete(card.id)
  }

  @action delete = () => {
    this.store.deleteBoard(this)
  }

}
