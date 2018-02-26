import * as React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { hasErrors } from 'utils'
import { FormComponentProps } from 'antd/lib/form'

const FormItem = styled(Form.Item)`
  margin-bottom: 10px !important;
`
const FIELD_NAME = 'input'

interface CardFormProps extends FormComponentProps {
  actionButtonText?: string;
  cancelButtonText?: string;
  inputPlaceholder?: string;
  errorMessage?: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

@observer
class WCardForm extends React.Component<CardFormProps, {}> {
  inputRef: HTMLInputElement

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
    const error = isFieldTouched(FIELD_NAME) && getFieldError(FIELD_NAME)

    const {
      actionButtonText,
      cancelButtonText,
      inputPlaceholder,
      errorMessage,
      initialValue,
      onCancel
    } = this.props

    return (
      <Form onSubmit={this.handleSubmit} className="shadow-lg rounded-lg p-3">
        <FormItem
          validateStatus={error ? 'error' : undefined}
          help={error || ''}
        >
          {getFieldDecorator(FIELD_NAME, {
            rules: [{ required: true, message: errorMessage }],
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
            htmlType="submit"
            className="mr-2"
            disabled={hasErrors(getFieldsError())}
          >
            {actionButtonText || 'Add'}
          </Button>
          <Button onClick={onCancel}>{cancelButtonText || 'Cancel'}</Button>
        </FormItem>
      </Form>
    )
  }
}

export const CardForm = Form.create()(WCardForm)
