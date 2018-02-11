import { action, observable, ObservableMap } from 'mobx'
import { setter } from 'mobx-decorators'
import { uniqueId } from 'lodash'

import { Todo } from './Todo'

type Options = {
  name: string
}

export class Card {
  id: string = uniqueId('card-')

  @setter 
  @observable 
  name: string = ''

  @observable 
  todos: ObservableMap<Todo> = observable.map()

  constructor({ name }: Options) {
    this.name = name
  }

  // Actions
  @action createTodo = (name) => {
    const todo = new Todo({name}) 
    this.todos.set(todo.id, todo)
  }

  @action deleteTodo = (todo: Todo) => {
    this.todos.delete(todo.id)
  }
}
