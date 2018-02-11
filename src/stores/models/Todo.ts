import { observable } from 'mobx'
import { setter } from 'mobx-decorators'
import { uniqueId } from 'lodash'

type Options = {
  name: string
}

export class Todo {
  id: string = uniqueId('todo-')

  @observable 
  name: string = ''

  @setter 
  @observable 
  isCompleted: boolean = false

  constructor({ name }: Options) {
    this.name = name
  }
}
