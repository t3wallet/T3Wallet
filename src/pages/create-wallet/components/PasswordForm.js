/* global isNaN */
import React from 'react'
import {
  Form, Button, message,
} from 'antd'
import PropTypes from 'prop-types'
import InputPassword from 'antd-input-password'

const FormItem = Form.Item

const PasswordForm = ({
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  onSubmit,
  buttonText,
  buttonIcon,
  ...otherProps
}) => {
  const handleSubmit = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.error('Please check you input.')
        return
      }
      onSubmit(values)
    })
  }
  return (
    <Form hideRequiredMark
      style={{
        width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      <FormItem style={{ width: '70%', alignSelf: 'center' }}>
        {getFieldDecorator('password', {
          initialValue: '',
        })(<InputPassword {...otherProps} />)}
      </FormItem>
      <br />
      <Button type="primary" icon={buttonIcon && buttonIcon} size="large" style={{ width: '50%', alignSelf: 'center' }} onClick={handleSubmit}>
        {buttonText}
      </Button>
    </Form>
  )
}

PasswordForm.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  buttonIcon: PropTypes.string,
  buttonText: PropTypes.string,
  otherProps: PropTypes.object,
}

export default Form.create()(PasswordForm)
