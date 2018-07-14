import React from 'react'
import {
  Form, Input, Button, message,
} from 'antd'
import PropTypes from 'prop-types'
import {
  intlShape, FormattedMessage, injectIntl, defineMessages,
} from 'react-intl'
import styles from './DelegateForm.less'

const FormItem = Form.Item

const messages = defineMessages({
  delegateToAddress: {
    id: 'myWallet.delegateToAddress',
    defaultMessage: 'Delegate To Address',
  },
  confirmDelegation: {
    id: 'myWallet.confirmDelegationButton',
    defaultMessage: 'Confirm Delegation',
  },
})


const DelegateForm = ({
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
    <Form hideRequiredMark className={styles.delegateForm}>
      <FormItem label={formatMessage(messages.delegateToAddress)}>
        {getFieldDecorator('delegateToAddress', {
          rules: [{ required: true, type: 'string', message: 'Incorrect Address' }],
        })(<Input size="large" />)}
      </FormItem>
      <Button type="primary" onClick={handleSubmit} className={styles.submitButton}>
        <FormattedMessage {...messages.confirmDelegation} />
      </Button>

    </Form>
  )
}

DelegateForm.propTypes = {
  form: PropTypes.object,
  intl: intlShape.isRequired,
}


export default Form.create()(injectIntl(DelegateForm))
