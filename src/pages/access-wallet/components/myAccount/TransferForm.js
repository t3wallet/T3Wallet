import React from 'react'
import {
  Form, Input, Button,
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
})


const TransferForm = Form.create({
  onFieldChange (props, changedFields) {
    const { onChange } = props
    onChange(changedFields)
  },
  mapPropsToFields (props) {
    const { transferFormFields } = props
    const {
      toAddress, amountToSend, gasLimit, sendData,
    } = transferFormFields
    return {
      toAddress: Form.createFormField({
        ...toAddress,
        value: toAddress,
      }),
      amountToSend: Form.createFormField({
        ...amountToSend,
        value: amountToSend,
      }),
      gasLimit: Form.createFormField({
        ...gasLimit,
        value: gasLimit,
      }),
      sendData: Form.createFormField({
        ...sendData,
        value: sendData,
      }),
    }
  },
  onValuesChange (_, values) {
    console.log(values)
  },
})((props) => {
  const { form, intl } = props
  const { getFieldDecorator } = form
  const { formatMessage } = intl
  return (
    <Form hideRequiredMark className={styles.transferForm}>
      <FormItem label={formatMessage(messages.toAddress)}>
        {getFieldDecorator('toAddress', {
          rules: [{ required: true, message: 'To Address is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem label={formatMessage(messages.amountToSend)}>
        {getFieldDecorator('amountToSend', {
          rules: [{ required: true, message: 'Amount To Send Is Required' }],
        })(<Input />)}
      </FormItem>
      <FormItem label={formatMessage(messages.gasLimit)}>
        {getFieldDecorator('gasLimit', {
          rules: [{ required: true, message: 'Gas Limit Is Required' }],
        })(<Input />)}
      </FormItem>

      <Button type="primary" htmlType="submit" className={styles.submitButton}>
        <FormattedMessage id="myWallet.sendButton" defaultMessage="Confirm Transcation" />
      </Button>

    </Form>
  )
})

TransferForm.propTypes = {
  transferFormFields: PropTypes.object,
  intl: intlShape.isRequired,
}

export default injectIntl(TransferForm)
