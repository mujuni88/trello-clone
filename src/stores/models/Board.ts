import { action, observable, ObservableMap } from 'mobx'
import { setter } from 'mobx-decorators'
import { uniqueId } from 'lodash'
import { Card } from './Card'

type Options = {
  name: string
}

export class Board {
  id: string = uniqueId('board-')

  @setter 
  @observable 
  name: string = ''

  @observable 
  cards: ObservableMap<Card> = observable.map()

  constructor({ name }: Options) {
    this.name = name
  }

  // Actions
  @action createCard = (name) => {
    const card = new Card({name}) 
    this.cards.set(card.id, card)
  }

  @action removeCard = (card: Card) => {
    this.cards.delete(card.id)
  }

}
