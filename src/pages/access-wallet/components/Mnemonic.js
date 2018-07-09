import React from 'react'
import { Input, Button } from 'antd'
import { FormattedMessage } from 'react-intl'
import styles from './styles.less'

const Mnemonic = () => {
  return (
    <div>
      <Input.TextArea rows={4} placeholder="15 words Mnemonic Key" />
      <Button type="primary" size="large" className={styles.button}>
        <FormattedMessage id="accessWallet.unlockWallet" defaultMessage="Unlock Your Wallet" />
      </Button>
    </div>
  )
}

export default Mnemonic
