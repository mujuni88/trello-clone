import { action, observable, ObservableMap } from 'mobx'
import { serializable, identifier, list, object } from 'serializr'
import { uniqueId } from 'lodash'
import { Board, Card } from 'stores/models'

type Options = {
  name: string,
  store: Board
}

export class List {
  @serializable(identifier())
  id: string = uniqueId('list-')

  store: Board;

  @serializable
  @observable 
  name: string = ''

  @serializable
  @observable 
  showCreationForm: boolean = false

  @serializable
  @observable 
  showRenameForm: boolean = false

  @serializable(list(object(Card)))
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
