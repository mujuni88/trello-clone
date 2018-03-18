import { observable, action } from 'mobx'
import { uniqueId } from 'lodash'
import { List } from 'stores/models'

export type JSON = {
  id?: string,
  name?: string,
  isComplete?: boolean
}

type Options = {
  json: JSON,
  store: List
}

export class Card {
  id: string
  store: List

  @observable name: string

  @observable
  isComplete: boolean

  constructor({ json, store }: Options) {
    this.update(json)
    this.store = store
  }

  @action
  update = ({
    id = uniqueId('card-'), 
    name = '[EMPTY]',
    isComplete = false
  }: JSON) => {
    this.id = id
    this.name = name
    this.isComplete = isComplete
  }

  @action
  toggleComplete = () => {
    this.isComplete = !this.isComplete
  }

  @action
  delete = () => {
    this.store.deleteCard(this)
  }

  toJSON = () => ({
    id: this.id,
    name: this.name,
    isComplete: this.isComplete
  })
}
