import React from 'react'
import {
  Form, Input, Button, Alert, message,
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
    id: 'accessWallet.fundraiserSeed',
    defaultMessage: 'Fundraiser Wallet Seed',
  },
  email: {
    id: 'accessWallet.fundraiserEmail',
    defaultMessage: 'Fundraiser Email Address',
  },
  password: {
    id: 'accessWallet.fundraiserPassword',
    defaultMessage: 'Fundraiser Password',
  },
  address: {
    id: 'accessWallet.fundraiserAddress',
    defaultMessage: 'Fundraiser Address',
  },
  code: {
    id: 'accessWallet.fundraiserCode',
    defaultMessage: 'Activation Code',
  },
  errorMessage: {
    id: 'accessWallet.unlockErrorMessage',
    defaultMessage: 'Pleace check your input',
  },
  codeWarning: {
    id: 'accessWallet.codeWarning',
    defaultMessage: 'DO NOT enter activation code if you have already activated your wallet!',
  },
})


const Fundraiser = ({
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
      onUnlock({ walletType: 'ico', payload: values })
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
        {getFieldDecorator('seed', {
          rules: [{ required: true, message: 'Please input your fundraiser seed.' }, {
            validator: isMnemonic,
          }],
        })(
          <Input.TextArea autoFocus rows={4} placeholder={formatMessage(messages.seed)} />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your fundraiser E-mail.' }],
        })(
          <Input placeholder={formatMessage(messages.email)} />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your fundraiser password.' }],
        })(
          <Input placeholder={formatMessage(messages.password)} />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('address', {
          rules: [{ required: true, message: 'Please input your fundraiser public address.' }],
        })(
          <Input placeholder={formatMessage(messages.address)} />
        )}
      </FormItem>
      <Alert message={formatMessage(messages.codeWarning)} type="warning" />
      <FormItem>
        {getFieldDecorator('code', {
        })(
          <Input placeholder={formatMessage(messages.code)} />
        )}
      </FormItem>
      <br />
      <Button type="primary" size="large" onClick={handleSubmit} className={styles.button}>
        <FormattedMessage id="accessWallet.unlockWallet" defaultMessage="Unlock Your Wallet" />
      </Button>
    </form>
  )
}

Fundraiser.propTypes = {
  form: PropTypes.object.isRequired,
  onUnlock: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default Form.create()(injectIntl(Fundraiser))
