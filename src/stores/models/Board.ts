import { action, observable, ObservableMap } from 'mobx'
import { uniqueId } from 'lodash'
import { BoardStore } from 'stores'
import { List, ListJSON } from 'stores/models'

export type JSON = {
  id?: string,
  name?: string,
  lists?: ListJSON
}

type Options = {
  json: JSON,
  store: BoardStore
}

export class Board {
  id: string = uniqueId('board-')
  store: BoardStore

  @observable 
  showCreationForm: boolean = false

  @observable 
  showRenameForm: boolean = false

  @observable
  editedList: List

  @observable 
  name: string

  @observable 
  lists: ObservableMap<List> = observable.map()

  constructor({ json, store }: Options) {
    this.update(json)
    this.store = store
  }

  // Actions
  @action update = ({
    id =  uniqueId('board-'),
    name = '[EMPTY]',
    lists = {}
  }: JSON) => {
    this.id = id
    this.name = name
    Object.entries(lists).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'undefined') { return }

      this.createList(value)
    })
  }

  @action setEditedList = (list: List) => {
    this.editedList = list
  }

  @action setName = (name: string) => {
    this.name = name
  }
   
  @action rename = (name: string) => {
    this.setName(name)
    this.store.toggleRenameForm()
  }

  @action toggleRenameForm = () => {
    this.showRenameForm = !this.showRenameForm
  }

  @action toggleCreationForm = () => {
    this.showCreationForm = !this.showCreationForm
  }

  @action createList = (json: ListJSON) => {
    if (json) {
      const list = new List({ json, store: this })
      this.lists.set(list.id, list)
    } 

    if (this.showCreationForm) {
      this.toggleCreationForm()
    }
  }

  @action editList = (list: List) => {
    this.setEditedList(list)
    this.toggleRenameForm()
  }

  @action deleteList = (list: List) => {
    this.lists.delete(list.id)
  }

  @action delete = () => {
    this.store.deleteBoard(this)
  }

  toJSON = () => ({
    id: this.id,
    name: this.name,
    lists: this.lists.toJSON()
  })
}
