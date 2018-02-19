import { action, observable, ObservableMap } from 'mobx'
import { uniqueId } from 'lodash'
import { List } from './List'
import { BoardStore } from 'stores'

type Options = {
  name: string,
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

  constructor({ name, store }: Options) {
    this.name = name
    this.store = store
  }

  // Actions
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

  @action createList = (name: string) => {
    const list = new List({name, store: this}) 
    this.lists.set(list.id, list)
    
    this.toggleCreationForm()
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

}
