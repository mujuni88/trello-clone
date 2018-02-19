import { action, observable, ObservableMap } from 'mobx'
import { uniqueId } from 'lodash'
import { Board } from 'stores/models'

import { Todo } from './Todo'

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
  todos: ObservableMap<Todo> = observable.map()

  constructor({ name, store }: Options) {
    this.name = name
    this.store = store
  }

  // Actions
  @action setName = (name: string) => {
    this.name = name
  }

  @action createTodo = (name) => {
    const todo = new Todo({name}) 
    this.todos.set(todo.id, todo)
  }

  @action deleteTodo = (todo: Todo) => {
    this.todos.delete(todo.id)
  }

  @action rename = (name: string) => {
    this.setName(name)
    this.store.toggleRenameForm()
  }

  @action delete = () => {
    this.store.deleteList(this)
  }
}
