import { action, observable, ObservableMap } from 'mobx'
import { uniqueId } from 'lodash'
import { Board, Card } from 'stores/models'

type Options = {
  name: string,
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

  constructor({ name, store }: Options) {
    this.name = name
    this.store = store
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

  @action createCard = (name) => {
    const card = new Card({name, store: this}) 
    this.cards.set(card.id, card)

    this.toggleCreationForm()
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
}
