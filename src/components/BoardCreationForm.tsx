import * as React from 'react'
import { observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { hasErrors } from 'utils'
import { FormComponentProps } from 'antd/lib/form'

const FormItem = Form.Item

type Values = {
  boardName: string
}

interface BoardFormProps extends FormComponentProps {
  onCreate: (values: Values) => void;
}

@observer
class CreationForm extends React.Component<BoardFormProps, {}> {
  private inputRef: HTMLInputElement

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onCreate(values)
      }
    })
  }

  setInputRef = el => {
    this.inputRef = el
    this.inputRef.focus()
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
            rules: [{ required: true, message: 'Please enter board name.' }]
          })(
            <Input
              ref={this.setInputRef}
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
            Create Board
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export const BoardCreationForm = Form.create()(CreationForm)
