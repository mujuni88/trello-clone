/* tslint:disable:no-any*/

import { action, observable, ObservableMap } from 'mobx'
import { setter } from 'mobx-decorators'
import { uniqueId } from 'lodash'
import { Card } from './Card'

type Options = {
  name: string,
  store: any
}

export class Board {
  id: string = uniqueId('board-')
  store: any = null

  @setter 
  @observable 
  name: string = ''

  @observable 
  cards: ObservableMap<Card> = observable.map()

  constructor({ name, store }: Options) {
    this.name = name
    this.store = store
  }

  // Actions
  @action createCard = (name) => {
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
