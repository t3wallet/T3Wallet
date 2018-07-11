import React from 'react'
import {
  Form, Input, Icon, Row, Col, Button,
} from 'antd'
import PropTypes from 'prop-types'
import { FormattedMessage, formatMessage } from 'react-intl'
import styles from './TransferForm.less'

const FormItem = Form.Item

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
    }
  },
  onValuesChange (_, values) {
    console.log(values)
  },
})((props) => {
  const { form } = props
  const { getFieldDecorator } = form
  return (
    <Form hideRequiredMark className={styles.transferForm}>
      <FormItem label="To Address">
        {getFieldDecorator('toAddress', {
          rules: [{ required: true, message: 'To Address is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="Amount To Send">
        {getFieldDecorator('amountToSend', {
          rules: [{ required: true, message: 'Amount To Send Is Required' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="Gas Limit">
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
}

export default TransferForm
