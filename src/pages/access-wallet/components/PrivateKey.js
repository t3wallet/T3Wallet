import React from 'react'
import { Input, Button } from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'
import styles from './styles.less'

const messages = defineMessages({
  privateKey: {
    id: 'accessWallet.privateKey',
    defaultMessage: 'Private Key',
  },
})

const PrivateKey = ({ pk, intl }) => {
  const { formatMessage } = intl
  console.log(pk)
  return (
    <div>
      <Input.TextArea rows={4} placeholder={formatMessage(messages.privateKey)} />
      <br />
      <br />
      <Button type="primary" size="large" className={styles.button}>
        <FormattedMessage id="accessWallet.unlockWallet" defaultMessage="Unlock Your Wallet" />
      </Button>
    </div>
  )
}

PrivateKey.propTypes = {
  pk: PropTypes.string,
  intl: intlShape.isRequired,
}

export default injectIntl(PrivateKey)
