import { action, observable, reaction, ObservableMap } from 'mobx'
import { uniqueId } from 'lodash'
import { Board, Card, CardJSON } from 'stores/models'

export type JSON = {
  id?: string,
  name?: string,
  cards?: CardJSON
}

type Options = {
  json: JSON,
  store: Board
}

export class List {
  id: string = uniqueId('list-')
  store: Board;

  @observable 
  name: string = ''

  @observable 
  showCreationForm: boolean = false

  @observable 
  showRenameForm: boolean = false

  @observable 
  cards: ObservableMap<Card> = observable.map()

  @observable
  orderedCards: Card[] = []

  constructor({ json, store }: Options) {
    this.update(json)
    this.store = store

    reaction(
      () => this.orderedCards.length > this.cards.size,
      (sync) => sync && this.sync()
    )
  }

  // Actions
  @action toggleRenameForm = () => {
    this.showRenameForm = !this.showRenameForm
  }

  @action toggleCreationForm = () => {
    this.showCreationForm = !this.showCreationForm
  }

  @action setName = (name: string) => {
    this.name = name
  }

  @action createCard = (json) => {
    if (json) {
      const card = new Card({ json, store: this })
      this.cards.set(card.id, card)
      this.orderedCards.push(card)
    }

    if (this.showCreationForm) {
      this.toggleCreationForm()
    }
  }

  @action sync = () => {
    this.cards.clear()
    this.orderedCards.forEach(c => this.cards.set(c.id, c))
  }

  @action
  update = ({
    id = uniqueId('list-'), 
    name = '[EMPTY]',
    cards = {}
  }: JSON) => {
    this.id = id
    this.name = name

    Object.entries(cards).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'undefined') { return }

      this.createCard(value)
    })
  }

  @action deleteCard = (card: Card) => {
    this.cards.delete(card.id)
  }

  @action rename = (name: string) => {
    this.setName(name)
  }

  @action delete = () => {
    this.store.deleteList(this)
  }

  toJSON = () => ({
    id: this.id,
    name: this.name,
    cards: this.cards.toJSON()
  })
}
