import { action, observable, ObservableMap } from 'mobx'
import { serializable, identifier, list, object, reference } from 'serializr'
import { uniqueId } from 'lodash'
import { List } from './List'
import { BoardStore } from 'stores'

type Options = {
  name: string,
  store: BoardStore
}

export class Board {
  @serializable(identifier())
  id: string = uniqueId('board-')

  store: BoardStore

  @serializable
  @observable 
  showCreationForm: boolean = false

  @serializable
  @observable 
  showRenameForm: boolean = false

  @serializable(reference(List))
  @observable
  editedList: List

  @serializable
  @observable 
  name: string

  @serializable(list(object(List)))
  @observable 
  lists: ObservableMap<List> = observable.map()

  constructor({ name, store }: Options) {
    this.name = name
    this.store = store
  }

  // Actions
  @action setEditedList = (l: List) => {
    this.editedList = l
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
    const l = new List({name, store: this}) 
    this.lists.set(l.id, l)
    
    this.toggleCreationForm()
  }

  @action editList = (l: List) => {
    this.setEditedList(l)
    this.toggleRenameForm()
  }

  @action deleteList = (l: List) => {
    this.lists.delete(l.id)
  }

  @action delete = () => {
    this.store.deleteBoard(this)
  }

}
