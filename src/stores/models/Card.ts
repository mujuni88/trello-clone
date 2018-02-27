import { observable, action } from 'mobx'
import { serializable, identifier } from 'serializr'
import { uniqueId } from 'lodash'
import { List } from 'stores/models'

type Options = {
  name: string,
  store: List
}

export class Card {
  @serializable(identifier())
  id: string = uniqueId('card-')

  store: List

  @serializable
  @observable name: string = ''

  @serializable
  @observable
  isComplete: boolean = false

  constructor({ name, store }: Options) {
    this.name = name
    this.store = store
  }

  @action
  toggleComplete = () => {
    this.isComplete = !this.isComplete
  }

  @action
  delete = () => {
    this.store.deleteCard(this)
  }
}
