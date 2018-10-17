/* global isNaN */
import React from 'react'
import {
  Form, Input, InputNumber, Button, Select, message,
} from 'antd'
import {
  intlShape, FormattedMessage, injectIntl, defineMessages,
} from 'react-intl'
import PropTypes from 'prop-types'
import styles from './TransferForm.less'

const FormItem = Form.Item

const messages = defineMessages({
  fromAddress: {
    id: 'myAccount.fromAddress',
    defaultMessage: 'From Address',
  },
  toAddress: {
    id: 'myAccount.toAddress',
    defaultMessage: 'To Address',
  },
  amountToSend: {
    id: 'myAccount.amountToSend',
    defaultMessage: 'Amount To Send',
  },
  fee: {
    id: 'myAccount.fee',
    defaultMessage: 'Fee',
  },
  gasLimit: {
    id: 'myAccount.gasLimit',
    defaultMessage: 'Gas Limit',
  },
  gasLimitTip: {
    id: 'myAccount.gasLimitTip',
    defaultMessage: 'Gas Limit is the max amount of you are willing to pay for this transaction, increasing gas limit will not result a faster transaction speed.',
  },
  gasUnitExplain: {
    id: 'myAccount.gasUnitExplain',
    defaultMessage: '{item} is based on mutez，1 xtz = 1,000,000 mutez',
  },
  sendButton: {
    id: 'myAccount.sendButton',
    defaultMessage: 'Confirm Transcation',
  },
  incorrectValue: {
    id: 'myAccount.incorrectValue',
    defaultMessage: 'Incorrect {value}',
  },
})

const { Option } = Select


const TransferForm = ({
  intl,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  onSendClick,
  sending,
  curAccount,
  accounts,
}) => {
  const handleSubmit = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.error('Please check you input.')
        return
      }
      onSendClick(values)
    })
  }
  const { formatMessage } = intl
  return (
    <Form hideRequiredMark className={styles.transferForm}>
      <FormItem label={formatMessage(messages.fromAddress)}>
        {getFieldDecorator('fromAddress', {
          rules: [{ required: true, type: 'string', message: formatMessage(messages.incorrectValue, { value: formatMessage(messages.fromAddress) }) }],
          initialValue: curAccount && curAccount.address,
        })(<Select
          size="large"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {accounts.map((account) => {
            return (
              <Option value={account.address} key={account.address}>
                {account.address}
              </Option>
            )
          })}
        </Select>)}
      </FormItem>
      <FormItem label={formatMessage(messages.toAddress)}>
        {getFieldDecorator('toAddress', {
          rules: [{ required: true, type: 'string', message: formatMessage(messages.incorrectValue, { value: formatMessage(messages.toAddress) }) }],
        })(<Input size="large" />)}
      </FormItem>
      <FormItem label={formatMessage(messages.amountToSend)}>
        {getFieldDecorator('amountToSend', {
          rules: [{ required: true, type: 'number', message: formatMessage(messages.incorrectValue, { value: formatMessage(messages.amountToSend) }) }],
        })(<InputNumber size="large"
          min={0}
          step={0.1}
          precision={6}
          style={{ width: '100%' }}
        />)}
      </FormItem>
      <FormItem
        label={formatMessage(messages.fee)}
        extra={(
          <FormattedMessage
            {...messages.gasUnitExplain}
            values={{
              item: (
                <FormattedMessage {...messages.fee} />
              ),
            }}
          />
        )}
      >
        {getFieldDecorator('fee', {
          rules: [{ required: true, type: 'integer', message: formatMessage(messages.incorrectValue, { value: formatMessage(messages.fee) }) }],
          initialValue: 0,
        })(<InputNumber
          size="large"
          min={0}
          step={1}
          style={{ width: '100%' }}
        />)}
      </FormItem>
      <FormItem
        label={formatMessage(messages.gasLimit)}
        extra={(
          <FormattedMessage {...messages.gasLimitTip} />
        )}
      >
        {getFieldDecorator('gasLimit', {
          rules: [{ required: true, type: 'integer', message: formatMessage(messages.incorrectValue, { value: formatMessage(messages.gasLimit) }) }],
          initialValue: 10000,
        })(<InputNumber
          size="large"
          min={0}
          step={1000}
          style={{ width: '100%' }}
        />)}
      </FormItem>
      <br />
      <Button type="primary" loading={sending} onClick={handleSubmit} className={styles.submitButton}>
        <FormattedMessage {...messages.sendButton} />
      </Button>
    </Form>
  )
}

TransferForm.propTypes = {
  form: PropTypes.object,
  intl: intlShape.isRequired,
  onSendClick: PropTypes.func,
  sending: PropTypes.bool,
  curAccount: PropTypes.object,
  accounts: PropTypes.array,
}

export default Form.create()(injectIntl(TransferForm))
