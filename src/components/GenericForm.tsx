import * as React from 'react'
import { observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { hasErrors } from 'utils'
import { FormComponentProps } from 'antd/lib/form'

const FormItem = Form.Item
const FIELD_NAME = 'input'

interface GenericFormProps extends FormComponentProps {
  actionButtonText: string;
  inputPlaceholder: string;
  errorMessage: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
}

@observer
class GForm extends React.Component<GenericFormProps, {}> {
  private inputRef: HTMLInputElement

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values[FIELD_NAME])
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
    const error =
      isFieldTouched(FIELD_NAME) && getFieldError(FIELD_NAME)

    const {
      actionButtonText,
      inputPlaceholder,
      errorMessage,
      initialValue
    } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={error ? 'error' : undefined}
          help={error || ''}
        >
          {getFieldDecorator(FIELD_NAME, {
            rules: [{ required: true, message: errorMessage}],
            initialValue: initialValue
          })(
            <Input
              ref={this.setInputRef}
              placeholder={inputPlaceholder}
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
            {actionButtonText}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export const GenericForm = Form.create()(GForm)
