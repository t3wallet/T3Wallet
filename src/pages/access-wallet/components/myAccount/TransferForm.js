import React from 'react'
import {
  Form, Input, Button, message,
} from 'antd'
import PropTypes from 'prop-types'
import {
  intlShape, FormattedMessage, injectIntl, defineMessages,
} from 'react-intl'
import styles from './TransferForm.less'

const FormItem = Form.Item

const messages = defineMessages({
  toAddress: {
    id: 'myWallet.toAddress',
    defaultMessage: 'To Address',
  },
  amountToSend: {
    id: 'myWallet.amountToSend',
    defaultMessage: 'Amount To Send',
  },
  gasLimit: {
    id: 'myWallet.gasLimit',
    defaultMessage: 'Gas Limit',
  },
  sendButton: {
    id: 'myWallet.sendButton',
    defaultMessage: 'Confirm Transcation',
  },
})


const TransferForm = ({
  intl,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const handleSubmit = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.error('Please check you input.')
        return
      }
      console.log(values)
    })
  }
  const { formatMessage } = intl
  return (
    <Form hideRequiredMark className={styles.transferForm}>
      <FormItem label={formatMessage(messages.toAddress)}>
        {getFieldDecorator('toAddress', {
          rules: [{ required: true, type: 'string', message: 'Incorrect Address' }],
        })(<Input size="large" />)}
      </FormItem>
      <FormItem label={formatMessage(messages.amountToSend)}>
        {getFieldDecorator('amountToSend', {
          rules: [{ required: true, type: 'string', message: 'Incorrect Amount To Send' }],
        })(<Input size="large" addonAfter="ꜩ" />)}
      </FormItem>
      <FormItem label={formatMessage(messages.gasLimit)}>
        {getFieldDecorator('gasLimit', {
          rules: [{ required: true, type: 'string', message: 'Incorrect Gas Limit' }],
        })(<Input size="large" addonAfter="ꜩ" />)}
      </FormItem>

      <Button type="primary" onClick={handleSubmit} className={styles.submitButton}>
        <FormattedMessage {...messages.sendButton} />
      </Button>

    </Form>
  )
}

TransferForm.propTypes = {
  form: PropTypes.object,
  intl: intlShape.isRequired,
}

export default Form.create()(injectIntl(TransferForm))
