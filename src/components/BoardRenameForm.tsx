import * as React from 'react'
import { observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { hasErrors } from 'utils'
import { Board } from 'stores/models'  
import { BoardStore } from 'stores'  
import { FormComponentProps } from 'antd/lib/form'
const FormItem = Form.Item

interface RenameFormProp extends FormComponentProps {
  board: Board,
  store: BoardStore
}

@observer
class RenameForm extends React.Component<RenameFormProp, {}> {
  private inputRef: HTMLInputElement

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, board, store } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        board.setName(values.boardName)
        store.toggleRenameForm()
      }
    })
  }

  setInputRef = el => {
    this.inputRef = el
    this.inputRef.focus()
  }

  handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select()
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      isFieldTouched,
      getFieldError
    } = this.props.form

    const boardNameError =
      isFieldTouched('boardName') && getFieldError('boardName')

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={boardNameError ? 'error' : undefined}
          help={boardNameError || ''}
        >
          {getFieldDecorator('boardName', {
            rules: [{ required: true, message: 'Please enter board name.' }],
            initialValue: this.props.board.name
          })(
            <Input
              ref={this.setInputRef}
              onFocus={this.handleFocus}
              placeholder="Board name"
              size="large"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: '100%' }}
            disabled={hasErrors(getFieldsError())}
          >
           Rename Board
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export const BoardRenameForm = Form.create()(RenameForm)
