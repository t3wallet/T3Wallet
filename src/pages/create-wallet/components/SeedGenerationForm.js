/* global isNaN */
import React from 'react'
import {
  Form, Button, message,
} from 'antd'
import PropTypes from 'prop-types'
import InputPassword from 'antd-input-password'
import {
  FormattedMessage, defineMessages,
} from 'react-intl'

const FormItem = Form.Item

const messages = defineMessages({
  createButton: {
    id: 'tabs.createWallet',
    defaultMessage: 'Create Wallet',
    desciption: 'create wallet card title',
  },
})

const SeedGenerationForm = ({
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  onSeedGenerate,
}) => {
  const handleSubmit = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.error('Please check you input.')
        return
      }
      onSeedGenerate(values)
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
        })(<InputPassword autoFocus />)}
      </FormItem>
      <br />
      <Button type="primary" icon="file-add" size="large" style={{ width: '50%', alignSelf: 'center' }} onClick={handleSubmit}>
        <FormattedMessage {...messages.createButton} />
      </Button>
    </Form>
  )
}

SeedGenerationForm.propTypes = {
  form: PropTypes.object,
  onSeedGenerate: PropTypes.func,
}

export default Form.create()(SeedGenerationForm)
