import React from 'react'
import {
  Form, Input, Button,
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


const DelegateForm = Form.create({
  onFieldChange (props, changedFields) {
    const { onChange } = props
    onChange(changedFields)
  },
  mapPropsToFields (props) {
    const { delegateFormFields } = props
    const {
      toAddress,
    } = delegateFormFields
    return {
      delegateToAddress: Form.createFormField({
        ...toAddress,
        value: toAddress,
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
    <Form hideRequiredMark className={styles.delegateForm}>
      <FormItem label={formatMessage(messages.delegateToAddress)}>
        {getFieldDecorator('delegateToAddress', {
          rules: [{ required: true, type: 'string', message: 'Incorrect Address' }],
        })(<Input size="large" />)}
      </FormItem>
      <Button type="primary" htmlType="submit" className={styles.submitButton}>
        <FormattedMessage {...messages.confirmDelegation} />
      </Button>

    </Form>
  )
})

DelegateForm.propTypes = {
  delegateFormFields: PropTypes.object,
  intl: intlShape.isRequired,
}

export default injectIntl(DelegateForm)
