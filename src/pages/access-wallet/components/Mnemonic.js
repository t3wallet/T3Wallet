import React from 'react'
import {
  Form, Input, Button, message,
} from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'
import bip39 from 'bip39'
import styles from './styles.less'

const FormItem = Form.Item

const messages = defineMessages({
  seed: {
    id: 'accessWallet.mnemonicSeed',
    defaultMessage: 'Enter Your Words Mnemonic Phrase',
  },
  password: {
    id: 'accessWallet.mnemonicPassword',
    defaultMessage: 'password (optional)',
  },
  unlockButton: {
    id: 'accessWallet.unlockWallet',
    defaultMessage: 'Unlock Your Wallet',
  },
  errorMessage: {
    id: 'accessWallet.errorMessage',
    defaultMessage: 'Place check your input',
  },
})

const Mnemonic = ({
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
      onUnlock({ walletType: 'mnemonic', payload: values })
    })
  }

  const isMnemonic = (rule, value, callback) => {
    if (bip39.validateMnemonic(value)) {
      callback()
      return
    }
    callback('Invalid Mnemonic!')
  }
  return (
    <form>
      <FormItem>
        {getFieldDecorator('mnemonic', {
          rules: [{ required: true, message: 'Please input your Mnemonic Phrase.' }, {
            validator: isMnemonic,
          }],
        })(
          <Input.TextArea autoFocus rows={4} placeholder={formatMessage(messages.seed)} onPressEnter={handleSubmit} />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('password', {
          rules: [], initialValue: '',
        })(
          <Input placeholder={formatMessage(messages.password)} onPressEnter={handleSubmit} />
        )}
      </FormItem>
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

Mnemonic.propTypes = {
  form: PropTypes.object,
  onUnlock: PropTypes.func,
  intl: intlShape.isRequired,
}

export default Form.create()(injectIntl(Mnemonic))
