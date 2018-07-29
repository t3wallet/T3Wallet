import React from 'react'
import {
  Input, Button, Form, message, Alert,
} from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'
import styles from './styles.less'

const FormItem = Form.Item

const messages = defineMessages({
  privateKey: {
    id: 'accessWallet.privateKey',
    defaultMessage: 'Private Key',
  },
  unlockButton: {
    id: 'accessWallet.unlockWallet',
    defaultMessage: 'Unlock Your Wallet',
  },
  errorMessage: {
    id: 'accessWallet.errorMessage',
    defaultMessage: 'Place check your input',
  },
  privateKeyTip: {
    id: 'accessWallet.privateKeyTip',
    defaultMessage: 'Your private key should start with \'edsk\'',
  },
})

const PrivateKey = ({
  onUnlock,
  intl,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { formatMessage } = intl
  const handleSubmit = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.error(formatMessage(messages.errorMessage))
        return
      }
      onUnlock({ walletType: 'privateKey', payload: values })
    })
  }
  return (
    <form>
      <FormItem>
        {getFieldDecorator('privateKey', {
          rules: [{ required: true, message: 'Please input your Private Key.' }],
        })(
          <Input.TextArea autoFocus rows={2} placeholder={formatMessage(messages.privateKey)} onPressEnter={handleSubmit} />
        )}
      </FormItem>
      <Alert message={formatMessage(messages.privateKeyTip)} type="info" showIcon />
      <br />
      <Button
        type="primary"
        size="large"
        className={styles.button}
        onClick={handleSubmit}
      >
        <FormattedMessage {...messages.unlockButton} />
      </Button>
    </form>
  )
}

PrivateKey.propTypes = {
  onUnlock: PropTypes.func,
  form: PropTypes.object,
  intl: intlShape.isRequired,
}

export default Form.create()(injectIntl(PrivateKey))
