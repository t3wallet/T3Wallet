import React from 'react'
import {
  Form, Input, Button, Select, InputNumber, message,
} from 'antd'
import {
  intlShape, FormattedMessage, injectIntl, defineMessages,
} from 'react-intl'
import PropTypes from 'prop-types'
import styles from './DelegateForm.less'

const FormItem = Form.Item

const messages = defineMessages({
  fromAddress: {
    id: 'myAccount.fromAddress',
    defaultMessage: 'From Address',
  },
  delegateToAddress: {
    id: 'myAccount.delegateToAddress',
    defaultMessage: 'Delegate To Address',
  },
  confirmDelegation: {
    id: 'myAccount.confirmDelegationButton',
    defaultMessage: 'Confirm Delegation',
  },
  incorrectValue: {
    id: 'myAccount.incorrectValue',
    defaultMessage: 'Incorrect {value}',
  },
  fee: {
    id: 'myAccount.fee',
    defaultMessage: 'Fee',
  },
  gasUnitExplain: {
    id: 'myAccount.gasUnitExplain',
    defaultMessage: '{item} is based on mutez，1 xtz = 1,000,000 mutez',
  },
})

const { Option } = Select

const DelegateForm = ({
  intl,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  onSetDelegateClick,
  disabled,
  accounts,
  delegating,
}) => {
  const handleSubmit = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.error('Please check you input.')
        return
      }
      onSetDelegateClick(values)
    })
  }
  const { formatMessage } = intl
  return (
    <Form hideRequiredMark className={styles.delegateForm}>
      <FormItem label={formatMessage(messages.fromAddress)}>
        {getFieldDecorator('fromAddress', {
          rules: [{ required: true, type: 'string', message: formatMessage(messages.incorrectValue, { value: formatMessage(messages.fromAddress) }) }],
        })(<Select
          size="large"
          showSearch
          optionFilterProp="address"
          filterOption={(input, option) => option.address.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          { accounts.filter(({ kind, delegate: { setable } }) => {
            if (kind === 'origination' && setable) {
              return true
            }
            return false
          }).map(({ address }) => {
            return (
              <Option value={address} key={address}>
                {address}
              </Option>
            )
          })}
        </Select>)}
      </FormItem>
      <FormItem label={formatMessage(messages.delegateToAddress)}>
        {getFieldDecorator('toDelegation', {
          rules: [{ required: true, type: 'string', message: 'Incorrect Address' }],
        })(<Input size="large" />)}
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
      <Button
        disabled={disabled}
        loading={delegating}
        type="primary"
        onClick={handleSubmit}
        className={styles.submitButton}
      >
        <FormattedMessage {...messages.confirmDelegation} />
      </Button>

    </Form>
  )
}

DelegateForm.propTypes = {
  form: PropTypes.object,
  intl: intlShape.isRequired,
  onSetDelegateClick: PropTypes.func,
  disabled: PropTypes.bool,
  accounts: PropTypes.array,
  delegating: PropTypes.bool,
}


export default Form.create()(injectIntl(DelegateForm))
