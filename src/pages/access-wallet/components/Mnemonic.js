import React from 'react'
import { Form, Input, Button } from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'
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
})

const Mnemonic = ({ mnemonic, password, intl }) => {
  console.log(mnemonic, password)
  const { formatMessage } = intl
  return (
    <Form>
      <FormItem>
        <Input.TextArea rows={4} placeholder={formatMessage(messages.seed)} />
      </FormItem>

      <FormItem>
        <Input placeholder={formatMessage(messages.password)} />
      </FormItem>
      <Button type="primary" size="large" className={styles.button}>
        <FormattedMessage id="accessWallet.unlockWallet" defaultMessage="Unlock Your Wallet" />
      </Button>
    </Form>
  )
}

Mnemonic.propTypes = {
  mnemonic: PropTypes.string,
  password: PropTypes.string,
  intl: intlShape.isRequired,
}

export default injectIntl(Mnemonic)
